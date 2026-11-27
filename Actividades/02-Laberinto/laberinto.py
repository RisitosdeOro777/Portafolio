"""
SIVARLAND - Laberinto en Python (pygame)
========================================
Conduces una COASTER (microbús) por la ciudad: recoge pasajeros por el camino
y llega a la terminal (la bandera a cuadros).

NIVELES
  1. Ruta Centro ........ laberinto normal.
  2. Tormenta Eléctrica . paredes eléctricas: TODO el laberinto cambia cada
                          5 segundos. Chocar con una pared da una descarga (+2 s).
  3. Ruta Nocturna ...... oscuridad: solo ves lo que alumbran tus faros.

CONTROLES
  Flechas o WASD ........ mover la coaster
  Botón "VER RUTA" ...... (con el mouse) muestra la mejor ruta hasta la meta
  P ..................... genera otro laberinto
  ESC ................... volver al menú

ESTRUCTURA DEL CÓDIGO
  - Laberinto : genera (DFS), resuelve (BFS) y muta paredes (nivel eléctrico).
  - Boton     : botón rectangular para menús y para el botón de ruta.
  - Juego     : estados (menú, jugando...), eventos, lógica y dibujo.
"""

import math
import random
import sys
from collections import deque

import pygame

# ----------------------------------------------------------------------------
# CONFIGURACIÓN
# ----------------------------------------------------------------------------
ANCHO = 900
ALTO_HUD, ALTO_LAB, ALTO_PIE = 60, 600, 28
ALTO = ALTO_HUD + ALTO_LAB + ALTO_PIE
FPS = 60

INTERVALO_CAMBIO = 5000      # ms entre cambios de paredes (nivel eléctrico)
PENALIZACION_DESCARGA = 2    # segundos que suma una descarga
PAUSA_MOVIMIENTO = 110       # ms entre pasos si mantienes la tecla

COL_TEXTO = (235, 240, 250)
COL_TENUE = (130, 150, 185)
COL_PANEL = (12, 14, 32)
COL_ORO = (255, 200, 60)
COL_META = (80, 255, 150)
COL_RUTA = (255, 150, 30)
COL_ALERTA = (255, 255, 255)   # aviso blanco antes de cada cambio
COLORES_ROPA = [(235, 70, 90), (70, 140, 255), (90, 220, 120), (190, 100, 255)]

# Dirección: (dx, dy). N = arriba, E = derecha, S = abajo, O = izquierda
DIRECCIONES = {"N": (0, -1), "E": (1, 0), "S": (0, 1), "O": (-1, 0)}
OPUESTA = {"N": "S", "S": "N", "E": "O", "O": "E"}
ANGULO_BUS = {"E": 0, "N": 90, "O": 180, "S": 270}

NIVELES = [
    {
        "nombre": "Ruta Centro", "cols": 12, "filas": 8, "pasajeros": 6,
        "niebla": None, "electrico": False,
        "color": (70, 225, 235),
        "desc": "Calles tranquilas. Recoge pasajeros y llega a la terminal.",
    },
    {
        "nombre": "Tormenta Eléctrica", "cols": 14, "filas": 9, "pasajeros": 8,
        "niebla": None, "electrico": True,
        "color": (200, 230, 255),
        "desc": "El laberinto entero cambia cada 5 segundos. Cuidado con las descargas.",
    },
    {
        "nombre": "Ruta Nocturna", "cols": 26, "filas": 17, "pasajeros": 10,
        "niebla": 5, "electrico": False,
        "color": (190, 140, 255),
        "desc": "Noche cerrada. Solo ves lo que alumbran los faros de la coaster.",
    },
]


# ----------------------------------------------------------------------------
# FUNCIONES AUXILIARES DE COLOR
# ----------------------------------------------------------------------------
def atenuar(color, f):
    """Oscurece un color multiplicándolo por f (0 a 1)."""
    return (int(color[0] * f), int(color[1] * f), int(color[2] * f))


def mezclar(a, b, t):
    """Mezcla dos colores; t=0 da a, t=1 da b."""
    return (int(a[0] + (b[0] - a[0]) * t),
            int(a[1] + (b[1] - a[1]) * t),
            int(a[2] + (b[2] - a[2]) * t))


# ----------------------------------------------------------------------------
# CLASE LABERINTO: genera, resuelve y muta
# ----------------------------------------------------------------------------
class Laberinto:
    def __init__(self, cols, filas):
        self.cols = cols
        self.filas = filas
        # Cada celda guarda sus 4 paredes. True = hay pared.
        self.celdas = [
            [{"N": True, "E": True, "S": True, "O": True} for _ in range(cols)]
            for _ in range(filas)
        ]
        self.inicio = (0, 0)
        self.meta = (cols - 1, filas - 1)
        self.generar()

    def dentro(self, x, y):
        return 0 <= x < self.cols and 0 <= y < self.filas

    def vecino(self, x, y, d):
        dx, dy = DIRECCIONES[d]
        return x + dx, y + dy

    def poner_pared(self, x, y, d, valor):
        """Pone o quita la pared entre una celda y su vecina (en ambos lados)."""
        nx, ny = self.vecino(x, y, d)
        self.celdas[y][x][d] = valor
        self.celdas[ny][nx][OPUESTA[d]] = valor

    def generar(self):
        """DFS iterativo: avanza a un vecino no visitado tumbando la pared
        entre ambos; si no hay vecinos, retrocede (backtracking)."""
        visitadas = {self.inicio}
        pila = [self.inicio]
        while pila:
            x, y = pila[-1]
            vecinos = []
            for d in DIRECCIONES:
                nx, ny = self.vecino(x, y, d)
                if self.dentro(nx, ny) and (nx, ny) not in visitadas:
                    vecinos.append((d, nx, ny))
            if vecinos:
                d, nx, ny = random.choice(vecinos)
                self.poner_pared(x, y, d, False)
                visitadas.add((nx, ny))
                pila.append((nx, ny))
            else:
                pila.pop()

    def puede_mover(self, x, y, d):
        return not self.celdas[y][x][d]

    def resolver(self, origen):
        """BFS desde 'origen' hasta la meta. Devuelve la lista de celdas
        de la ruta más corta (o [] si no hay camino)."""
        cola = deque([origen])
        padre = {origen: None}
        while cola:
            actual = cola.popleft()
            if actual == self.meta:
                break
            x, y = actual
            for d in DIRECCIONES:
                vecino = self.vecino(x, y, d)
                if self.puede_mover(x, y, d) and vecino not in padre:
                    padre[vecino] = actual
                    cola.append(vecino)
        if self.meta not in padre:
            return []
        camino, nodo = [], self.meta
        while nodo is not None:
            camino.append(nodo)
            nodo = padre[nodo]
        return camino[::-1]

    def regenerar(self):
        """Tira todas las paredes y vuelve a generar el laberinto con DFS
        (nivel eléctrico). Como el DFS conecta TODAS las celdas, siempre
        hay camino desde donde esté el jugador hasta la meta."""
        for fila in self.celdas:
            for celda in fila:
                for d in celda:
                    celda[d] = True
        self.generar()

    def segmentos(self):
        """Lista de paredes como segmentos entre vértices de la cuadrícula."""
        segs = []
        for y in range(self.filas):
            for x in range(self.cols):
                c = self.celdas[y][x]
                if c["N"]:
                    segs.append(((x, y), (x + 1, y)))
                if c["O"]:
                    segs.append(((x, y), (x, y + 1)))
                if y == self.filas - 1 and c["S"]:
                    segs.append(((x, y + 1), (x + 1, y + 1)))
                if x == self.cols - 1 and c["E"]:
                    segs.append(((x + 1, y), (x + 1, y + 1)))
        return segs


# ----------------------------------------------------------------------------
# CLASE BOTON
# ----------------------------------------------------------------------------
class Boton:
    def __init__(self, texto, centro, color, ancho=340, alto=48):
        self.texto = texto
        self.color = color
        self.rect = pygame.Rect(0, 0, ancho, alto)
        self.rect.center = centro


# ----------------------------------------------------------------------------
# CLASE JUEGO
# ----------------------------------------------------------------------------
class Juego:
    def __init__(self):
        pygame.init()
        self.pantalla = pygame.display.set_mode((ANCHO, ALTO))
        pygame.display.set_caption("SIVARLAND")
        self.reloj = pygame.time.Clock()

        fam = "consolas,couriernew,dejavusansmono,menlo,arial"
        self.f_xs = pygame.font.SysFont(fam, 14, bold=True)
        self.f_peq = pygame.font.SysFont(fam, 17, bold=True)
        self.f_med = pygame.font.SysFont(fam, 22, bold=True)
        self.f_grande = pygame.font.SysFont(fam, 40, bold=True)
        self.f_titulo = pygame.font.SysFont(fam, 88, bold=True)

        # Superficies reutilizables (se crean una sola vez)
        self.capa = pygame.Surface((ANCHO, ALTO_LAB), pygame.SRCALPHA)
        self.paredes_surf = pygame.Surface((ANCHO, ALTO_LAB), pygame.SRCALPHA)
        self.fog = pygame.Surface((ANCHO, ALTO_LAB), pygame.SRCALPHA)
        self._brillos = {}
        self._neon = {}

        self.fondo_juego = self.crear_fondo_juego()
        self.fondo_menu = self.crear_fondo_menu()
        self.bus_lateral = self.crear_bus_lateral()
        self.cono_menu = pygame.Surface((170, 90), pygame.SRCALPHA)
        pygame.draw.polygon(self.cono_menu, (255, 240, 150, 40),
                            [(0, 45), (170, 0), (170, 90)])

        # Estado general
        self.estado = "menu"   # menu | niveles | instrucciones | jugando | nivel_ok | fin
        self.sel = 0
        self.nivel = 0
        self.cfg = NIVELES[0]
        self.version = 0
        self.rayos = []
        self.construir_botones()
        self.resetear_totales()

    # ------------------------------------------------------------------
    # PREPARACIÓN
    # ------------------------------------------------------------------
    def construir_botones(self):
        cx = ANCHO // 2
        nombres = ("JUGAR", "ELEGIR NIVEL", "CÓMO JUGAR", "SALIR")
        self.b_menu = [Boton(t, (cx, 255 + i * 58), COL_ORO) for i, t in enumerate(nombres)]
        self.b_niveles = [
            Boton(f"{i + 1} · {n['nombre'].upper()}", (cx, 170 + i * 62), n["color"], ancho=440)
            for i, n in enumerate(NIVELES)
        ]
        self.b_niveles.append(Boton("VOLVER", (cx, 170 + len(NIVELES) * 62), COL_TENUE))
        self.b_instr = [Boton("VOLVER", (cx, 480), COL_ORO)]
        # Botón de la ruta óptima (dentro del HUD, se hace clic con el mouse)
        self.btn_ruta = Boton("VER RUTA ÓPTIMA", (ANCHO - 16 - 100, ALTO_HUD // 2),
                              COL_RUTA, ancho=200, alto=40)

    def botones_actuales(self):
        return {"menu": self.b_menu, "niveles": self.b_niveles,
                "instrucciones": self.b_instr}.get(self.estado)

    def resetear_totales(self):
        self.total_movs = 0
        self.total_tiempo = 0.0
        self.total_rec = 0
        self.total_pas = 0
        self.total_rutas = 0
        self.total_descargas = 0

    def cargar_nivel(self, nivel=None):
        """Crea un laberinto nuevo para el nivel actual y reinicia sus datos."""
        if nivel is not None:
            self.nivel = nivel
        cfg = NIVELES[self.nivel]
        self.cfg = cfg
        self.lab = Laberinto(cfg["cols"], cfg["filas"])
        self.celda = min(ANCHO // cfg["cols"], ALTO_LAB // cfg["filas"])
        self.off_x = (ANCHO - self.celda * cfg["cols"]) // 2
        self.off_y = (ALTO_LAB - self.celda * cfg["filas"]) // 2

        self.pos = list(self.lab.inicio)
        self.vis = [self.pos[0] + 0.5, self.pos[1] + 0.5]   # posición suavizada
        self.dir_bus = "E"
        self.movs = 0
        self.rutas = 0
        self.descargas = 0
        self.penal = 0.0
        self.recogidos = 0
        self.ruta_activa = False
        self.tiempo = 0.0
        self.ultimo_mov = 0
        self.flotantes = []

        ahora = pygame.time.get_ticks()
        self.t_inicio = ahora
        self.t_cambio = ahora + INTERVALO_CAMBIO
        self.flash_hasta = 0
        self.shake_hasta = 0
        self.cooldown_descarga = 0

        self.version += 1
        self.clave_ruta = None
        self.ruta = []

        self.crear_imagenes_nivel()
        self.colocar_pasajeros(cfg["pasajeros"])
        self.segs = self.lab.segmentos()
        self.reconstruir_paredes()

        if cfg["niebla"]:
            self.radio_luz = int((cfg["niebla"] + 0.5) * self.celda)
            self.luz = self.crear_luz(self.radio_luz)

    def colocar_pasajeros(self, cantidad):
        libres = [(x, y) for y in range(self.lab.filas) for x in range(self.lab.cols)
                  if (x, y) not in (self.lab.inicio, self.lab.meta)]
        elegidas = random.sample(libres, cantidad)
        self.pasajeros = [{"x": x, "y": y, "var": random.randrange(len(COLORES_ROPA))}
                          for (x, y) in elegidas]

    # ------------------------------------------------------------------
    # IMÁGENES (todo se dibuja con código, no se necesitan archivos)
    # ------------------------------------------------------------------
    def crear_fondo_juego(self):
        fondo = pygame.Surface((ANCHO, ALTO))
        for y in range(ALTO):
            pygame.draw.line(fondo, mezclar((10, 14, 34), (28, 14, 46), y / ALTO),
                             (0, y), (ANCHO, y))
        rnd = random.Random(7)
        for _ in range(900):   # granitos de asfalto
            v = rnd.randint(20, 38)
            fondo.set_at((rnd.randrange(ANCHO), rnd.randrange(ALTO)), (v, v + 4, v + 14))
        return fondo

    def crear_fondo_menu(self):
        fondo = pygame.Surface((ANCHO, ALTO))
        y_calle = 560
        for y in range(y_calle):
            pygame.draw.line(fondo, mezclar((8, 10, 36), (90, 40, 100), y / y_calle),
                             (0, y), (ANCHO, y))
        rnd = random.Random(3)
        for _ in range(130):   # estrellas
            x, y = rnd.randrange(ANCHO), rnd.randrange(330)
            v = rnd.randint(110, 255)
            pygame.draw.circle(fondo, (v, v, min(255, v + 20)), (x, y), rnd.choice((1, 1, 2)))
        # Luna
        pygame.draw.circle(fondo, (250, 245, 215), (790, 95), 34)
        pygame.draw.circle(fondo, (24, 20, 60), (806, 85), 30)
        # Edificios de fondo con ventanas encendidas
        x = 0
        while x < ANCHO:
            w = rnd.randint(40, 80)
            h = rnd.randint(40, 110)
            pygame.draw.rect(fondo, (14, 14, 40), (x, y_calle - h, w, h))
            for wy in range(y_calle - h + 8, y_calle - 8, 16):
                for wx in range(x + 6, x + w - 8, 14):
                    if rnd.random() < 0.35:
                        pygame.draw.rect(fondo, (255, 214, 110), (wx, wy, 6, 8))
            x += w + rnd.randint(2, 10)
        # Calle y banqueta
        pygame.draw.rect(fondo, (26, 26, 38), (0, y_calle, ANCHO, ALTO - y_calle))
        pygame.draw.rect(fondo, (80, 80, 105), (0, y_calle, ANCHO, 8))
        return fondo

    def crear_bus_lateral(self):
        """Coaster vista de lado (para el menú). Las ruedas se dibujan aparte
        para poder hacerlas girar."""
        L, H = 200, 80
        s = pygame.Surface((L, H), pygame.SRCALPHA)
        pygame.draw.rect(s, (245, 245, 235), (0, 0, L, H - 14), border_radius=14)
        pygame.draw.rect(s, (240, 100, 40), (0, 38, L, 15))
        for i in range(6):
            pygame.draw.rect(s, (60, 110, 170), (14 + i * 25, 10, 20, 22), border_radius=4)
        pygame.draw.polygon(s, (60, 110, 170),
                            [(L - 38, 10), (L - 12, 12), (L - 6, 34), (L - 38, 34)])
        pygame.draw.circle(s, (255, 240, 150), (L - 5, 48), 6)
        pygame.draw.rect(s, (230, 40, 60), (0, 44, 5, 8))
        pygame.draw.rect(s, (70, 70, 85), (0, 58, L, 6))
        txt = self.f_xs.render("SIVARLAND", True, (255, 255, 255))
        s.blit(txt, txt.get_rect(center=(L // 2 - 10, 46)))
        return s

    def crear_imagenes_nivel(self):
        """Imágenes que dependen del tamaño de celda del nivel."""
        c = self.celda
        # --- Coaster vista desde arriba (se rota según la dirección) ---
        L = max(18, int(c * 0.78))
        W = max(11, int(c * 0.48))
        m = max(2, W // 6)
        base = pygame.Surface((L, W + 2 * m), pygame.SRCALPHA)
        y0 = m
        pygame.draw.rect(base, (245, 245, 235), (0, y0, L, W), border_radius=max(3, W // 4))
        pygame.draw.rect(base, (240, 100, 40),
                         (int(L * 0.10), y0 + int(W * 0.34), int(L * 0.62), max(2, int(W * 0.32))),
                         border_radius=2)
        pygame.draw.polygon(base, (50, 90, 150), [
            (int(L * 0.80), y0 + int(W * 0.14)), (int(L * 0.96), y0 + int(W * 0.24)),
            (int(L * 0.96), y0 + int(W * 0.76)), (int(L * 0.80), y0 + int(W * 0.86))])
        for fy in (0.18, 0.82):
            pygame.draw.circle(base, (255, 240, 150), (L - 2, y0 + int(W * fy)), max(2, W // 9))
            pygame.draw.rect(base, (230, 40, 60), (0, y0 + int(W * fy) - 1, max(2, L // 12), 3))
        for fx in (0.22, 0.70):
            pygame.draw.rect(base, (25, 25, 32), (int(L * fx), 0, max(3, L // 6), m + 2))
            pygame.draw.rect(base, (25, 25, 32), (int(L * fx), y0 + W - 2, max(3, L // 6), m + 2))
        self.img_bus = {d: pygame.transform.rotate(base, ang) for d, ang in ANGULO_BUS.items()}

        # --- Pasajeros (varios colores de camisa) ---
        s = max(16, int(c * 0.52))
        self.img_pasajero = []
        for ropa in COLORES_ROPA:
            img = pygame.Surface((s, s), pygame.SRCALPHA)
            piel = (255, 214, 170)
            pygame.draw.circle(img, piel, (s // 2, int(s * 0.24)), max(2, int(s * 0.16)))
            pygame.draw.rect(img, ropa, (int(s * 0.28), int(s * 0.42), int(s * 0.44), int(s * 0.36)),
                             border_radius=max(2, s // 8))
            for px in (0.32, 0.54):
                pygame.draw.rect(img, (40, 40, 60), (int(s * px), int(s * 0.76), max(2, int(s * 0.14)), int(s * 0.2)))
            pygame.draw.line(img, piel, (int(s * 0.70), int(s * 0.48)), (int(s * 0.90), int(s * 0.18)),
                             max(2, s // 10))   # brazo levantado: "¡pare!"
            self.img_pasajero.append(img)

        # --- Meta: bandera a cuadros ---
        t = max(20, int(c * 0.8))
        img = pygame.Surface((t, t), pygame.SRCALPHA)
        pw = max(2, t // 12)
        pygame.draw.rect(img, (235, 235, 245), (int(t * 0.18), int(t * 0.08), pw, int(t * 0.84)))
        fx, fy = int(t * 0.18) + pw, int(t * 0.10)
        fw, fh = int(t * 0.66), int(t * 0.42)
        cw, ch = fw // 4, fh // 3
        for i in range(4):
            for j in range(3):
                col = (245, 245, 250) if (i + j) % 2 == 0 else (25, 25, 40)
                pygame.draw.rect(img, col, (fx + i * cw, fy + j * ch, cw, ch))
        self.img_meta = img

    def brillo(self, radio, color, intensidad=1.0):
        """Mancha de luz circular con degradado (se guarda en caché)."""
        radio = max(2, int(radio))
        clave = (radio, color, round(intensidad, 2))
        img = self._brillos.get(clave)
        if img is None:
            img = pygame.Surface((radio * 2, radio * 2), pygame.SRCALPHA)
            for r in range(radio, 0, -1):
                a = int(255 * intensidad * (1 - r / radio) ** 2)
                pygame.draw.circle(img, (*color, a), (radio, radio), r)
            self._brillos[clave] = img
        return img

    def crear_luz(self, radio):
        """Máscara de la oscuridad: transparente al centro, opaca afuera."""
        luz = pygame.Surface((radio * 2, radio * 2), pygame.SRCALPHA)
        luz.fill((255, 255, 255, 255))
        for r in range(radio, 0, -2):
            a = int(255 * (r / radio) ** 1.6)
            pygame.draw.circle(luz, (255, 255, 255, a), (radio, radio), r)
        return luz

    def neon(self, s, fuente, color, centro):
        """Texto estilo letrero de neón (con caché para no recrearlo)."""
        clave = (s, id(fuente), color)
        img = self._neon.get(clave)
        if img is None:
            nucleo = mezclar(color, (255, 255, 255), 0.6)
            halo = fuente.render(s, True, atenuar(color, 0.45))
            base = fuente.render(s, True, nucleo)
            w, h = base.get_size()
            img = pygame.Surface((w + 16, h + 16), pygame.SRCALPHA)
            for dx, dy in ((-3, 0), (3, 0), (0, -3), (0, 3), (-2, -2), (2, 2), (-2, 2), (2, -2)):
                img.blit(halo, (8 + dx, 8 + dy))
            img.blit(base, (8, 8))
            self._neon[clave] = img
        self.pantalla.blit(img, img.get_rect(center=centro))

    def texto(self, s, fuente, color, centro=None, izq=None, der=None):
        img = fuente.render(s, True, color)
        if centro is not None:
            r = img.get_rect(center=centro)
        elif izq is not None:
            r = img.get_rect(midleft=izq)
        else:
            r = img.get_rect(midright=der)
        self.pantalla.blit(img, r)

    # ------------------------------------------------------------------
    # PAREDES
    # ------------------------------------------------------------------
    def px(self, v):
        """Vértice de la cuadrícula -> píxeles dentro de la capa."""
        return (self.off_x + v[0] * self.celda, self.off_y + v[1] * self.celda)

    def centro_celda(self, x, y):
        c = self.celda
        return (self.off_x + x * c + c // 2, self.off_y + y * c + c // 2)

    def centro_vis(self, vx, vy):
        return (int(self.off_x + vx * self.celda), int(self.off_y + vy * self.celda))

    def reconstruir_paredes(self):
        """Dibuja las paredes en una superficie para no redibujarlas cada
        frame. Se usan 3 capas (ancha tenue -> fina brillante) para el brillo."""
        if self.cfg["electrico"]:
            self.construir_rayos()
            return
        surf = self.paredes_surf
        surf.fill((0, 0, 0, 0))
        color = self.cfg["color"]
        capas = [(9, (*color, 40)), (5, (*color, 110)), (2, (*color, 255))]
        for ancho, col in capas:
            for a, b in self.segs:
                p1, p2 = self.px(a), self.px(b)
                pygame.draw.line(surf, col, p1, p2, ancho)
                pygame.draw.circle(surf, col, p1, ancho // 2)
                pygame.draw.circle(surf, col, p2, ancho // 2)

    def construir_rayos(self):
        """Nivel eléctrico: cada pared es una línea quebrada que vibra."""
        self.rayos = []
        amp = self.celda * 0.09
        for a, b in self.segs:
            p1, p2 = self.px(a), self.px(b)
            pts = [p1]
            for k in range(1, 4):
                t = k / 4
                off = random.uniform(-amp, amp)
                if p1[0] == p2[0]:   # pared vertical: vibra en x
                    pts.append((p1[0] + off, p1[1] + (p2[1] - p1[1]) * t))
                else:                # pared horizontal: vibra en y
                    pts.append((p1[0] + (p2[0] - p1[0]) * t, p1[1] + off))
            pts.append(p2)
            self.rayos.append(pts)
        self.t_rayos = pygame.time.get_ticks()

    # ------------------------------------------------------------------
    # LÓGICA
    # ------------------------------------------------------------------
    def mover(self, d, now):
        self.dir_bus = d
        x, y = self.pos
        if self.lab.puede_mover(x, y, d):
            dx, dy = DIRECCIONES[d]
            self.pos = [x + dx, y + dy]
            self.movs += 1
            self.revisar_celda(now)
        elif self.cfg["electrico"] and now >= self.cooldown_descarga:
            # ¡Descarga eléctrica!
            self.descargas += 1
            self.penal += PENALIZACION_DESCARGA
            self.cooldown_descarga = now + 700
            self.shake_hasta = now + 250

    def revisar_celda(self, now):
        x, y = self.pos
        if (x, y) == self.lab.meta:
            self.terminar_nivel()
            return
        for p in self.pasajeros:
            if p["x"] == x and p["y"] == y:
                self.pasajeros.remove(p)
                self.recogidos += 1
                px_, py_ = self.centro_celda(x, y)
                self.flotantes.append({"t": "+1", "x": px_, "y": py_, "t0": now})
                break

    def cambiar_laberinto(self, now):
        """Nivel eléctrico: genera un laberinto completamente nuevo y reinicia
        la cuenta de 5 segundos. La coaster y los pasajeros se quedan donde están."""
        self.lab.regenerar()
        self.version += 1
        self.segs = self.lab.segmentos()
        self.construir_rayos()
        self.flash_hasta = now + 250
        self.t_cambio = now + INTERVALO_CAMBIO

    def ruta_actual(self):
        """Ruta óptima (BFS) desde donde estás. Se recalcula solo si cambió
        tu posición o el laberinto."""
        clave = (tuple(self.pos), self.version)
        if clave != self.clave_ruta:
            self.ruta = self.lab.resolver(tuple(self.pos))
            self.clave_ruta = clave
        return self.ruta

    def alternar_ruta(self):
        self.ruta_activa = not self.ruta_activa
        if self.ruta_activa:
            self.rutas += 1

    def estrellas(self, recogidos, total):
        if total == 0 or recogidos == total:
            return 3
        return 2 if recogidos * 2 >= total else 1

    def terminar_nivel(self):
        self.total_movs += self.movs
        self.total_tiempo += self.tiempo
        self.total_rec += self.recogidos
        self.total_pas += self.cfg["pasajeros"]
        self.total_rutas += self.rutas
        self.total_descargas += self.descargas
        self.estado = "fin" if self.nivel == len(NIVELES) - 1 else "nivel_ok"

    def iniciar(self, nivel):
        self.resetear_totales()
        self.cargar_nivel(nivel)
        self.estado = "jugando"

    def cambiar_estado(self, nuevo):
        self.estado = nuevo
        self.sel = 0

    def salir(self):
        pygame.quit()
        sys.exit()

    def actualizar(self, dt, now):
        if self.estado != "jugando":
            return
        self.tiempo = (now - self.t_inicio) / 1000 + self.penal

        # Movimiento: se lee el teclado cada frame para poder mantener la tecla
        teclas = pygame.key.get_pressed()
        d = None
        if teclas[pygame.K_UP] or teclas[pygame.K_w]:
            d = "N"
        elif teclas[pygame.K_DOWN] or teclas[pygame.K_s]:
            d = "S"
        elif teclas[pygame.K_LEFT] or teclas[pygame.K_a]:
            d = "O"
        elif teclas[pygame.K_RIGHT] or teclas[pygame.K_d]:
            d = "E"
        if d and now - self.ultimo_mov >= PAUSA_MOVIMIENTO:
            self.ultimo_mov = now
            self.mover(d, now)

        # Nivel eléctrico: las paredes cambian cada 5 s y vibran
        if self.cfg["electrico"] and self.estado == "jugando":
            if now >= self.t_cambio:
                self.cambiar_laberinto(now)
            elif now - self.t_rayos > 70:
                self.construir_rayos()

        # Deslizamiento suave hacia la celda actual
        k = min(1.0, dt * 16)
        self.vis[0] += (self.pos[0] + 0.5 - self.vis[0]) * k
        self.vis[1] += (self.pos[1] + 0.5 - self.vis[1]) * k

    # ------------------------------------------------------------------
    # EVENTOS
    # ------------------------------------------------------------------
    def evento(self, e, now):
        if e.type == pygame.QUIT:
            self.salir()

        botones = self.botones_actuales()
        if botones is not None:                      # pantallas con menú
            if e.type == pygame.MOUSEMOTION:
                for i, b in enumerate(botones):
                    if b.rect.collidepoint(e.pos):
                        self.sel = i
            elif e.type == pygame.MOUSEBUTTONDOWN and e.button == 1:
                for i, b in enumerate(botones):
                    if b.rect.collidepoint(e.pos):
                        self.sel = i
                        self.activar(i)
                        break
            elif e.type == pygame.KEYDOWN:
                if e.key in (pygame.K_UP, pygame.K_w):
                    self.sel = (self.sel - 1) % len(botones)
                elif e.key in (pygame.K_DOWN, pygame.K_s):
                    self.sel = (self.sel + 1) % len(botones)
                elif e.key in (pygame.K_RETURN, pygame.K_KP_ENTER, pygame.K_SPACE):
                    self.activar(self.sel)
                elif e.key == pygame.K_ESCAPE:
                    if self.estado == "menu":
                        self.salir()
                    else:
                        self.cambiar_estado("menu")
            return

        # Pantallas de juego
        if self.estado == "jugando":
            if e.type == pygame.MOUSEBUTTONDOWN and e.button == 1:
                if self.btn_ruta.rect.collidepoint(e.pos):
                    self.alternar_ruta()
            elif e.type == pygame.KEYDOWN:
                if e.key == pygame.K_ESCAPE:
                    self.cambiar_estado("menu")
                elif e.key == pygame.K_p:            # otro laberinto
                    self.cargar_nivel()
        elif self.estado == "nivel_ok":
            if e.type == pygame.KEYDOWN:
                if e.key in (pygame.K_RETURN, pygame.K_KP_ENTER):
                    self.nivel += 1
                    self.cargar_nivel()
                    self.estado = "jugando"
                elif e.key == pygame.K_ESCAPE:
                    self.cambiar_estado("menu")
        elif self.estado == "fin":
            if e.type == pygame.KEYDOWN and e.key in (
                    pygame.K_RETURN, pygame.K_KP_ENTER, pygame.K_ESCAPE):
                self.cambiar_estado("menu")

    def activar(self, i):
        if self.estado == "menu":
            if i == 0:
                self.iniciar(0)
            elif i == 1:
                self.cambiar_estado("niveles")
            elif i == 2:
                self.cambiar_estado("instrucciones")
            else:
                self.salir()
        elif self.estado == "niveles":
            if i < len(NIVELES):
                self.iniciar(i)
            else:
                self.cambiar_estado("menu")
        elif self.estado == "instrucciones":
            self.cambiar_estado("menu")

    # ------------------------------------------------------------------
    # DIBUJO: elementos comunes
    # ------------------------------------------------------------------
    def dibujar_boton(self, b, activo, fuente=None):
        fuente = fuente or self.f_med
        r = b.rect
        if activo:
            pygame.draw.rect(self.pantalla, atenuar(b.color, 0.35), r.inflate(10, 10), 4, border_radius=14)
            relleno = pygame.Surface(r.size, pygame.SRCALPHA)
            pygame.draw.rect(relleno, (*b.color, 55), relleno.get_rect(), border_radius=10)
            self.pantalla.blit(relleno, r)
        pygame.draw.rect(self.pantalla, b.color if activo else atenuar(b.color, 0.55),
                         r, 2, border_radius=10)
        self.texto(b.texto, fuente, (255, 255, 255) if activo else atenuar(COL_TEXTO, 0.8),
                   centro=r.center)

    def dibujar_estrella(self, centro, r, color):
        pts = []
        for i in range(10):
            ang = -math.pi / 2 + i * math.pi / 5
            rad = r if i % 2 == 0 else r * 0.42
            pts.append((centro[0] + rad * math.cos(ang), centro[1] + rad * math.sin(ang)))
        pygame.draw.polygon(self.pantalla, color, pts)

    def dibujar_estrellas(self, n, y):
        for i in range(3):
            col = COL_ORO if i < n else (60, 66, 92)
            self.dibujar_estrella((ANCHO // 2 + (i - 1) * 64, y), 26, col)

    # ------------------------------------------------------------------
    # DIBUJO: menús
    # ------------------------------------------------------------------
    def dibujar_fondo_menu(self, now):
        self.pantalla.blit(self.fondo_menu, (0, 0))
        # Rayas de la calle (fijas) y coaster que avanza
        for x in range(0, ANCHO, 90):
            pygame.draw.rect(self.pantalla, (230, 190, 60), (x + 10, 650, 50, 6))
        L = self.bus_lateral.get_width()
        bx = (now * 0.16) % (ANCHO + 600) - 300
        by = 540 + math.sin(now / 110) * 1.5
        self.pantalla.blit(self.cono_menu, (bx + L - 6, by + 8))
        self.pantalla.blit(self.bus_lateral, (bx, by))
        for wx in (46, L - 50):                      # ruedas giratorias
            c = (int(bx + wx), int(by + 66))
            pygame.draw.circle(self.pantalla, (25, 25, 32), c, 15)
            pygame.draw.circle(self.pantalla, (165, 165, 175), c, 8)
            ang = now * 0.012
            for k in range(3):
                a = ang + k * math.pi / 3
                pygame.draw.line(self.pantalla, (60, 60, 72),
                                 (c[0] - 7 * math.cos(a), c[1] - 7 * math.sin(a)),
                                 (c[0] + 7 * math.cos(a), c[1] + 7 * math.sin(a)), 2)

    def dibujar_menu(self, now):
        self.dibujar_fondo_menu(now)
        self.neon("SIVARLAND", self.f_titulo, COL_ORO, (ANCHO // 2, 105))
        self.texto("La aventura de la coaster", self.f_med, COL_TEXTO, centro=(ANCHO // 2, 172))
        self.texto("Recoge pasajeros y llega a la terminal", self.f_peq, COL_TENUE,
                   centro=(ANCHO // 2, 198))
        for i, b in enumerate(self.b_menu):
            self.dibujar_boton(b, i == self.sel)
        self.texto("Flechas + ENTER, o usa el mouse", self.f_xs, COL_TENUE,
                   centro=(ANCHO // 2, 500))

    def dibujar_niveles(self, now):
        self.dibujar_fondo_menu(now)
        self.neon("ELEGIR NIVEL", self.f_grande, COL_ORO, (ANCHO // 2, 80))
        for i, b in enumerate(self.b_niveles):
            self.dibujar_boton(b, i == self.sel)
        if self.sel < len(NIVELES):
            self.texto(NIVELES[self.sel]["desc"], self.f_peq, COL_TEXTO, centro=(ANCHO // 2, 440))

    def dibujar_instrucciones(self, now):
        self.dibujar_fondo_menu(now)
        self.neon("CÓMO JUGAR", self.f_grande, COL_ORO, (ANCHO // 2, 70))
        self.texto("Eres el conductor de una coaster: recoge pasajeros y llega a la bandera.",
                   self.f_peq, COL_TEXTO, centro=(ANCHO // 2, 125))
        filas = [("FLECHAS / WASD", "Mover la coaster"),
                 ("BOTÓN VER RUTA", "Haz clic: muestra la mejor ruta a la meta"),
                 ("P", "Genera otro laberinto si no te gusta"),
                 ("ESC", "Volver al menú")]
        for i, (k, d) in enumerate(filas):
            y = 180 + i * 38
            self.texto(k, self.f_med, COL_ORO, izq=(110, y))
            self.texto(d, self.f_peq, COL_TEXTO, izq=(380, y))
        notas = ["Nivel 2: el laberinto entero cambia cada 5 s; chocar con una pared da descarga (+2 s).",
                 "Nivel 3: es de noche, solo ves lo que alumbran tus faros.",
                 "Cada pasajero que recojas te da estrellas al final del nivel."]
        for i, n in enumerate(notas):
            self.texto(n, self.f_peq, COL_TENUE, centro=(ANCHO // 2, 360 + i * 30))
        self.dibujar_boton(self.b_instr[0], True)

    # ------------------------------------------------------------------
    # DIBUJO: juego
    # ------------------------------------------------------------------
    def dibujar_rayos(self, capa, now):
        restante = (self.t_cambio - now) / 1000
        alerta = restante < 1.0 and (now // 120) % 2 == 0
        if now < self.flash_hasta or alerta:     # destello blanco al cambiar / antes de cambiar
            nucleo, halo = (255, 255, 255), (120, 160, 255)
        else:
            nucleo, halo = self.cfg["color"], (50, 90, 255)
        for pts in self.rayos:
            pygame.draw.lines(capa, (*halo, 90), False, pts, 6)
        for pts in self.rayos:
            pygame.draw.lines(capa, nucleo, False, pts, 2)

    def dibujar_meta(self, capa, now):
        cx, cy = self.centro_celda(*self.lab.meta)
        pulso = 0.5 + 0.5 * math.sin(now / 260)
        rg = int(self.celda * (0.62 + 0.10 * pulso))
        capa.blit(self.brillo(rg, COL_META, 0.9), (cx - rg, cy - rg))
        capa.blit(self.img_meta, self.img_meta.get_rect(center=(cx, cy)))

    def dibujar_pasajeros(self, capa, now):
        for p in self.pasajeros:
            cx, cy = self.centro_celda(p["x"], p["y"])
            bob = int(math.sin(now / 200 + p["x"] * 1.7 + p["y"]) * self.celda * 0.04)
            rg = int(self.celda * 0.45)
            capa.blit(self.brillo(rg, COL_ORO, 0.45), (cx - rg, cy - rg + bob))
            img = self.img_pasajero[p["var"]]
            capa.blit(img, img.get_rect(center=(cx, cy + bob)))

    def dibujar_niebla(self, capa):
        self.fog.fill((5, 5, 14, 240))
        cx, cy = self.centro_vis(*self.vis)
        self.fog.blit(self.luz, (cx - self.radio_luz, cy - self.radio_luz),
                      special_flags=pygame.BLEND_RGBA_MIN)
        capa.blit(self.fog, (0, 0))

    def dibujar_ruta(self, capa, now):
        camino = self.ruta_actual()
        if len(camino) < 2:
            return
        puntos = [self.centro_celda(x, y) for x, y in camino]
        puntos[0] = self.centro_vis(*self.vis)
        pygame.draw.lines(capa, (*COL_RUTA, 90), False, puntos, 7)
        pygame.draw.lines(capa, COL_RUTA, False, puntos, 3)
        for i, (px_, py_) in enumerate(puntos):
            pulso = 0.5 + 0.5 * math.sin(now / 140 - i * 0.7)
            r = max(2, int(self.celda * (0.06 + 0.06 * pulso)))
            pygame.draw.circle(capa, (255, 245, 190), (px_, py_), r)

    def dibujar_bus(self, capa, now):
        cx, cy = self.centro_vis(*self.vis)
        c = self.celda
        dx, dy = DIRECCIONES[self.dir_bus]
        # Luz de faros hacia adelante
        rf = int(c * 0.75)
        capa.blit(self.brillo(rf, (255, 240, 170), 0.5),
                  (cx + dx * c * 0.55 - rf, cy + dy * c * 0.55 - rf))
        img = self.img_bus[self.dir_bus]
        capa.blit(img, img.get_rect(center=(cx, cy)))

    def dibujar_flotantes(self, now):
        for f in self.flotantes[:]:
            edad = (now - f["t0"]) / 800
            if edad >= 1:
                self.flotantes.remove(f)
                continue
            img = self.f_med.render(f["t"], True, COL_ORO)
            img.set_alpha(int(255 * (1 - edad)))
            self.pantalla.blit(img, img.get_rect(center=(f["x"], ALTO_HUD + f["y"] - 12 - edad * 34)))

    def dibujar_juego(self, now):
        self.pantalla.blit(self.fondo_juego, (0, 0))
        capa = self.capa
        capa.fill((0, 0, 0, 0))

        if self.cfg["electrico"]:
            self.dibujar_rayos(capa, now)
        else:
            capa.blit(self.paredes_surf, (0, 0))
        self.dibujar_pasajeros(capa, now)
        self.dibujar_meta(capa, now)
        if self.cfg["niebla"]:
            self.dibujar_niebla(capa)
        if self.ruta_activa:
            self.dibujar_ruta(capa, now)
        self.dibujar_bus(capa, now)

        sx = sy = 0
        if now < self.shake_hasta:                   # temblor al recibir descarga
            sx, sy = random.randint(-6, 6), random.randint(-6, 6)
        self.pantalla.blit(capa, (sx, ALTO_HUD + sy))
        self.dibujar_flotantes(now)

        self.dibujar_hud(now)
        self.dibujar_pie()

    def dibujar_hud(self, now):
        color = self.cfg["color"]
        pygame.draw.rect(self.pantalla, COL_PANEL, (0, 0, ANCHO, ALTO_HUD))
        pygame.draw.line(self.pantalla, atenuar(color, 0.5),
                         (0, ALTO_HUD - 1), (ANCHO, ALTO_HUD - 1), 2)
        self.texto(f"NIVEL {self.nivel + 1} · {self.cfg['nombre'].upper()}",
                   self.f_med, color, izq=(16, 18))
        stats = (f"PASAJEROS {self.recogidos}/{self.cfg['pasajeros']}   "
                 f"MOVS {self.movs}   TIEMPO {self.tiempo:0.1f}s")
        if self.cfg["electrico"]:
            stats += f"   DESCARGAS {self.descargas}"
        self.texto(stats, self.f_peq, COL_TEXTO, izq=(16, 42))

        if self.cfg["electrico"]:                    # cuenta regresiva del cambio
            restante = max(0.0, (self.t_cambio - now) / 1000)
            col = COL_ALERTA if restante < 1.2 else color
            self.texto(f"CAMBIO EN {restante:0.1f}s", self.f_xs, col, centro=(560, 18))
            frac = restante / (INTERVALO_CAMBIO / 1000)
            ancho = int((ANCHO - 12) * frac)
            if ancho > 0:
                pygame.draw.rect(self.pantalla, col, (6, ALTO_HUD - 6, ancho, 4), border_radius=2)

        # Botón de ruta óptima (clic con el mouse)
        self.btn_ruta.texto = "OCULTAR RUTA" if self.ruta_activa else "VER RUTA ÓPTIMA"
        hover = self.btn_ruta.rect.collidepoint(pygame.mouse.get_pos())
        self.dibujar_boton(self.btn_ruta, hover or self.ruta_activa, self.f_peq)

    def dibujar_pie(self):
        pygame.draw.rect(self.pantalla, COL_PANEL, (0, ALTO_HUD + ALTO_LAB, ANCHO, ALTO_PIE))
        y = ALTO_HUD + ALTO_LAB + ALTO_PIE // 2
        if self.ruta_activa and self.ruta:
            self.texto(f"RUTA ÓPTIMA: {len(self.ruta) - 1} pasos", self.f_xs, COL_RUTA, izq=(16, y))
        self.texto("FLECHAS/WASD mover   ·   P otro laberinto   ·   ESC menú",
                   self.f_xs, COL_TENUE, der=(ANCHO - 16, y))

    def dibujar_panel(self, titulo, lineas, color, estrellas, pie):
        velo = pygame.Surface((ANCHO, ALTO), pygame.SRCALPHA)
        velo.fill((4, 6, 16, 205))
        self.pantalla.blit(velo, (0, 0))
        self.neon(titulo, self.f_grande, color, (ANCHO // 2, 190))
        self.dibujar_estrellas(estrellas, 255)
        for i, linea in enumerate(lineas):
            self.texto(linea, self.f_med, COL_TEXTO, centro=(ANCHO // 2, 325 + i * 36))
        self.texto(pie, self.f_peq, COL_ORO, centro=(ANCHO // 2, 325 + len(lineas) * 36 + 30))

    def dibujar(self, now):
        if self.estado == "menu":
            self.dibujar_menu(now)
        elif self.estado == "niveles":
            self.dibujar_niveles(now)
        elif self.estado == "instrucciones":
            self.dibujar_instrucciones(now)
        else:
            self.dibujar_juego(now)
            if self.estado == "nivel_ok":
                self.dibujar_panel(
                    "¡LLEGASTE A LA TERMINAL!",
                    [f"Pasajeros: {self.recogidos}/{self.cfg['pasajeros']}",
                     f"Movimientos: {self.movs}     Tiempo: {self.tiempo:0.1f}s"],
                    COL_META, self.estrellas(self.recogidos, self.cfg["pasajeros"]),
                    "ENTER: siguiente nivel   ·   ESC: menú")
            elif self.estado == "fin":
                self.dibujar_panel(
                    "¡VIAJE COMPLETADO!",
                    [f"Pasajeros: {self.total_rec}/{self.total_pas}",
                     f"Movimientos totales: {self.total_movs}",
                     f"Tiempo total: {self.total_tiempo:0.1f}s",
                     f"Rutas usadas: {self.total_rutas}   Descargas: {self.total_descargas}"],
                    COL_ORO, self.estrellas(self.total_rec, self.total_pas),
                    "ENTER: volver al menú")

    # ------------------------------------------------------------------
    # BUCLE PRINCIPAL
    # ------------------------------------------------------------------
    def ejecutar(self):
        while True:
            dt = self.reloj.tick(FPS) / 1000
            now = pygame.time.get_ticks()
            for e in pygame.event.get():
                self.evento(e, now)
            self.actualizar(dt, now)
            self.dibujar(now)
            pygame.display.flip()


if __name__ == "__main__":
    Juego().ejecutar()