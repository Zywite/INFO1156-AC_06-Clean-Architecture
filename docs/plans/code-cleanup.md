---
plan name: code-cleanup
plan description: Clean Code violations cleanup
plan status: done
---

## Idea
El proyecto ya tiene Clean Architecture aplicada correctamente (domain/application/infrastructure), pero tiene múltiples violaciones de Clean Code que deben corregirse:

1. Código muerto: 3 métodos de entidad que nunca se llaman, 2 métodos de repositorio no utilizados, 2 DTOs huérfanos, dependencias npm sin usar
2. Error handling frágil: todos los use cases lanzan `Error` genérico, los controllers comparan strings de mensajes para ruteo de excepciones
3. Config hardcodeada: DATABASE_URL, puerto, host en el código
4. Tokens DI como strings sin type safety
5. Duplicación: regex HTML, lógica de moderación idéntica en dos use cases
6. Inyección de dependencias incorrecta: ModerationDomainService instanciado dos veces, FeedRankingStrategyFactory usa `new`
7. Casts inseguros: `as ReactionType`, `mode as any`
8. Respuestas API inconsistentes entre endpoints
9. CategoriesController bypassea la capa de aplicación
10. relevanceScore hardcodeado a 0

El objetivo es limpiar todas estas violaciones para tener un código realmente limpio, manteniendo los 32 tests pasando.

## Implementation
- P0.1: Eliminar código muerto — remover hasValidTitle(), belongsToCategory(), isValid() de entidades, findByCategory() y delete() de PostRepository, DTOs huérfanos, y dependencias npm sin usar
- P0.2: Crear excepciones tipadas personalizadas (PostNotFoundException, ModerationBlockedException, etc.) y reemplazar todos los throw new Error() en use cases
- P0.3: Reemplazar string-matching de errores en controllers con excepciones tipadas + NestJS exception filters
- P0.4: Mover DATABASE_URL, puerto y host a variables de entorno usando @nestjs/config
- P0.5: Reemplazar tokens DI strings con InjectionToken constantes tipadas (Symbol)
- P1.1: Extraer NO_HTML_PATTERN a archivo compartido de constantes de validación
- P1.2: Extraer lógica de moderación duplicada a un ModerationGuard compartido
- P1.3: Hacer ModerationDomainService singleton proveyéndolo en un módulo compartido
- P1.4: Refactorizar FeedRankingStrategyFactory para inyectar estrategias vía DI con Map registry
- P1.5: Normalizar formas de respuesta API a un formato consistente
- P2.1: Arreglar casteo inseguro as ReactionType con type guard runtime
- P2.2: Arreglar mode as any tipando FeedQueryRequestDto.mode como union type
- P2.3: Refactorizar CategoriesController para usar un use case en vez de inyectar repositorio directo
- P2.4: Implementar relevanceScore real o removerlo del tipo PostWithInteractions
- P3.1: Agregar método findByIdOrThrow() a repositorios para eliminar patrón duplicado if (!post) throw
- P3.2: Remover dependencias npm no utilizadas
- P3.3: Verificar que build, lint, format:check y los 32 tests sigan pasando

## Required Specs
<!-- SPECS_START -->
- task-assignment
- clean-code-guide
<!-- SPECS_END -->