const WIDTH = 600
const HEIGHT = 300

type ArrayBarsProps = {
  values: readonly number[] // dice que el prop tiene que ser un arreglo de numeros y no se modificará
}

function ArrayBars({ values }: ArrayBarsProps) {
  const barWidth = WIDTH / values.length // calcula el ancho de cada barra
  const max = Math.max(...values) // calcula el valor mas alto

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width="100%"> {/* el (0, 0) queda en la esquina superior izq*/}
      {values.map((value, index) => { // recorre cada numero 
        const barHeight = value / max * HEIGHT // la mayor ocupa todo el lienzo, el resto son proporcionales

        return (
          <rect // dibuja cada rectangulo
            key={index}
            x={index * barWidth}
            y={HEIGHT - barHeight}
            width={barWidth - 4} // da una pequeña separacion
            height={barHeight}
            fill="steelblue"
          />
        )
      })}
    </svg> // es el lienzo
  )
}

export default ArrayBars
