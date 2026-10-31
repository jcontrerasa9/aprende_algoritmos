import { expect, test } from 'vitest'
import type { SortEvent } from '../types'
import { bubbleSort } from './bubbleSort'

function applyEvents(input: readonly number[], events: SortEvent[]): number[] {
  const array = [...input]

  for (const event of events) {
    if (event.type === 'swap') {
      [array[event.i], array[event.j]] = [array[event.j], array[event.i]]
    }
  }

  return array
}

function countEvents(events: SortEvent[], type: SortEvent['type']): number {
  return events.filter((event) => event.type === type).length
}

// Un arreglo vacío no tiene nada que comparar.
test('emits no events for an empty array', () => {
  expect([...bubbleSort([])]).toEqual([])
})

// Un solo elemento no tiene con quién compararse.
test('emits no events for a single element', () => {
  expect([...bubbleSort([7])]).toEqual([])
})

// Si ya está ordenado, compara pero no intercambia nada.
test('emits no swaps for a sorted array', () => {
  const events = [...bubbleSort([1, 2, 3, 4])]

  expect(countEvents(events, 'swap')).toBe(0)
})

// Al revés, cada par de elementos está en desorden: 3 pares, 3 intercambios.
test('emits one swap per inversion in a reversed array', () => {
  const events = [...bubbleSort([3, 2, 1])]

  expect(countEvents(events, 'swap')).toBe(3)
})

// Con n = 5 debe hacer 5(5-1)/2 = 10 comparaciones.
test('compares n(n-1)/2 times', () => {
  const events = [...bubbleSort([5, 1, 4, 2, 3])]

  expect(countEvents(events, 'compare')).toBe(10)
})

// Los eventos salen en el orden correcto: primero compara y luego intercambia.
test('emits the expected sequence of events', () => {
  expect([...bubbleSort([2, 1])]).toEqual([
    { type: 'compare', i: 0, j: 1 },
    { type: 'swap', i: 0, j: 1 },
  ])
})

// El arreglo original debe quedar igual, porque el algoritmo trabaja sobre una copia.
test('does not modify the input', () => {
  const input = [3, 1, 2]

  Array.from(bubbleSort(input))

  expect(input).toEqual([3, 1, 2])
})

// Aplicar los eventos sobre el arreglo original debe dejarlo ordenado.
test.each([
  [[5, 1, 4, 2, 3]],
  [[2, 1, 2, 1]],
  [[-3, 0, -1, 2]],
  [[9, 8, 7, 6, 5, 4, 3, 2, 1, 0]],
])('sorts %j when its events are replayed', (input) => {
  const events = [...bubbleSort(input)]
  const sorted = [...input].sort((a, b) => a - b)

  expect(applyEvents(input, events)).toEqual(sorted)
})
