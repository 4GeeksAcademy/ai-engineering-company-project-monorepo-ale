# Reglas y Protocolos para Agentes de IA

## 1. Archivos de Memoria Requeridos al Inicio de Sesión
El agente DEBE leer obligatoriamente los siguientes archivos del banco de memoria al comenzar cualquier sesión:
- `memory-bank/projectbrief.md`
- `memory-bank/techContext.md`
- `memory-bank/progress.md`

## 2. Flujo Obligatorio Antes de Cada Commit
Antes de realizar cualquier commit o push, el agente debe ejecutar estrictamente estos 4 pasos ordenados:
1. **Verificación de Tipos y Pruebas:** Ejecutar linters y verificar sintaxis.
2. **Revisión de Archivos Modificados (`git status`):** Confirmar qué archivos fueron alterados.
3. **Actualización del Banco de Memoria:** Registrar los progresos en `memory-bank/progress.md`.
4. **Mensaje de Commit Descriptivo:** Crear un commit bajo la convención Conventional Commits (ej. `feat:`, `fix:`, `docs:`).

## 3. Restricciones y Archivos Protegidos
El agente **NO DEBE MODIFICAR** sin autorización previa explícita del desarrollador:
- `CONTEXT.md` y `CONTEXT.es.md`
- `.devcontainer/` y configuraciones globales
- `.gitignore`
- Archivos de configuración raíz