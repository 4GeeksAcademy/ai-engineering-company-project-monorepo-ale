---
name: development-rule
description: Reglas generales para desarrollar y mantener este monorepositorio.
activation: always
applyTo: "**/*"
---

# Regla de desarrollo

## Alcance de aplicación

Esta regla tiene alcance **siempre activo** (`activation: always`) y se aplica a todas las rutas del repositorio (`applyTo: "**/*"`). Por tanto, el agente debe considerarla en cualquier tarea de desarrollo, documentación, revisión o mantenimiento.

El sistema de reglas admite estos modos de activación:

- **Siempre activa**: se usa para normas transversales del repositorio. Se declara con `activation: always`.
- **Por patrón de archivo**: se limita a los archivos que coincidan con `applyTo`, por ejemplo `"services/**/*.ts"` o `"**/*.md"`.
- **Solicitada por el agente**: se activa únicamente cuando el agente la invoca de forma explícita para una tarea concreta. Debe documentarse con `activation: agent-requested`.

Cuando una regla tenga un alcance más específico, debe conservar esta misma estructura de metadatos y reemplazar `activation` y `applyTo` según corresponda. Si una regla solicitada por el agente no define un patrón, puede usar `applyTo: "none"`.

## Prácticas obligatorias

1. Leer las instrucciones de `AGENTS.md` y el banco de memoria aplicable antes de modificar código.
2. Identificar el archivo, símbolo o comportamiento que controla directamente la tarea antes de editar.
3. Mantener los cambios pequeños, coherentes con las convenciones existentes y limitados al objetivo solicitado.
4. Ejecutar una validación enfocada después de cada cambio sustantivo y corregir los errores introducidos.
5. No modificar archivos protegidos ni deshacer cambios existentes sin autorización explícita.
6. Documentar decisiones o contratos nuevos cuando no sean evidentes desde el código.

## Criterio de resolución

Si varias reglas se aplican a la vez, se debe respetar la regla más específica para el archivo o tarea, siempre que no contradiga una instrucción de mayor prioridad del repositorio o del usuario.
