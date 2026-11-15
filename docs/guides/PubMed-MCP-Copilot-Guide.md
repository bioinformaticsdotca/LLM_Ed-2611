# PubMed MCP with Copilot

This guide covers connecting the hosted PubMed MCP server to Copilot and prompting Copilot to find and retrieve article full text.

## 1. Install the PubMed MCP server

PubMed MCP is a hosted remote server, so there is no local package or server process to install.

### Option A: Add it in VS Code

1. In a Copilot chat, open **Chat: Open Customizations** and choose **MCP Servers**.
2. Select **Add Server** and choose **HTTP**.
3. Use this endpoint:

   ```text
   https://pubmed.mcp.claude.com/mcp
   ```

4. Give it a server ID such as `pubmed`.
5. Choose **Global** > **Copilot Global** to make it available across workspaces.
6. Review and approve the server trust prompt if shown. Reload or restart the Copilot session so it discovers the server's tools.

### Option B: Add it to the Copilot-global config

Open `$COPILOT_HOME/mcp-config.json`. If `COPILOT_HOME` is not set, use `~/.copilot/mcp-config.json`. Merge this server entry into the existing top-level `mcpServers` object; keep any other server entries:

```json
{
  "mcpServers": {
    "pubmed": {
      "type": "http",
      "url": "https://pubmed.mcp.claude.com/mcp",
      "tools": ["*"]
    }
  }
}
```

If the file already contains other servers, add only the `"pubmed"` object inside its existing `"mcpServers"` object. Save valid JSON, then reload or restart Copilot.

The server provides PubMed tools for searching articles, retrieving metadata and full text available through PubMed Central (PMC), converting article identifiers, and checking copyright information.

## 2. Prompt Copilot to find and retrieve full text

Full text is available through this server when an article is in PMC. A PMC identifier alone does not establish that an article is open access: have Copilot check the license. Do not ask it to bypass a paywall. Ask for the DOI and PubMed citation so you can identify each article.

### Search for recent papers

Copy and adapt this prompt:

```text
Use PubMed MCP to find the 10 most recent biomedical papers by [author name].
Search using the PubMed author field, sort by publication date, and return the
title, publication date, journal, PMID, PMCID (if present), PubMed link, and DOI
link. If the author name may be ambiguous, tell me what matching criterion you
used and flag possible name collisions.
```

For example:

```text
Use PubMed MCP to find the 10 most recent biomedical papers by Mark Berjanskii.
Search with Berjanskii M[Author], sort by publication date, and include PMID,
PMCID, PubMed link, and DOI link for each result.
```

### Retrieve full text for selected papers

After choosing articles, provide their PMIDs or titles and use a prompt like:

```text
Use PubMed MCP for these articles: [PMIDs or titles].

1. Retrieve their PubMed metadata and identify any PMCID.
2. Check PMC availability and the article's open-access license. If license
   information is missing or unclear, report that rather than assuming the
   article is open access.
3. Retrieve full text only for articles whose full text is available through
   PMC and whose license permits the requested use. Do not bypass paywalls.
4. Save each retrieved text as a UTF-8 .txt file in ~/Downloads/ with a
   readable title and PMID in the filename. Include the article title,
   attribution, PMID, PMCID, DOI link, and license in the file. Do not overwrite
   existing files.
5. Report which articles were saved, their paths, the license status, and any
   limitations (for example, text-only output without publisher layout, figures,
   or tables).

Cite each article with its PubMed link and DOI link.
```

If you already have PMCIDs, you can be more direct:

```text
Use PubMed MCP's get_full_text_article for these PMCIDs: [PMCIDs].
First verify their open-access status and license. Save eligible full text as
separate attributed .txt files in ~/Downloads/, without overwriting existing
files. Skip anything that is not confirmed eligible and explain why.
```

## Troubleshooting

- **The server does not appear:** confirm the endpoint and JSON syntax, then reload the Copilot session.
- **The server appears but a call fails:** inspect the MCP server status/logs in VS Code and complete any authentication or trust prompt.
- **An article has no PMCID:** this MCP server may not provide its full text. Ask Copilot to report the PubMed and DOI links rather than attempting to bypass access controls.
- **The full-text result is text-only:** ask Copilot to state whether figures, tables, references, or publisher formatting were omitted.
