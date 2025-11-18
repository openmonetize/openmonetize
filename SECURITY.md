# Security Policy

## Reporting Security Vulnerabilities

**Please do not report security vulnerabilities through public GitHub issues.**

We take the security of OpenMonetize seriously. If you believe you have found a security vulnerability, please report it to us privately.

### How to Report

**Email**: security@openmonetize.com

**PGP Key**: Available on request

Please include the following information in your report:

- **Type of vulnerability** (e.g., SQL injection, XSS, authentication bypass)
- **Full paths of affected source files**
- **Step-by-step instructions to reproduce the issue**
- **Proof-of-concept or exploit code** (if possible)
- **Impact assessment** - What can an attacker accomplish?
- **Suggested fix** (if you have one)

### What to Expect

1. **Acknowledgment** - We will acknowledge receipt of your report within 48 hours
2. **Investigation** - We will investigate and validate the vulnerability
3. **Updates** - We will keep you informed of our progress
4. **Fix** - We will develop and test a fix
5. **Disclosure** - We will coordinate public disclosure with you
6. **Credit** - We will credit you in the security advisory (if desired)

### Response Timeline

- **Initial response**: Within 48 hours
- **Status update**: Within 7 days
- **Fix timeline**: Depends on severity
  - **Critical**: 1-7 days
  - **High**: 7-30 days
  - **Medium**: 30-90 days
  - **Low**: Next release cycle

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

We recommend always using the latest version to ensure you have the latest security patches.

## Security Best Practices

### For Contributors

When contributing to OpenMonetize, please:

- **Never commit secrets** - API keys, passwords, tokens, etc.
- **Validate all inputs** - Use Zod schemas for validation
- **Use parameterized queries** - Prevent SQL injection via Prisma
- **Implement rate limiting** - Protect against brute force attacks
- **Use HTTPS** - Always encrypt data in transit
- **Log security events** - Track authentication failures, rate limit hits
- **Review dependencies** - Check for known vulnerabilities

### For Users/Operators

When deploying OpenMonetize:

- **Change default credentials** - Update database passwords
- **Use environment variables** - Never hardcode secrets in code
- **Enable HTTPS/TLS** - Use valid SSL certificates
- **Restrict database access** - Use firewall rules and network isolation
- **Regular updates** - Keep OpenMonetize and dependencies up to date
- **Monitor logs** - Watch for suspicious activity
- **Backup data** - Regular encrypted backups
- **Rate limiting** - Configure appropriate rate limits
- **API key rotation** - Rotate API keys regularly

## Known Security Considerations

### API Key Security

- API keys are hashed using bcrypt before storage
- Keys should be rotated regularly (every 90 days recommended)
- Use `om_live_` prefix for production, `om_test_` for development
- Store keys securely (environment variables, secret managers)

### Multi-tenant Isolation

- All data is isolated by `customerId`
- Database queries include tenant filters
- API authentication verifies tenant access
- No cross-tenant data access is possible

### Rate Limiting

- Implemented at API Gateway level
- Redis-backed rate limiting per customer
- Default: 1000 requests/minute per customer
- Configurable per customer tier

### Database Security

- Prisma ORM prevents SQL injection
- Parameterized queries only
- Connection pooling with max limits
- Encrypted connections to database
- Row-level tenant isolation

### Secrets Management

- Environment variables for configuration
- No hardcoded secrets in source code
- Use secret managers (AWS Secrets Manager, HashiCorp Vault)
- Rotate secrets regularly

### Input Validation

- All inputs validated using Zod schemas
- Type-safe validation at runtime
- Sanitization of user-provided data
- Maximum payload sizes enforced

## Security Updates

Security updates will be released as patch versions and announced via:

- **GitHub Security Advisories**
- **Release notes** in [CHANGELOG.md](CHANGELOG.md)
- **Email notifications** to registered users
- **Discord announcements** (when available)

## Vulnerability Disclosure Policy

We follow **Coordinated Disclosure**:

1. **Private reporting** - Report vulnerabilities privately
2. **Investigation** - We validate and develop fixes
3. **Coordination** - We coordinate disclosure timing with reporter
4. **Public disclosure** - After fix is deployed and users are notified
5. **Credit** - Reporter is credited in security advisory

### Disclosure Timeline

- **Fix available**: We will release a fix as soon as possible
- **User notification**: 7 days after fix release (for critical issues)
- **Public disclosure**: 30 days after fix release (or sooner if already public)

## Security Hall of Fame

We recognize security researchers who help keep OpenMonetize secure:

<!--
Contributors who responsibly disclose vulnerabilities will be listed here:

- [Researcher Name] - [Vulnerability Type] - [Date]
-->

*No security issues have been reported yet.*

## Compliance & Standards

OpenMonetize follows industry security standards:

- **OWASP Top 10** - Protection against common web vulnerabilities
- **CWE/SANS Top 25** - Mitigation of most dangerous software errors
- **Secure Development Lifecycle** - Security integrated into development
- **Dependency Scanning** - Regular scans for vulnerable dependencies

## Security Tools

We use the following security tools:

- **Dependabot** - Automated dependency updates
- **npm audit** - Vulnerability scanning for Node packages
- **ESLint security plugins** - Static code analysis
- **Prisma** - SQL injection prevention

## Contact

- **Security Issues**: security@openmonetize.com
- **General Support**: support@openmonetize.com
- **GitHub Discussions**: https://github.com/openmonetize/openmonetize/discussions

---

**Thank you for helping keep OpenMonetize and its users safe!**
