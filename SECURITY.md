# Security Policy

## 🚨 Critical Security Alert

**IMMEDIATE ACTION REQUIRED**: GitHub tokens have been found exposed in this repository. 

### If you are the repository owner:
1. **IMMEDIATELY REVOKE** any GitHub tokens that may have been exposed
2. Generate new tokens through GitHub Settings > Developer Settings > Personal Access Tokens
3. Update your CI/CD pipelines and any applications using the old tokens
4. Review access logs for any unauthorized usage

## 🔒 Security Guidelines

### Never Commit Sensitive Data
- **NEVER** commit API keys, tokens, passwords, or any sensitive credentials
- Use environment variables and `.env` files (which should be in `.gitignore`)
- Use GitHub Secrets for CI/CD workflows
- Use secure secret management services for production

### Token Patterns to Avoid
The following patterns should NEVER appear in your code:
- `ghp_*` (GitHub Personal Access Tokens)
- `github_pat_*` (GitHub Fine-grained Personal Access Tokens)
- `gho_*`, `ghu_*`, `ghs_*`, `ghr_*` (Other GitHub tokens)
- `sk-*` (OpenAI API keys)
- `AKIA*` (AWS Access Keys)

### Best Practices
1. **Use `.env.example` files** with placeholder values
2. **Add comprehensive `.gitignore` patterns** for sensitive files
3. **Use GitHub's secret scanning** alerts
4. **Regularly rotate tokens and keys**
5. **Implement least-privilege access** for all tokens

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please:

1. **DO NOT** create a public issue
2. Email security concerns to the repository maintainer
3. Include detailed steps to reproduce
4. Allow reasonable time for response and remediation

We take security seriously and will respond promptly to legitimate security concerns.
