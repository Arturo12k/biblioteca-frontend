import { useState } from 'react'
import {
  crearAutorApi,
  eliminarAutorApi,
  actualizarAutorApi
} from '../services/api'

function Autores({
  autores,
  cargarAutores,
  cargarLibros,
  paginaActual,
  totalPaginas
}) {
  const [nombre, setNombre] = useState('')
  const [fechaNacimiento, setFechaNacimiento] = useState('')
  const [autorEditando, setAutorEditando] = useState(null)
  const [error, setError] = useState('')
  const [mensaje, setMensaje] = useState('')

  async function guardarAutor(e) {
    e.preventDefault()
    setError('')
    setMensaje('')

    if (!nombre.trim()) {
      setError('El nombre del autor es obligatorio')
      return
    }

    try {
      const autor = {
        nombre,
        fechaNacimiento
      }

      if (autorEditando) {
        await actualizarAutorApi(autorEditando.id, autor)
        setAutorEditando(null)
        setMensaje('Autor actualizado correctamente')
      } else {
        await crearAutorApi(autor)
        setMensaje('Autor creado correctamente')
      }

      setNombre('')
      setFechaNacimiento('')
      cargarAutores(0)
      cargarLibros(0)
    } catch (error) {
      setError(error.message)
    }
  }

  function iniciarEdicion(autor) {
    setAutorEditando(autor)
    setNombre(autor.nombre)
    setFechaNacimiento(autor.fechaNacimiento || '')
    setError('')
    setMensaje('')
  }

  function cancelarEdicion() {
    setAutorEditando(null)
    setNombre('')
    setFechaNacimiento('')
    setError('')
    setMensaje('')
  }

  async function eliminarAutor(id) {
    const confirmar = window.confirm('¿Eliminar este autor y sus libros asociados?')

    if (!confirmar) return

    try {
      setError('')
      setMensaje('')

      await eliminarAutorApi(id)

      setMensaje('Autor eliminado correctamente')
      cargarAutores(0)
      cargarLibros(0)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <section id="autores" className="section-card">
      <div className="section-header">
        <div>
          <span className="eyebrow">Catálogo</span>
          <h2>Autores</h2>
        </div>
        <span className="count-pill">{autores.length} en esta página</span>
      </div>

      <form className="form-grid" onSubmit={guardarAutor}>
        <label>
          Nombre del autor
          <input
            className={error ? 'input-error' : ''}
            type="text"
            placeholder="Gabriel García Márquez"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>

        <label>
          Fecha de nacimiento
          <input
            type="date"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
          />
        </label>

        <button className="primary-button" type="submit">
          {autorEditando ? 'Guardar cambios' : 'Crear autor'}
        </button>

        {autorEditando && (
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

      {autores.length === 0 ? (
        <div className="empty-state">
          <h3>No hay autores registrados</h3>
          <p>Crea un autor para poder asociarle libros.</p>
        </div>
      ) : (
        <>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Fecha de nacimiento</th>
                  <th>Acciones</th>
                </tr>
              </thead>

              <tbody>
                {autores.map((autor) => (
                  <tr key={autor.id}>
                    <td>
                      <strong>{autor.nombre}</strong>
                    </td>
                    <td>{autor.fechaNacimiento || 'Sin fecha'}</td>
                    <td className="actions-cell">
                      <button
                        className="secondary-button"
                        onClick={() => iniciarEdicion(autor)}
                      >
                        Editar
                      </button>

                      <button
                        className="danger-button"
                        onClick={() => eliminarAutor(autor.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pagination">
            <button
              className="secondary-button"
              disabled={paginaActual === 0}
              onClick={() => cargarAutores(paginaActual - 1)}
            >
              Anterior
            </button>

            <span>
              Página {paginaActual + 1} de {totalPaginas}
            </span>

            <button
              className="secondary-button"
              disabled={paginaActual + 1 >= totalPaginas}
              onClick={() => cargarAutores(paginaActual + 1)}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </section>
  )
}

export default Autores