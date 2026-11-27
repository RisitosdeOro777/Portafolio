# Actividad 3 — AI Challenge: K-Means y KNN

## Descripción del reto
Actividad grupal de Machine Learning que crea un conjunto de datos sintéticos de 500 estudiantes para explorar patrones de hábitos de estudio y predecir si un estudiante aprobaría según sus horas de estudio, asistencia y tareas completadas.

## Herramientas
- Python
- NumPy y Pandas para generar y organizar los datos
- Scikit-learn para normalización, K-Means, división de datos y KNN
- Matplotlib para las gráficas

## Desarrollo

### 1. Datos sintéticos
El script fija la semilla aleatoria en 42 y genera 500 registros. Las variables son horas de estudio (0–20), asistencia (40–100) y tareas (20–100). La nota se calcula con una fórmula ponderada de esas variables más ruido aleatorio y se limita al intervalo 0–100. La etiqueta `aprobo` vale 1 cuando la nota es al menos 60 y 0 en caso contrario.

### 2. K-Means
Se normalizan las tres variables de hábitos con `StandardScaler`. Luego se ajustan dos modelos: uno con 3 grupos y otro con 4, ambos con `n_init=10` y `random_state=42`. El programa muestra los promedios de horas, asistencia, tareas y nota por grupo y genera una gráfica de horas frente a asistencia.

### 3. KNN
Se utilizan horas, asistencia y tareas como variables predictoras; la nota no se incluye porque de ella se deriva la etiqueta de aprobación. Los datos se dividen en 75% para entrenamiento (375 registros) y 25% para prueba (125), con `random_state=42`. El escalador se ajusta solo con el conjunto de entrenamiento para evitar fuga de información.

Se comparan los valores de k = 1, 3, 5, 7, 11, 15 y 21, tanto con variables normalizadas como sin normalizar.

## Resultados de la ejecución
La ejecución del archivo `actividad_kmeans_knn.py` con las dependencias indicadas produjo:

- 253 estudiantes aprobados y 247 reprobados en el conjunto sintético.
- División de KNN: 375 registros de entrenamiento y 125 de prueba.

| k | Exactitud con normalización | Exactitud sin normalización |
|---:|---:|---:|
| 1 | 88.0% | 85.6% |
| 3 | **91.2%** | 86.4% |
| 5 | 88.0% | 82.4% |
| 7 | 89.6% | 84.0% |
| 11 | **91.2%** | 84.0% |
| 15 | 90.4% | 84.0% |
| 21 | 89.6% | 84.8% |

El programa selecciona k = 3 porque es el primer valor que alcanza la exactitud máxima con normalización (91.2%). En el desafío final, el estudiante con 4 horas de estudio, 55% de asistencia y 50% de tareas es clasificado como **REPRUEBA**, con 100% de probabilidad estimada para esa clase en el modelo ajustado.

## Interpretación y limitaciones
En esta ejecución, la normalización mejora la exactitud de KNN para todos los valores de k comparados. El mejor resultado medido es 91.2% en el conjunto de prueba, alcanzado con k = 3 y k = 11. El código selecciona k = 3 por aparecer primero en la lista.

Los datos son artificiales y se generan mediante una fórmula programada; por tanto, estos resultados sirven para practicar los algoritmos y comparar configuraciones, no para evaluar estudiantes reales ni para afirmar capacidad predictiva en un entorno educativo real. Los promedios de K-Means describen los grupos generados y no representan categorías académicas oficiales.

## Archivos
- `actividad_kmeans_knn.py`: código fuente de la actividad.

## Ejecución
Desde la raíz del repositorio:

```bash
pip install -r requirements.txt
python Actividades/03-AI-Challenge/actividad_kmeans_knn.py
```

El script abre tres gráficas: K-Means con 3 grupos, K-Means con 4 grupos y comparación de exactitud de KNN. Para ejecutarlo en un entorno sin interfaz gráfica, configura un backend no interactivo de Matplotlib; en ese modo las ventanas no se muestran.
