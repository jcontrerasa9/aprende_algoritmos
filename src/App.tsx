import ArrayBars from './visualizers/ArrayBars'

function App() {
  return (
    <main>
      <h1>Aprende Algoritmos</h1>
      <p>Visualizaciones interactivas de estructuras de datos y algoritmos.</p>
      <ArrayBars values={[5, 1, 4, 2, 3]} />
    </main>
  )
}

export default App
