# Actividad 1 — Regresión lineal

## Descripción del problema
La actividad estudia la relación entre las horas de estudio y el puntaje (SCORE) de un estudiante. Se utiliza un conjunto de datos construido en el propio script: diez registros iniciales y veinte registros sintéticos adicionales.

## Objetivo
Entrenar un modelo de regresión lineal que estime el puntaje a partir de las horas de estudio y permita consultar predicciones dentro del rango observado.

## Herramientas
- Python
- Pandas y NumPy para preparar los datos
- Scikit-learn para entrenar el modelo y calcular métricas
- Matplotlib para visualizar los datos, la recta y la predicción

## Desarrollo de la solución
1. Se crea un DataFrame con los pares iniciales de horas y puntajes.
2. Con la semilla aleatoria 42 se generan 20 registros adicionales. Las horas se eligen entre 1 y 10 y el puntaje se obtiene añadiendo ruido aleatorio, limitado al intervalo de 0 a 10.
3. Se combinan los datos en una tabla de 30 registros.
4. Se entrena `LinearRegression` usando `HORAS_ESTUDIO` como variable independiente y `SCORE` como variable objetivo.
5. Se calculan pendiente, intercepto, R² y error cuadrático medio (MSE).
6. Se valida que la entrada del usuario esté dentro del mínimo y máximo de horas del conjunto antes de generar la predicción.
7. Se muestra una gráfica de dispersión, la línea de regresión y el punto predicho.

## Resultados reproducibles
Con los datos y la semilla incluidos en el archivo, el ajuste sobre los 30 registros produce aproximadamente:

| Indicador | Resultado |
|---|---:|
| Registros | 30 |
| Pendiente | 0.8739 |
| Intercepto | 0.7652 |
| R² | 0.9418 |
| MSE | 0.2866 |

Como ejemplo, al ingresar 5 horas, el modelo estima un puntaje de aproximadamente **5.13**.

> Las métricas anteriores se calculan sobre los mismos registros usados para ajustar el modelo; el script no separa un conjunto independiente de prueba. Por ello, describen el ajuste sobre estos datos y no constituyen una evaluación de generalización.

## Archivos
- `regresionlineal.py`: código fuente original de la actividad.

## Ejecución
Instala las dependencias de Python indicadas en `requirements.txt` y ejecuta:

```bash
python regresionlineal.py
```

Introduce un número de horas entre 1 y 10 para observar la predicción y la gráfica.

## Evidencias
El programa genera la visualización y guarda automáticamente una copia en evidencias/regresion-lineal.png al ejecutar una predicción válida. La captura de la ejecución completa todavía debe añadirse después de correr la actividad en el entorno correspondiente.
