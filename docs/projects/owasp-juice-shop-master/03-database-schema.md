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

1. **Identify the injection point.** The product search endpoint (`/rest/products/search?q=...`) passes the `q` parameter into a SQL query. Submitting a single quote (`'`) causes a server error, confirming the input is not properly sanitized.
2. **Determine the number of columns.** Since the search results render multiple product fields, the underlying `SELECT` must return a matching number of columns. This can be found by incrementally testing `UNION SELECT NULL, NULL, ...` (or `ORDER BY n--`) until no error occurs — in this case, 9 columns are required.
3. **Break out of the original query.** The payload starts with `test'))` — this closes the string literal (`'`) and the parentheses that wrap the search condition in the original query, turning the rest of the input into syntactically valid, attacker-controlled SQL.
4. **Append a UNION SELECT.** The first 8 columns are filled with placeholder values (`1,2,3,4,5,6,7,8`) purely to match the expected column count and types of the original query. The 9th column is replaced with `sql`, pulled from SQLite's internal `sqlite_schema` table, which stores the schema definition of every table in the database.
5. **Comment out the rest of the original query** using `--` so any remaining SQL from the original statement is ignored.
6. **Assemble and encode the payload:**

   ```
   test')) UNION SELECT 1,2,3,4,5,6,7,8,sql FROM sqlite_schema--
   ```

   URL-encoded:

   ```
   http://localhost:3000/rest/products/search?q=test'))%20UNION%20SELECT%201,2,3,4,5,6,7,8,sql%20FROM%20sqlite_schema--
   ```
7. **Submit the request.** The response now returns the full database schema (table and column definitions) inside the search results.

## Why This Matters (Risk & Consequences)

SQL injection here allows an attacker to read arbitrary data from the database, starting with its structural schema. Knowing the exact table and column names is typically the reconnaissance step before a more targeted attack — e.g. extracting user credentials, personal data, or order/payment information. In more severe cases, SQL injection can also be used to modify or delete data, or escalate to remote code execution depending on the database engine and permissions.

## Remediation

- Use parameterized queries / prepared statements for all database access; never concatenate user input into SQL strings.
- Apply strict input validation and allow-listing where possible.
- Run the database with least-privilege accounts so even a successful injection has limited impact.
