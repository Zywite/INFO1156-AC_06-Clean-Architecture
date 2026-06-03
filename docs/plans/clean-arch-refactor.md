---
plan name: clean-arch-refactor
plan description: Refactor Clean Architecture NestJS
plan status: active
---

## Idea
Refactorizar el servidor NestJS para aplicar Clean Architecture en 4 capas: Domain, Application, Infrastructure, separando responsabilidades e invirtiendo dependencias.

## Implementation
- Persona 1: Crear capa Domain (entities, repository interfaces, domain services puros)
- Persona 2: Crear capa Application (use cases, DTOs planos)
- Persona 3: Implementar Infrastructure/Persistence (Prisma repositories)
- Persona 4: Implementar Infrastructure/HTTP (controllers, modules, wiring) + .docs/README.md
- Verificar lint, build, y tests existentes pasan correctamente

## Required Specs
<!-- SPECS_START -->
- task-assignment
<!-- SPECS_END -->