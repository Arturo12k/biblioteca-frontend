import { useState } from 'react'
import {
  crearLibroApi,
  eliminarLibroApi,
  actualizarLibroApi
} from '../services/api'

function Libros({
  libros,
  autores,
  cargarLibros,
  paginaActual,
  totalPaginas,
  buscarLibros,
  setBuscarLibros
}) {
  const [titulo, setTitulo] = useState('')
  const [isbn, setIsbn] = useState('')
  const [autorId, setAutorId] = useState('')
  const [numeroPaginas, setNumeroPaginas] = useState('')
  const [urlPortada, setUrlPortada] = useState('')
  const [libroEditando, setLibroEditando] = useState(null)
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')

  async function guardarLibro(e) {
    e.preventDefault()
    setError('')
    setMensaje('')

    if (!titulo.trim()) {
      setError('El título del libro es obligatorio')
      return
    }

    if (!isbn.trim()) {
      setError('El ISBN es obligatorio')
      return
    }

    if (!numeroPaginas || Number(numeroPaginas) <= 0) {
      setError('El número de páginas debe ser mayor a 0')
      return
    }

    if (!autorId) {
      setError('Selecciona un autor')
      return
    }

    try {
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
        setMensaje('Libro actualizado correctamente')
      } else {
        await crearLibroApi(libro)
        setMensaje('Libro creado correctamente')
      }

      limpiarFormulario()
      cargarLibros(0)
    } catch (error) {
      setError(error.message)
    }
  }

  function iniciarEdicion(libro) {
    setLibroEditando(libro)
    setTitulo(libro.titulo)
    setIsbn(libro.isbn)
    setAutorId(libro.autor?.id || '')
    setNumeroPaginas(libro.numeroPaginas || '')
    setUrlPortada(libro.urlPortada || '')
    setError('')
    setMensaje('')
  }

  function cancelarEdicion() {
    setLibroEditando(null)
    limpiarFormulario()
    setError('')
    setMensaje('')
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

    try {
      setError('')
      setMensaje('')

      await eliminarLibroApi(id)

      setMensaje('Libro eliminado correctamente')
      cargarLibros(0)
    } catch (error) {
      setError(error.message)
    }
  }

  function buscar(e) {
    e.preventDefault()
    cargarLibros(0, buscarLibros)
  }

  function limpiarBusqueda() {
    setBuscarLibros('')
    cargarLibros(0, '')
  }

  return (
    <section id="libros" className="section-card">
      <div className="section-header">
        <div>
          <span className="eyebrow">Inventario</span>
          <h2>Libros</h2>
        </div>
        <span className="count-pill">{libros.length} en esta página</span>
      </div>

      <form className="search-toolbar" onSubmit={buscar}>
        <input
          type="text"
          placeholder="Buscar por título o autor..."
          value={buscarLibros}
          onChange={(e) => setBuscarLibros(e.target.value)}
        />

        <button className="primary-button" type="submit">
          Buscar
        </button>

        <button
          className="secondary-button"
          type="button"
          onClick={limpiarBusqueda}
        >
          Limpiar
        </button>
      </form>

      <form className="form-grid books-form" onSubmit={guardarLibro}>
        <label>
          Título
          <input
            className={error ? 'input-error' : ''}
            type="text"
            placeholder="Cien años de soledad"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </label>

        <label>
          ISBN
          <input
            className={error ? 'input-error' : ''}
            type="text"
            placeholder="9780307474728"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
          />
        </label>

        <label>
          Páginas
          <input
            className={error ? 'input-error' : ''}
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
          <select
            className={error ? 'input-error' : ''}
            value={autorId}
            onChange={(e) => setAutorId(e.target.value)}
          >
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

      {error && <div className="alert error">{error}</div>}
      {mensaje && <div className="alert success">{mensaje}</div>}

      {libros.length === 0 ? (
        <div className="empty-state">
          <h3>No hay libros para mostrar</h3>
          <p>Agrega un libro o ajusta la búsqueda actual.</p>
        </div>
      ) : (
        <>
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

          <div className="pagination">
            <button
              className="secondary-button"
              disabled={paginaActual === 0}
              onClick={() => cargarLibros(paginaActual - 1, buscarLibros)}
            >
              Anterior
            </button>

            <span>
              Página {paginaActual + 1} de {totalPaginas}
            </span>

            <button
              className="secondary-button"
              disabled={paginaActual + 1 >= totalPaginas}
              onClick={() => cargarLibros(paginaActual + 1, buscarLibros)}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </section>
  )
}

export default Libros