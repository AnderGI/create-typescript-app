# create-ts-ddd-esm

> A modern TypeScript monorepo template for building DDD-first projects using ESM, Turbo, and strict tooling.

## 📦 Overview
This project template provides a structured and scalable starting point for TypeScript applications based on:

- **ES Modules** using `module: nodenext` to natively support ESModules inside NodeJS environment
- **Domain-Driven Design (DDD)** principles 
- **Monorepo** support via `pnpm` workspaces and `turborepo`
- **ES Module supported development** setup with `tsx`, `vitest`, and `typescript-eslint`

## 🧱 Project Structure
```
create-ts-ddd-esm/             # root path
├── src/                       # all source code will be written here
│   ├── apps/                  # Entrypoints for the different applications (controllers, event subscribers, etc)
│   ├── contexts/              # Bounded contexts. Source code with as few third-party dependencies as possible
│   └── libraries/             # Foder for possible npm libraries
├── tests/                    # Tests. Unit and intration tests. Directory structure organized by replicating src 
├── dist/                     # Build output
├── tsconfig.base.json        # Shared TypeScript config
├── tsconfig.json             # Root TS config with references
├── turbo.json                # Turborepo build pipeline
├── pnpm-workspace.yaml       # pnpm workspace packages
└── README.md                 # Templates README
```

##  👀 TO TAKE INTO ACCOUNT
Native Node.js integrations will be favoured over third-party libraries. This ensures a robust template that is less susceptible to breaking changes from third parties.

## 📚 TODOS
- [ ] Build a simple use case following outside-in development as a code based example
- [ ] Build an npm library for creating this structure `npx create-typescript-app`

## 👷 Get Started

## 📄 License
MIT

---
Start building high-quality, scalable TypeScript projects without wasting time setting up the basics. 🚀

