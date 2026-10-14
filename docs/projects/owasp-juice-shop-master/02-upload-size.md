---
title: Upload Size
description: Bypassing a client-side file size check on the complaint form in the OWASP Juice Shop.
---

# Upload Size

**Category:** Improper Input Validation
**Difficulty:** ⭐⭐⭐ (3/6)
**Video:** [Watch video](https://www.loom.com/share/718c15b8a4d549f281d3c607c9391473) *(max. 5 min)*

## Challenge Overview

The goal is to upload a file larger than the enforced 100 KB limit through the complaint form, which normally only accepts PDF or ZIP files up to that size.

## Tools Used

- Web browser
- Burp Suite (Proxy / Intercept)

## Step-by-Step Walkthrough

1. **Open the complaint form.** Log in with any account and go to `http://localhost:3000/#/complain`. The page shows a **Message** field and a file picker that only accepts **PDF, ZIP** files up to **100 KB** (both constraints are shown as hints directly under the respective fields).
2. **Prepare a test file just under the limit.** Create a ~90 KB dummy PDF and confirm it uploads without any error:

   ```bash
   head -c 90000 /dev/urandom > valid.pdf
   ```

   Fill in any **Message** text, choose `valid.pdf` via the file picker, and click **Submit**. The form resets and shows a confirmation line: `Customer support will get in touch with you soon! Your complaint reference is #<id>`.
3. **Confirm the size check is client-side.** Create a second file clearly over 100 KB:

   ```bash
   head -c 150000 /dev/urandom > toobig.pdf
   ```

   Select it in the file picker. Before any request is even sent, a red error box appears above the form: `File too large. Maximum 100 KB allowed.` and the **Submit** button becomes disabled. Because this happens instantly and offline (you can even disconnect from the network and it still triggers), this proves the 100 KB check runs purely in the browser's JavaScript.
4. **Switch to the under-limit file and start intercepting.** Re-select `valid.pdf`, enable Burp Suite's Proxy intercept, and click **Submit**. Burp intercepts a `POST` request to `/file-upload` — a separate, plain `multipart/form-data` request (not the complaint message itself, which is sent afterwards as JSON to `/api/Complaints/`). You'll see the raw file bytes in the request body between the multipart boundary markers, not Base64.
5. **Tamper with the payload.** In Burp's **Raw** editor, append extra bytes directly after the existing file content but before the closing boundary line, so the part's size grows past 100,000 bytes. Burp automatically recalculates the `Content-Length` header when you forward the request.
6. **Forward the modified request.** The server responds `204 No Content` and accepts the file — the complaint message request that follows then succeeds normally. The 100 KB rule was never checked again server-side, so anything up to the server's own internal ceiling of 200,000 bytes slips through; only beyond that does the server itself reject the upload with `500 MulterError: File too large`.

## Root Cause

The 100 KB rule shown to the user ("PDF, ZIP, max. 100 KB") is only enforced by the Angular frontend before the request is even built — it is a UX convenience, not a security control. The backend only has a much more generous, generic upload ceiling (200 KB, enforced by the Multer middleware) that has nothing to do with the business rule communicated to the user. Any file between 100 KB and 200 KB is silently accepted. Any check performed only in the browser can be bypassed by intercepting and modifying the request after that check has already passed.

## Why This Matters (Risk & Consequences)

Missing server-side enforcement of the actual business rule (100 KB) lets an attacker silently double the allowed upload size in this case, and in a less carefully configured application the generic server-side ceiling might be missing entirely — letting through arbitrarily large files. This can be abused for denial-of-service attacks (exhausting server disk space or memory), circumventing downstream processing assumptions (e.g. virus scanners or document parsers with size limits), or increasing the blast radius of other upload-based attacks.

## Remediation

- Always re-validate file size (and type) on the server using the same limit communicated to the user, regardless of client-side checks.
- Enforce strict size limits at the web server / reverse proxy layer as a first line of defense (e.g. `client_max_body_size` in Nginx):

  ```nginx
  client_max_body_size 100k;
  ```
- Use battle-tested multipart/file-upload libraries that support strict size enforcement instead of custom parsing logic.
