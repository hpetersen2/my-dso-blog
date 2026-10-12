---
title: Reset Jim's Password
description: OSINT-based account takeover by answering Jim's security question in the OWASP Juice Shop.
---

# Reset Jim's Password

**Category:** OSINT
**Difficulty:** ⭐⭐⭐ (3/6)
**Video:** [Watch video](https://www.loom.com/share/58eb0c2bd8f34fafb6ad4d9bfd9c8e77) *(max. 5 min)*

## Challenge Overview

The goal of this challenge is to reset the password of the user "Jim" by correctly answering his security question, without knowing the answer beforehand.

## Tools Used

- Web browser (for research and interacting with the Juice Shop)

## Step-by-Step Walkthrough

1. **Open the login page.** Go to `http://localhost:3000/#/login` and click the **"Forgot your password?"** link below the login form. This opens the **"Forgot Password"** page.
2. **Enter Jim's email address.** Type `jim@juice-sh.op` into the **Email** field. As soon as the app can resolve the address, it fetches the matching security question in the background and displays it as the placeholder text of the **Answer** field right below: *"Your eldest siblings middle name?"*
3. **Find a clue inside the application.** Open a second tab and browse the shop's products. On the **"Green Smoothie"** product, open the reviews and look for one authored by `jim@juice-sh.op`. It reads: *"Fresh out of a replicator."* — a clear reference to *Star Trek*.
4. **Research the identity.** Searching the web for "Jim Star Trek" identifies the character as Captain James T. Kirk.
5. **Find the sibling's name.** Searching for "James T. Kirk siblings" reveals his older brother: George Samuel Kirk — nicknamed "Sam", with **"Samuel"** as his middle name. Since the security question specifically asks for the *middle* name (not the full name), this is the answer to test.
6. **Submit a wrong answer first (optional sanity check).** Typing something else, e.g. `Captain`, into the **Answer** field, filling in a new password in **New Password** / **Repeat New Password**, and clicking the pencil/submit button at the bottom shows a red error box above the form with the exact text: `Wrong answer to security question.` This confirms the answer field is actively checked server-side.
7. **Enter the correct answer and a new password.** Clear the **Answer** field and type `Samuel`. Fill in a new password (meeting the strength requirements shown in the hint below the field) in **New Password**, repeat it identically in **Repeat New Password**, then click the submit button again.
8. **Confirm the result.** The red error box disappears and a confirmation line appears above the form: `Your password was successfully changed.` The form resets itself — there is no automatic redirect.
9. **Log in with the new password.** Navigate back to `http://localhost:3000/#/login`, enter `jim@juice-sh.op` and the new password you just set. The login succeeds and grants full access to Jim's account (orders, basket, profile, etc.).

## Alternative Approach

Instead of OSINT research, the security question could also be attacked with a brute-force approach: capture the reset request in Burp Suite, send it to the Repeater/Intruder, and iterate through a wordlist of common first names until the correct answer is found. Note that Juice Shop deliberately rate-limits the `Forgot your password?` flow to slow down this exact approach, so a straightforward Intruder attack with default settings will start getting throttled/blocked after a number of attempts rather than running to completion unhindered.

## Why This Matters (Risk & Consequences)

Security questions are a weak authentication factor whenever the answer can be inferred from publicly available information (public profiles, reviews, social media, etc.). An attacker who guesses or researches the answer can fully take over an account without ever knowing the original password — bypassing authentication entirely. This is especially dangerous because security questions are often used as a fallback for "I forgot my password," effectively becoming the weakest link in the authentication chain.

## Remediation

- Avoid security questions with answers that are publicly researchable or guessable; prefer sending a reset link via a verified email address instead.
- If security questions must be used, allow users to enter free-text answers with sufficient entropy rather than picking from predictable categories (e.g., relatives' names).
- Implement rate limiting and lockouts on password-reset attempts.
- Encourage or enforce multi-factor authentication as an additional safeguard.
