---
title: Juice Shop Master
description: Write-ups and demo videos for three 3-star OWASP Juice Shop challenges, completed for the Developer Akademie project "Juice Shop Meister".
---

# Juice Shop Master

This project documents the completion of three self-selected hacking challenges (3-star difficulty) from the OWASP Juice Shop, submitted as part of the practical project "Juice Shop Meister" at Developer Akademie. It covers three distinct vulnerability categories: OSINT-based account takeover, improper input validation, and SQL injection-based information disclosure. Each challenge page contains a step-by-step write-up, an explanation of the underlying vulnerability and its real-world risks, and a link to a short demonstration video. All content is provided strictly for educational purposes.

## TOC

- [Quickstart](#quickstart)
- [Challenges](#challenges)
  - [1. Reset Jim's Password (OSINT)](./01-reset-jims-password.md)
  - [2. Upload Size (Improper Input Validation)](./02-upload-size.md)
  - [3. Database Schema (Information Disclosure / SQL Injection)](./03-database-schema.md)
- [Educational Purpose Notice](#educational-purpose-notice)

import GithubLinkAdmonition from '@site/src/components/GithubLinkAdmonition';

<GithubLinkAdmonition 
    link="https://github.com/HPetersen2/OWASP-Juice-Shop-Master"
    title="Github Tip" 
    type="tip"
>
Checkout this repository to see the code/implementation
</GithubLinkAdmonition>

## Quickstart

1. Clone the [GitHub repository](https://github.com/HPetersen2/OWASP-Juice-Shop-Master).
2. Start an OWASP Juice Shop instance locally (`docker run -d -p 3000:3000 bkimminich/juice-shop`) or use the instance shown in the videos.
3. Open the page of the challenge you're interested in — each contains the full write-up and video link.
4. Watch the linked video (max. 5 minutes each) alongside the write-up to reproduce the steps.

## Challenges

| # | Challenge | Category | Difficulty | Video |
|---|---|---|---|---|
| 1 | [Reset Jim's Password](./01-reset-jims-password.md) | OSINT | ⭐⭐⭐ | [Watch video](https://www.loom.com/share/58eb0c2bd8f34fafb6ad4d9bfd9c8e77) |
| 2 | [Upload Size](./02-upload-size.md) | Improper Input Validation | ⭐⭐⭐ | [Watch video](https://www.loom.com/share/718c15b8a4d549f281d3c607c9391473) |
| 3 | [Database Schema](./03-database-schema.md) | Information Disclosure | ⭐⭐⭐ | [Watch video](https://www.loom.com/share/35f4b1abeaa042d39a29dfa453f563e0) |

## Educational Purpose Notice

All challenges, exploits, and write-ups in the repository were performed exclusively against the intentionally vulnerable OWASP Juice Shop training application, for educational purposes as part of a security training program. No real personal data, credentials, tokens, or infrastructure information were used or stored anywhere in the repository.
