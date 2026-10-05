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

1. **Start the password reset flow.** On the login page, use "Forgot your password?" and enter Jim's email address. The application displays his chosen security question: *"Which is your oldest sibling's name?"*
2. **Find a clue inside the application.** Browsing Jim's product reviews reveals a review on the "Green Smoothie" product with the comment *"Fresh out of a Replicator."* — a clear reference to *Star Trek*.
3. **Research the identity.** Searching for "Jim Star Trek" identifies the character as Captain James T. Kirk.
4. **Find the sibling's name.** Searching for "James T. Kirk siblings" reveals his older brother's name: George Samuel Kirk.
5. **Test the security answer.** Entering the full name does not work. Entering just **"Samuel"** is accepted as the correct answer.
6. **Set a new password.** The password reset completes successfully, granting access to Jim's account.

## Alternative Approach

Instead of OSINT research, the security question could also be attacked with a brute-force approach: capture the reset request in Burp Suite, send it to the Repeater/Intruder, and iterate through a wordlist of common first names until the correct answer is found.

## Why This Matters (Risk & Consequences)

Security questions are a weak authentication factor whenever the answer can be inferred from publicly available information (public profiles, reviews, social media, etc.). An attacker who guesses or researches the answer can fully take over an account without ever knowing the original password — bypassing authentication entirely. This is especially dangerous because security questions are often used as a fallback for "I forgot my password," effectively becoming the weakest link in the authentication chain.

## Remediation

- Avoid security questions with answers that are publicly researchable or guessable; prefer sending a reset link via a verified email address instead.
- If security questions must be used, allow users to enter free-text answers with sufficient entropy rather than picking from predictable categories (e.g., relatives' names).
- Implement rate limiting and lockouts on password-reset attempts.
- Encourage or enforce multi-factor authentication as an additional safeguard.
