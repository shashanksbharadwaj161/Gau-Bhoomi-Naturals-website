# Prompt for your LOCAL Claude Code session (where the Hostinger MCP is connected)

## Before you paste this

1. **Rotate the API token first.** The one in
   `claudegbnhostingermcp.txt` was shared in plaintext and must be treated as
   compromised. hPanel → API → Manage API tokens → revoke it, create a new one.
2. Put the **new** token in your MCP config, restart Claude Code so the
   `hostinger-*` servers reload, then paste everything below the line.

---

I have the Hostinger MCP connected (hostinger-hosting, hostinger-domains,
hostinger-dns). My domain is **gaubhoominaturals.com**.

Some investigation has already been done — please don't re-derive it, start from
here and verify it:

**Public DNS currently resolves to three different places:**

| Host | A records |
|---|---|
| `gaubhoominaturals.com` | 77.37.76.208, 92.112.198.117 |
| `www.gaubhoominaturals.com` | 147.79.120.5, 148.135.128.176 |
| `beige-ape-261262.hostingersite.com` | 147.79.120.135, 77.37.76.221 |
| `mediumseagreen-salamander-686387.hostingersite.com` | 147.79.120.87, 77.37.76.211 |

**Known facts:**

- `beige-ape-261262.hostingersite.com` is the preview domain that **actually
  serves my site**, and it is the hosting account `gaubhoominaturals.com` is
  supposed to be attached to.
- `mediumseagreen-salamander-686387.hostingersite.com` is a **different, older
  hosting account**. Do not change anything on it.
- Visiting `https://gaubhoominaturals.com` gives
  `NET::ERR_CERT_AUTHORITY_INVALID`, and the domain sends HSTS so Chrome will
  not let me click through.
- hPanel shows the SSL badge as green and **CDN as enabled**, which contradicts
  what the browser sees.

**Please do the following and report each result explicitly:**

1. List the DNS zone for `gaubhoominaturals.com`. Show every A, AAAA and CNAME
   record for the apex and `www`.
2. Identify which hosting account/website the domain is actually mapped to.
   Confirm whether it is the same account as
   `beige-ape-261262.hostingersite.com`. If it is attached to the wrong website,
   say so before changing anything.
3. Report the real SSL certificate status for the domain — issuer, the exact
   names on the certificate (SAN list), validity dates, and whether it covers
   both the apex and `www`. The green badge in hPanel is not sufficient
   evidence; I need the certificate's actual contents.
4. Determine whether the **CDN** is the reason the A records differ from the
   origin. This matters: if the CDN is fronting the domain, then the A records
   are *supposed* to differ and the real problem is the CDN's certificate not
   having provisioned — a different fix from correcting the records. Tell me
   which of the two it is before acting.
5. Check whether **Force HTTPS** is enabled.

**Then fix, in this order, telling me what you are about to change first:**

6. If the domain is mapped to the wrong website, remap it to the account that
   serves `beige-ape-261262.hostingersite.com`.
7. If the A records are genuinely wrong (i.e. the CDN is *not* the explanation),
   point the apex and `www` at the correct origin IPs for that account.
8. Reissue the SSL certificate so it covers both `gaubhoominaturals.com` and
   `www.gaubhoominaturals.com`. If the CDN is fronting the domain, make sure the
   certificate provisions at the CDN layer.
9. Enable Force HTTPS once the certificate is valid — not before, or the site
   becomes completely unreachable.

**Finally, one more thing I need, unrelated to SSL:**

10. Retrieve the **FTP account details for the `gaubhoominaturals.com` hosting
    account** — the FTP hostname, the username, and the directory path for this
    domain's web root. My GitHub Actions deploy is failing with
    `530 Login incorrect` because it is still using the old account's
    credentials. I need the hostname, username and correct path; I will reset
    the password myself in hPanel.

Please report everything you find, including anything that contradicts the
assumptions above.
