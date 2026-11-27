# Actividad 2 — Laberinto SIVARLAND

## Descripción del problema
SIVARLAND es un juego de laberinto desarrollado con Python y Pygame. El jugador conduce una coaster por una cuadrícula, recoge pasajeros y debe llegar a la terminal representada por una bandera a cuadros.

## Objetivo
Aplicar algoritmos de búsqueda para generar laberintos y encontrar una ruta desde la posición del jugador hasta la meta, integrando la lógica en una aplicación interactiva.

## Herramientas
- Python
- Pygame para la ventana, eventos, controles y renderizado
- Módulos estándar `math`, `random`, `sys` y `collections.deque`

## Algoritmos
### Generación — DFS
La clase `Laberinto` genera el recorrido mediante búsqueda en profundidad (DFS) iterativa. Mantiene una pila y un conjunto de celdas visitadas. Elige aleatoriamente una celda vecina no visitada, elimina la pared que las separa y continúa; cuando no quedan vecinos disponibles, retrocede mediante *backtracking*.

### Resolución — BFS
El método `resolver` aplica búsqueda en anchura (BFS). Utiliza una cola, registra el padre de cada celda visitada y recorre las celdas alcanzables hasta encontrar la meta. Después reconstruye el camino desde la meta hasta el origen. Al explorar por niveles, BFS devuelve una ruta con el menor número de movimientos en esta cuadrícula no ponderada.

## Niveles implementados
| Nivel | Cuadrícula | Pasajeros | Característica |
|---|---:|---:|---|
| Ruta Centro | 12 × 8 | 6 | Laberinto normal |
| Tormenta Eléctrica | 14 × 9 | 8 | Las paredes cambian cada 5 segundos; chocar añade 2 segundos de penalización |
| Ruta Nocturna | 26 × 17 | 10 | Visibilidad limitada por la luz de los faros |

## Funcionamiento y controles
- Flechas o WASD: mover la coaster.
- Botón **Ver ruta óptima**: mostrar u ocultar el camino calculado.
- P: generar otro laberinto.
- ESC: volver al menú.
- ENTER: avanzar al siguiente nivel o regresar al menú según la pantalla.

El juego muestra pasajeros recogidos, movimientos y tiempo; en el nivel eléctrico también muestra las descargas. Al finalizar presenta un resumen del recorrido.

## Archivos
- `laberinto.py`: código fuente del juego.

## Ejecución
Instala Pygame y ejecuta:

```bash
pip install pygame
python laberinto.py
```

## Resultados y evidencias
El código contiene los tres niveles, generación DFS, resolución BFS, controles y pantallas de finalización. No se adjuntaron capturas ni registros de partidas completadas; deben incorporarse después de ejecutar el juego para documentar visualmente su funcionamiento y los resultados de una partida real.
