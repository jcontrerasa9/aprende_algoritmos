/* Usamos funciones generadoras (function*) y usamos yield.
Una función generadora es un tipo de función que permite generar valores de forma progresiva.
Para eso se usa la palabra reservada yield, en vez de return. Ya que return termina la función,
mientras que yield solo la pausa y sigue desde ahí cuando se le pide el siguiente valor.
*/
import type { SortEvent } from '../types'

export function* bubbleSort(input: readonly number[]): Generator<SortEvent> {
  const array = [...input]

  for (let end = array.length - 1; end > 0; end--) {
    for (let i = 0; i < end; i++) {
      const j = i + 1
      yield { type: 'compare', i, j }

      if (array[i] > array[j]) {
        [array[i], array[j]] = [array[j], array[i]]
        yield { type: 'swap', i, j }
      }
    }
  }
}
