import { useState } from 'react'
import {
  crearLibroApi,
  eliminarLibroApi,
  actualizarLibroApi
} from '../services/api'

function Libros({ libros, autores, cargarLibros }) {
  const [titulo, setTitulo] = useState('')
  const [isbn, setIsbn] = useState('')
  const [autorId, setAutorId] = useState('')
  const [numeroPaginas, setNumeroPaginas] = useState('')
  const [urlPortada, setUrlPortada] = useState('')
  const [libroEditando, setLibroEditando] = useState(null)

  async function guardarLibro(e) {
    e.preventDefault()

    if (!autorId) {
      alert('Selecciona un autor')
      return
    }

    const libro = {
      titulo,
      isbn,
      autorId,
      numeroPaginas: Number(numeroPaginas),
      urlPortada
    }

    if (libroEditando) {
      await actualizarLibroApi(libroEditando.id, libro)
      setLibroEditando(null)
    } else {
      await crearLibroApi(libro)
    }

    limpiarFormulario()
    cargarLibros()
  }

  function iniciarEdicion(libro) {
    setLibroEditando(libro)
    setTitulo(libro.titulo)
    setIsbn(libro.isbn)
    setAutorId(libro.autor?.id || '')
    setNumeroPaginas(libro.numeroPaginas || '')
    setUrlPortada(libro.urlPortada || '')
  }

  function cancelarEdicion() {
    setLibroEditando(null)
    limpiarFormulario()
  }

  function limpiarFormulario() {
    setTitulo('')
    setIsbn('')
    setAutorId('')
    setNumeroPaginas('')
    setUrlPortada('')
  }

  async function eliminarLibro(id) {
    const confirmar = window.confirm('¿Eliminar este libro?')

    if (!confirmar) return

    await eliminarLibroApi(id)
    cargarLibros()
  }

  return (
    <section id="libros" className="section-card">
      <div className="section-header">
        <div>
          <span className="eyebrow">Inventario</span>
          <h2>Libros</h2>
        </div>
        <span className="count-pill">{libros.length} registrados</span>
      </div>

      <form className="form-grid books-form" onSubmit={guardarLibro}>
        <label>
          Título
          <input
            type="text"
            placeholder="Cien años de soledad"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </label>

        <label>
          ISBN
          <input
            type="text"
            placeholder="9780307474728"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />
        </label>

        <label>
          Páginas
          <input
            type="number"
            placeholder="417"
            value={numeroPaginas}
            onChange={(e) => setNumeroPaginas(e.target.value)}
          />
        </label>

        <label>
          URL portada
          <input
            type="text"
            placeholder="https://covers.openlibrary.org/..."
            value={urlPortada}
            onChange={(e) => setUrlPortada(e.target.value)}
          />
        </label>

        <label>
          Autor
          <select value={autorId} onChange={(e) => setAutorId(e.target.value)}>
            <option value="">Selecciona un autor</option>
            {autores.map((autor) => (
              <option key={autor.id} value={autor.id}>
                {autor.nombre}
              </option>
            ))}
          </select>
        </label>

        <button className="primary-button" type="submit">
          {libroEditando ? 'Guardar cambios' : 'Crear libro'}
        </button>

        {libroEditando && (
          <button
            className="secondary-button"
            type="button"
            onClick={cancelarEdicion}
          >
            Cancelar
          </button>
        )}
      </form>

      {libros.length === 0 ? (
        <div className="empty-state">
          <h3>No hay libros registrados</h3>
          <p>Agrega un libro y asígnalo a un autor existente.</p>
        </div>
      ) : (
        <div className="book-grid">
          {libros.map((libro) => (
            <article className="book-card" key={libro.id}>
              <div className="book-cover">
                {libro.urlPortada ? (
                  <img src={libro.urlPortada} alt={libro.titulo} />
                ) : (
                  <span>Sin portada</span>
                )}
              </div>

              <div className="book-info">
                <span className="isbn-badge">{libro.isbn}</span>
                <h3>{libro.titulo}</h3>
                <p>{libro.autor?.nombre || 'Autor no disponible'}</p>

                <div className="book-meta">
                  <span>{libro.numeroPaginas} páginas</span>
                </div>

                <div className="card-actions">
                  <button
                    className="secondary-button"
                    onClick={() => iniciarEdicion(libro)}
                  >
                    Editar
                  </button>

                  <button
                    className="danger-button"
                    onClick={() => eliminarLibro(libro.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Libros