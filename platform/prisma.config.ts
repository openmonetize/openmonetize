import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "packages/common/prisma/schema.prisma",
  migrations: {
    path: "packages/common/prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
