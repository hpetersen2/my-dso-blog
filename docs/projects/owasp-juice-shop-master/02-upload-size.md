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

1. **Locate the upload feature.** The "Complaint" page allows a text message (max. 160 characters) plus a file attachment (PDF/ZIP, max. 100 KB).
2. **Test the boundary.** Prepare a test file just under 100 KB (e.g. via `base64 /dev/urandom | head -c 99900 > random.pdf`) and upload it normally — it succeeds.
3. **Identify where validation happens.** Attempting to upload a file over 100 KB directly is rejected before this even reaches the server, indicating the size check runs client-side in JavaScript.
4. **Intercept the request.** With Burp Suite's Proxy enabled, resend the valid (under-limit) upload while intercepting the outgoing request. The file content is transmitted as a Base64-encoded string in the request body.
5. **Tamper with the payload.** Duplicate/extend the Base64 string within the intercepted request so the decoded file size exceeds 100 KB.
6. **Forward the modified request.** The server accepts and stores the file without re-validating its actual size.

## Root Cause

The client-side JavaScript check is only a UX convenience — it is not a security control. The server trusts that the file it receives already respects the size limit and never re-validates the decoded payload size itself. Any check performed only in the browser can be bypassed by intercepting and modifying the request after that check has already passed.

## Why This Matters (Risk & Consequences)

Missing server-side validation of upload size allows an attacker to submit arbitrarily large files. This can be abused for denial-of-service attacks (exhausting server disk space or memory), circumventing downstream processing assumptions (e.g. virus scanners with size limits), or increasing the blast radius of other upload-based attacks.

## Remediation

- Always re-validate file size (and type) on the server, after decoding, regardless of client-side checks.
- Enforce strict size limits at the web server / reverse proxy layer as a first line of defense (e.g. `client_max_body_size` in Nginx).
- Use battle-tested multipart/file-upload libraries that support strict size enforcement instead of custom parsing logic.
