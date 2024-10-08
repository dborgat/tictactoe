import React from "react"

const Tablero = () => {
  const [tablero, setTablero] = React.useState([])
  const values = [{ jugador: "X" }, { jugador: "O" }]
  const [turno, setTurno] = React.useState(true)
  const [jugadorGanador, setJugadorGanador] = React.useState(false)

  React.useEffect(() => {
    const initialTablero = Array(9).fill(null)
    setTablero(initialTablero)
  }, [])

  React.useEffect(() => {
    setJugadorGanador(ganador(tablero))
    ganador(tablero)
  }, [turno])

  const restartGame = () => {
    const newGame = Array(9).fill(null)
    setTablero(newGame)
    setJugadorGanador(false)
  }

  // para ganar 3 numeros seguidos en una fila, columna o diagonal
  const ganador = (tablero) => {
    const lineas = [
      [0, 1, 2], // primera fila
      [3, 4, 5], // segunda fila
      [6, 7, 8], // tercera fila
      [0, 3, 6], // primera columna
      [1, 4, 7], // segunda columna
      [2, 5, 8], // tercera columna
      [0, 4, 8], // diagonal
      [2, 4, 6], // diagonal
    ]

    for (let i = 0; i < lineas.length; i++) {
      const [a, b, c] = lineas[i]
      if (
        tablero[a] &&
        tablero[a] === tablero[b] &&
        tablero[a] === tablero[c]
      ) {
        return tablero[a]
      }
    }
    return null
  }

  const handleClick = (index) => {
    setTablero((prev) => {
      const newTablero = [...prev]
      //   if(newTablero[index] || ganador(newTablero)) return newTablero
      if (!newTablero[index]) {
        setTurno(!turno)
        newTablero[index] = turno ? values[0].jugador : values[1].jugador
      }
      return newTablero
    })
  }

  return (
    <div className="bg-red-50 h-96 w-96 flex flex-col">
      <button
        onClick={restartGame}
        className="text-xl font-bold text-black border border-black"
      >
        Reiniciar
      </button>
      <h1 className="text-2xl font-bold text-black">Tic Tac Toe</h1>
      <h2 className="text-xl text-black">
        Es el turno de: {turno ? values[0].jugador : values[1].jugador}
      </h2>
      {jugadorGanador && (
        <h2 className="text-xl text-black">
          El jugador ganador es:{" "}
          {!turno ? values[0].jugador : values[1].jugador}
        </h2>
      )}
      <div className="bg-red-400 flex flex-wrap p-5">
        {tablero.map((value, index) => (
          <div
            key={index}
            className={`w-24 h-24 ${
              jugadorGanador ? "bg-gray-700" : "bg-blue-600"
            } border border-red-600 justify-center items-center flex`}
            onClick={() => {
              jugadorGanador ? null : handleClick(index)
            }}
          >
            <h1 className="text-4xl text-white">{value}</h1>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Tablero
