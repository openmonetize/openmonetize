# Deploy and Host OpenMonetize on Railway

OpenMonetize is an open-source, offline-first AI monetization infrastructure. It provides precise token metering, real-time credit management, and usage-based billing for LLM applications. It supports major providers like OpenAI and Anthropic, enabling developers to easily monetize their AI products with a drop-in SDK and comprehensive dashboard.

## About Hosting OpenMonetize

Hosting OpenMonetize involves deploying a set of microservices and data stores. The architecture consists of an API Gateway for handling requests, a high-throughput Ingestion Service for tracking usage events, and a Rating Engine for calculating costs. These services rely on a PostgreSQL database for persistent storage of customer and ledger data, and Redis for high-speed caching, rate limiting, and event queuing. Deploying on Railway simplifies this by orchestrating these interconnected components, ensuring they can communicate securely and scale independently to handle production traffic.

## Common Use Cases

- **LLM Wrappers & SaaS**: Monetize AI applications by charging users based on their actual token consumption.
- **Internal Chargeback**: Track and allocate AI infrastructure costs across different teams or departments within an organization.
- **API Metering**: Implement usage limits and credit-based access control for any API service.

## Dependencies for OpenMonetize Hosting

- **PostgreSQL**: Primary database for storing user data, ledgers, and configuration.
- **Redis**: Used for event queues, rate limiting, and caching.

### Deployment Dependencies

- [OpenMonetize GitHub Repository](https://github.com/openmonetize/openmonetize)

### Implementation Details

The template deploys four services:
1.  **Dashboard**: The administrative UI for managing customers and viewing analytics.
2.  **API Gateway**: The main entry point for API requests.
3.  **Ingestion Service**: Handles high-volume event tracking.
4.  **Rating Engine**: Calculates costs and manages credit deduction.

It automatically provisions Postgres and Redis. Default credentials are set, but you should update `NEXTAUTH_SECRET` and other sensitive keys for production.

## Why Deploy OpenMonetize on Railway?

Railway is a singular platform to deploy your infrastructure stack. Railway will host your infrastructure so you don't have to deal with configuration, while allowing you to vertically and horizontally scale it.

By deploying OpenMonetize on Railway, you are one step closer to supporting a complete full-stack application with minimal burden. Host your servers, databases, AI agents, and more on Railway.
