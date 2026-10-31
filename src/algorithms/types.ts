/* Declara los tipos de eventos que generan los algoritmos.
Esto porque el algoritmo no dibuja nada, solo genera una lista con los eventos
que una gráfica o animación puede necesitar para el estudiante.
*/

export type SortEvent =
  | { type: 'compare'; i: number; j: number }
  | { type: 'swap'; i: number; j: number }