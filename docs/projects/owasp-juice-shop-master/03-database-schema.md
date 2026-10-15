---
title: Database Schema
description: Extracting the full SQLite database schema via SQL injection in the OWASP Juice Shop product search.
---

# Database Schema

**Category:** Information Disclosure / SQL Injection
**Difficulty:** ⭐⭐⭐ (3/6)
**Video:** [Watch video](https://www.loom.com/share/35f4b1abeaa042d39a29dfa453f563e0) *(max. 5 min)*

## Challenge Overview

The goal is to extract the full database schema via a SQL injection vulnerability in the product search feature.

## Tools Used

- Web browser
- Burp Suite (to inspect/craft requests, optional)

## Step-by-Step Walkthrough

1. **Locate the injection point.** Use the search icon in the top navigation bar and type a query, e.g. `juice`. This calls `GET /rest/products/search?q=juice` and renders the matching products — confirming `q` reaches the backend as-is.
2. **Break the query syntactically.** Search for `test'` (a word followed by a single, unmatched quote). The product grid stays empty and, if you have DevTools open on the Network tab, the request returns `HTTP 500`. This confirms the `q` parameter is concatenated directly into a SQL string instead of being passed as a bound parameter.
3. **Determine the number of columns.** Since the search results render full product rows, any `UNION SELECT` has to return exactly as many columns as the `Products` table has. Find that number by sending `q=test')) UNION SELECT NULL,NULL,...--` via Burp Repeater (or directly in the address bar) and increasing the number of `NULL`s one at a time until the `SQLITE_ERROR: SELECTs to the left and right of UNION do not have the same number of result columns` error disappears. In this setup, the table has **10 columns** (`id`, `name`, `description`, `price`, `deluxePrice`, `image`, `alternateImages`, `createdAt`, `updatedAt`, `deletedAt`) — this number can differ between Juice Shop versions, so always verify it by counting yourself rather than assuming a fixed value.
4. **Break out of the original query.** The payload starts with `test'))` — this closes the string literal (`'`) and the two parentheses that wrap the search condition in the original query (`WHERE ((name LIKE '%...%' OR description LIKE '%...%') AND deletedAt IS NULL)`), turning the rest of the input into syntactically valid, attacker-controlled SQL.
5. **Append a UNION SELECT.** Fill the columns with harmless placeholder values, keeping the `name` column (2nd position) as a real string (e.g. `'x'`) — the frontend runs a text-translation function on `name`/`description` that throws if it receives `NULL`, which would turn your injection into a generic, unhelpful 500 error. Put the payload in the `description` column (3rd position) instead, pulling `sql` from SQLite's internal `sqlite_schema` table, which stores the `CREATE TABLE` statement of every table in the database.
6. **Exclude rows with no SQL text.** Internal auto-indexes and the `sqlite_sequence` table have `sql = NULL` and would hit the same translation bug from step 5 — add `WHERE sql IS NOT NULL` to skip them.
7. **Comment out the rest of the original query** using `--` so any remaining SQL from the original statement (closing `%'` quotes, the `AND deletedAt...` clause, `ORDER BY name`) is ignored.
8. **Assemble and encode the payload:**

   ```
   test')) UNION SELECT 1,'x',sql,NULL,NULL,NULL,NULL,NULL,NULL,NULL FROM sqlite_schema WHERE sql IS NOT NULL--
   ```

   URL-encoded:

   ```
   http://localhost:3000/rest/products/search?q=test'))%20UNION%20SELECT%201,'x',sql,NULL,NULL,NULL,NULL,NULL,NULL,NULL%20FROM%20sqlite_schema%20WHERE%20sql%20IS%20NOT%20NULL--
   ```
9. **Submit the request** (paste the URL directly into the browser, or send it from Burp Repeater). The response is now `HTTP 200` with a JSON body containing one "product" per database table, each with its `CREATE TABLE ...` statement sitting in the `description` field — the complete schema of every table, including `Users`, `Cards`, `Wallets`, `SecurityAnswers`, etc.

## Why This Matters (Risk & Consequences)

SQL injection here allows an attacker to read arbitrary data from the database, starting with its structural schema. Knowing the exact table and column names is typically the reconnaissance step before a more targeted attack — e.g. extracting user credentials, personal data, or order/payment information. In more severe cases, SQL injection can also be used to modify or delete data, or escalate to remote code execution depending on the database engine and permissions.

## Remediation

- Use parameterized queries / prepared statements for all database access; never concatenate user input into SQL strings.
- Apply strict input validation and allow-listing where possible.
- Run the database with least-privilege accounts so even a successful injection has limited impact.
