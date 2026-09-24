# Brasaland API

Punto de extension para los servicios backend de Brasaland. El website y el backoffice pueden conectar aqui los contratos de reservas, sedes, menu y metricas operativas.

## Contratos previstos

- `GET /locations`: sedes activas, ciudad y horario.
- `GET /menu`: platos disponibles y categorias.
- `GET /reservations`: reservas por fecha, sede y estado.
- `POST /reservations`: solicitud de reserva desde el website.
- `GET /metrics`: ventas, ocupacion y satisfaccion para el backoffice.
