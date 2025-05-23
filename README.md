# create-ts-ddd-esm

> A modern TypeScript monorepo template for building DDD-first projects using ESM, Turbo, and strict tooling.

## 📦 Overview
This project template provides a structured and scalable starting point for TypeScript applications based on:

- **ES Modules** using `module: nodenext`
- **Domain-Driven Design (DDD)** principles
- **Monorepo** support via `pnpm` workspaces and `turborepo`
- **Modern development** setup with `tsx`, `vitest`, and `eslint`

## 🧱 Project Structure
```
create-ts-ddd-esm/
├── src/
│   ├── apps/                  # Entry points of the system (backend, landing)
│   ├── contexts/              # Bounded contexts (domain, application services, etc.)
│   └── libraries/             # Shared utilities or base libraries
├── tests/                    # Tests organized by apps/contexts/libraries
├── dist/                     # Build output (by default structured by app)
├── tsconfig.base.json        # Shared TypeScript config
├── tsconfig.json             # Root TS config with references
├── turbo.json                # Turborepo build pipeline
├── pnpm-workspace.yaml       # pnpm workspace packages
└── README.md
```

## ⚙️ Tooling
- **TypeScript 5.8**
- **ESM-compatible (NodeNext)**
- **TurboRepo** for caching and incremental builds
- **tsx** for running `.ts` files without pre-compilation
- **Astro** (Starlight template) for the documentation/landing site
- **Vitest** for unit testing
- **ESLint** (`typescript-eslint`) for consistent code quality

## 🚀 Scripts
Each package contains its own `package.json` and may define:

```json
"scripts": {
  "dev": "tsx start.ts",
  "build": "tsc -b"
}
```

At the root:
```bash
pnpm dev        # Start all dev servers concurrently
pnpm build      # Run builds for all packages via turbo
```

## ✨ Features
- Strict typing (`strict: true`, `isolatedModules`, etc.)
- ESM-first (`type: module`, `module: nodenext`, etc.)
- Support for subpath imports and Node 22+ conventions
- Modular build outputs (each app/library in `dist`)
- Ready to publish libraries with declaration maps

## 🛠️ TODO (Post-Scaffold)
- [ ] Configure CI/CD
- [ ] Setup versioning strategy for libraries
- [ ] Integrate testing coverage and reports
- [ ] Add landing site content

## 📄 License
MIT

---
Start building high-quality, scalable TypeScript projects without wasting time setting up the basics. 🚀

