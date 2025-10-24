[TYPESCRIPT__BADGE]: https://img.shields.io/badge/typescript-D4FAFF?style=for-the-badge&logo=typescript
[FASTIFY__BADGE]: https://img.shields.io/badge/fastify-000000?style=for-the-badge&logo=fastify
[PRISMA__BADGE]: https://img.shields.io/badge/prisma-1B222D?style=for-the-badge&logo=prisma
[VITEST__BADGE]: https://img.shields.io/badge/vitest-6E9F18?style=for-the-badge
[BETTERAUTH__BADGE]: https://img.shields.io/badge/better--auth-4B8DFF?style=for-the-badge

<h1 align="center">SOLID TO-DO</h1>

<div align="center">

![TypeScript][TYPESCRIPT__BADGE]
![Fastify][FASTIFY__BADGE]
![Prisma][PRISMA__BADGE]
![Vitest][VITEST__BADGE]
![BetterAuth][BETTERAUTH__BADGE]

</div>


<details open='open'>
<summary>Table of contents</summary>

-   [📌 About](#about)
-   [🚀 Run](#run)
-   [📂 Structure of project](#structure)
-   [📍 Application routes](#routes)
-   [🧪 Tests](#tests)
</details>

<h2 id='about'>📌 About</h2>
REST API developed to demonstrate my skills in clean architecture, SOLID principles, and software engineering best practices.

Built in Node.js + TypeScript, using Fastify, Prisma, Better Auth, and Vitest for automated testing.

<h2 id='run'>🚀 Run</h2>
<pre>
pnpm install
pnpm prisma migrate dev
pnpm run dev
</pre>

<h2 id='structure'>📂 Structure of project</h2>
<pre>
📦 src/
├── app/       → Use cases, mappers, repositories
├── core/      → Base domain, errors, generic entities
├── domain/    → Entities and business contracts
├── infra/     → Implementations (HTTP, Auth, DB, Logger)
└── prisma/    → Migrations and database schema
</pre>

<h2 ir='routes'>📍 Application routes</h2>

Method | Route | Description
--- | --- | ---
POST   | `/tasks` | Create a new task
GET    | `/tasks` | List all tasks
PATCH  | `/tasks/:id` | Update a task
DELETE | `/tasks/:id` | Remove a task

---

<h2 id='tests'>🧪 Tests</h2>

All business rules are covered by automated tests:

<pre>
npm test
</pre>

> ✅ 26 tests passing  

---

<h2 id='author'>👨‍💻 Author</h2>

Developed by **Vanorton**  
[GitHub](https://github.com/vanorton)
