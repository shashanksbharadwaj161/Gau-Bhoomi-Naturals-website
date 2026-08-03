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

**The A records rotate — do not compare single snapshots.** Repeated lookups
return different addresses each time. `beige-ape-261262` returned four different
pairs across five consecutive queries:

```
148.135.128.190, 77.37.76.158
77.37.76.249,    92.112.198.205
147.79.120.68,   77.37.76.112
148.135.128.233, 77.37.76.203
```

All of these names — the apex, `www`, and both `hostingersite.com` preview
domains — draw from the same shared address space (`147.79.120.x`,
`77.37.76.x`, `92.112.198.x`, `148.135.128.x`). That is the signature of a
**shared CDN/edge pool, not origin servers**.

**This matters for the fix:** because the records rotate, "the domain points at
the wrong server" cannot be concluded from comparing lookups, and repointing the
apex at a single origin IP such as `93.127.208.252` would take the domain *off*
the CDN. Treat that as a last resort, not the first move. Confirm what the CDN
is actually doing before changing any record.

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
    account** — the FTP hostname, the **exact** username string, and the
    directory path for this domain's web root.

    My GitHub Actions deploy still fails with `530 Login incorrect` *after* the
    credentials were updated once already, so please give me the username
    verbatim rather than paraphrased. Hostinger usernames take forms like
    `u123456789` or `u123456789.gaubhoominaturals.com`, and picking the wrong
    form produces exactly this error. Also confirm whether that FTP user is
    scoped to a subdirectory, since that changes what the deploy path must be.

Please report everything you find, including anything that contradicts the
assumptions above.
