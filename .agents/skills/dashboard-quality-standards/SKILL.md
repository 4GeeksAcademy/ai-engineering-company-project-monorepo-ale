---
name: dashboard-quality-standards
description: "Use when implementing, refactoring, or reviewing the Brasaland backoffice dashboard, especially currency formatting, UI component structure, or regression tests."
---

# Estándares de calidad del dashboard

## Objetivo y alcance

Aplicar convenciones coherentes y verificables a `uis/backoffice/`, que actualmente usa HTML, CSS y JavaScript nativo. Mantener el stack existente: no introducir React, Next.js, una biblioteca de componentes ni dependencias de pruebas sin una necesidad justificada.

Usar esta skill al crear o cambiar importes monetarios, controles o paneles del dashboard, y al verificar regresiones en esos flujos.

## Formato centralizado de moneda

- Mantener importes como valores numéricos en los datos. No guardar ni duplicar cadenas localizadas como `$8.426.000` en el marcado o en la lógica de negocio.
- Centralizar la presentación en una única función `formatCurrency(value, currency, locale)` ubicada en un módulo compartido del backoffice. Si la aplicación sigue usando scripts clásicos, cargar ese módulo antes de `app.js`; no replicar la función en cada archivo o componente.
- Implementar el formato con `Intl.NumberFormat(locale, { style: 'currency', currency })`. El código ISO 4217 de moneda debe ser explícito; no inferir COP o USD del símbolo `$` ni del texto de una sede.
- Usar `es-CO` como locale inicial del dashboard. Definir los decimales según el contrato de datos y la moneda: para cantidades COP enteras, configurar cero decimales explícitamente; no redondear ni descartar fracciones sin una decisión de producto.
- Rechazar o tratar explícitamente valores no numéricos/no finitos y códigos de moneda inválidos. No reemplazar `Intl.NumberFormat` con `toFixed`, expresiones regulares ni separadores concatenados a mano.
- Mantener la lógica de cálculo separada del formato visible; el formato nunca debe convertirse de nuevo a número para cálculos.

## Componentes de interfaz

- Mantener la implementación en HTML semántico, CSS y JavaScript nativo. Reutilizar patrones existentes como `.metric-card`, `.panel` y `.filters` antes de crear variantes redundantes.
- Separar responsabilidades: el HTML expresa estructura, el CSS presentación y los manejadores de `app.js` comportamiento. Mantener las funciones pequeñas y con una responsabilidad clara; extraer una abstracción solo cuando exista repetición o complejidad real.
- Para valores o mensajes dinámicos, preferir `textContent` y nodos DOM; no interpolar datos externos con `innerHTML`.
- Evitar estilos inline nuevos. Usar clases y variables CSS para presentación compartida y estados responsive.
- Preservar semántica y accesibilidad: controles nativos, nombres y estados accesibles, foco visible y anuncios de cambios cuando corresponda. Cualquier cambio de interacción debe verificar teclado, estados ARIA y orden de foco.
- No mover cálculos, formato o reglas de presentación al marcado como cadenas mágicas; mantener los datos de pantalla distinguibles de su representación localizada.

## Tests de regresión

1. Antes de añadir infraestructura, buscar el runner, los tests y los comandos ya usados en el repo. Reutilizarlos y no instalar dependencias solo para una prueba aislada.
2. Cada cambio de comportamiento debe tener cobertura de regresión en el límite de test existente. Para `formatCurrency`, cubrir al menos importes grandes, cero, negativos, monedas distintas y las reglas de precisión elegidas.
3. Probar las interacciones que se cambien: filtros (filas visibles y estado seleccionado), menú móvil (abrir/cerrar, Escape y foco) y mensajes de exportación. Las pruebas deben comprobar resultados observables, no solo detalles internos de implementación.
4. Si no hay runner disponible, usar `node:test` nativo para funciones puras, con archivos bajo `uis/backoffice/tests/` y ejecutarlos con `node --test uis/backoffice/tests/*.test.js`. Para comportamiento dependiente del DOM, usar un runner de navegador ya existente; no simular cobertura automatizada si solo se hizo una revisión manual.
5. Cuando una interacción no se pueda automatizar con la infraestructura disponible, documentar y ejecutar un smoke test manual: abrir el dashboard, probar los controles afectados con teclado y ratón, cambiar el viewport cuando corresponda y revisar la consola del navegador.

## Flujo de trabajo

1. Localizar los datos, el renderizado y el manejador que controlan el comportamiento antes de editar.
2. Hacer el cambio mínimo y conservar las convenciones del dashboard.
3. Ejecutar primero el test más cercano al comportamiento modificado; después ejecutar la suite disponible.
4. Ejecutar `node --check uis/backoffice/app.js` para cambios JavaScript y `git diff --check` para el diff.
5. Registrar cualquier prueba manual pendiente o limitación de entorno; no afirmar que hay cobertura o validación de navegador si no se ejecutó.

## Criterios de aceptación

- Los valores de moneda se formatean desde datos numéricos mediante una sola función y con locale/código de moneda explícitos.
- La UI conserva separación de responsabilidades, HTML semántico y patrones de accesibilidad ya establecidos.
- Los comportamientos modificados tienen pruebas de regresión ejecutadas o una limitación manual claramente documentada.
- No se introducen dependencias o abstracciones sin justificación, y los chequeos aplicables terminan sin errores.
