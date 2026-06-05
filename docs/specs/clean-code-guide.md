# Spec: clean-code-guide

Scope: feature

# Clean Code Standards for INFO1156-AC_06

## 1. Exception Handling
- Cada use case debe lanzar excepciones tipadas personalizadas (ej: `PostNotFoundException`, `ModerationBlockedException`)
- Prohibido lanzar `throw new Error("mensaje")` genérico
- Prohibido comparar `e.message === "string"` para ruteo de errores
- Los controllers deben usar `exception filters` de NestJS para mapear excepciones tipadas a HTTP status codes

## 2. Dependency Injection
- Usar `InjectionToken` con `Symbol()` en vez de strings: `export const POST_REPOSITORY = Symbol("POST_REPOSITORY")`
- Un módulo debe declarar explícitamente todas sus dependencias (no depender de módulos `@Global()`)
- Servicios de dominio deben ser singleton (proveerse una sola vez en un módulo compartido)

## 3. Configuration
- No hardcodear config en código fuente: `DATABASE_URL`, puerto, host deben venir de variables de entorno
- Usar `@nestjs/config` o `process.env` con valores por defecto explícitos

## 4. Type Safety
- Prohibido `as T` para hacer cast de tipos sin validación runtime
- Usar type guards: `function isReactionType(v: string): v is ReactionType { return ["like","fire","clap"].includes(v) }`
- DTOs deben usar union types en vez de `string` cuando el conjunto de valores es conocido

## 5. Code Duplication
- Constantes compartidas (regex, mensajes, límites) deben vivir en `src/shared/constants.ts` o similar
- Lógica repetida entre use cases debe extraerse a un servicio compartido

## 6. Dead Code
- No commitear métodos, clases, interfaces, DTOs o dependencias que no se usen
- Verificar con `grep` antes de crear nuevo código que no haya algo similar existente

## 7. API Response Consistency
- Todas las respuestas deben seguir el formato: colecciones → `{ data: T[], total: number }`, objeto único → `{ data: T }`
- Usar un interceptor global para estandarizar (opcional pero recomendado)

## 8. SOLID
- **O** (Open/Closed): usar registro de estrategias con `Map` + DI, no `if-else chains`
- **D** (DIP): inyectar dependencias, no instanciar con `new` dentro de factories

## 9. Entity Methods
- Los métodos de dominio deben tener consumidores en la capa de aplicación
- Si un método de entidad no se usa, debe eliminarse