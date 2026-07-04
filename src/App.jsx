import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [autores, setAutores] = useState([])
  const [libros, setLibros] = useState([])

  const [nombre, setNombre] = useState('')
  const [fechaNacimiento, setFechaNacimiento] = useState('')

  const [titulo, setTitulo] = useState('')
  const [isbn, setIsbn] = useState('')
  const [autorId, setAutorId] = useState('')
  const [numeroPaginas, setNumeroPaginas] = useState('')
  const [urlPortada, setUrlPortada] = useState('')

  async function cargarAutores() {
    const response = await fetch('/api/autores')
    const data = await response.json()
    setAutores(data.content || [])
  }

  async function cargarLibros() {
    const response = await fetch('/api/libros')
    const data = await response.json()
    setLibros(data.content || [])
  }

  async function crearAutor(e) {
    e.preventDefault()

    await fetch('/api/autores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, fechaNacimiento })
    })

    setNombre('')
    setFechaNacimiento('')
    cargarAutores()
  }

  async function eliminarAutor(id) {
    await fetch(`/api/autores/${id}`, {
      method: 'DELETE'
    })

    cargarAutores()
    cargarLibros()
  }

  async function crearLibro(e) {
    e.preventDefault()

    if (!autorId) {
      alert('Selecciona un autor')
      return
    }

    await fetch('/api/libros', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        titulo,
        isbn,
        autorId,
        numeroPaginas: Number(numeroPaginas),
        urlPortada
      })
    })

    setTitulo('')
    setIsbn('')
    setAutorId('')
    setNumeroPaginas('')
    setUrlPortada('')
    cargarLibros()
  }

  async function eliminarLibro(id) {
    await fetch(`/api/libros/${id}`, {
      method: 'DELETE'
    })

    cargarLibros()
  }

  useEffect(() => {
    cargarAutores()
    cargarLibros()
  }, [])

  return (
    <div className="container">
      <h1>Biblioteca</h1>

      <section>
        <h2>Autores</h2>

        <form onSubmit={crearAutor}>
          <input
            type="text"
            placeholder="Nombre del autor"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

          <input
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
          />

          <button type="submit">Crear autor</button>
        </form>

        <ul>
          {autores.map((autor) => (
            <li key={autor.id}>
              {autor.nombre} - {autor.fechaNacimiento}
              <button onClick={() => eliminarAutor(autor.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </section>

      <hr />

      <section>
        <h2>Libros</h2>

        <form onSubmit={crearLibro}>
          <input
            type="text"
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />

          <input
            type="text"
            placeholder="ISBN"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />

          <input
            type="number"
            placeholder="Número de páginas"
            value={numeroPaginas}
            onChange={(e) => setNumeroPaginas(e.target.value)}
          />

          <input
            type="text"
            placeholder="URL portada"
            value={urlPortada}
            onChange={(e) => setUrlPortada(e.target.value)}
          />

          <select value={autorId} onChange={(e) => setAutorId(e.target.value)}>
            <option value="">Selecciona un autor</option>
            {autores.map((autor) => (
              <option key={autor.id} value={autor.id}>
                {autor.nombre}
              </option>
            ))}
          </select>

          <button type="submit">Crear libro</button>
        </form>

        <ul>
          {libros.map((libro) => (
            <li key={libro.id}>
              <strong>{libro.titulo}</strong> — {libro.autor?.nombre} — {libro.isbn}
              <button onClick={() => eliminarLibro(libro.id)}>
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

export default App