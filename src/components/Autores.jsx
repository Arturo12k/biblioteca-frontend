import { useState } from 'react'
import { crearAutorApi, eliminarAutorApi } from '../services/api'

function Autores({ autores, cargarAutores, cargarLibros }) {
  const [nombre, setNombre] = useState('')
  const [fechaNacimiento, setFechaNacimiento] = useState('')

  async function crearAutor(e) {
    e.preventDefault()

    await crearAutorApi({
      nombre,
      fechaNacimiento
    })

    setNombre('')
    setFechaNacimiento('')
    cargarAutores()
  }

  async function eliminarAutor(id) {
    const confirmar = window.confirm('¿Eliminar este autor y sus libros asociados?')

    if (!confirmar) return

    await eliminarAutorApi(id)

    cargarAutores()
    cargarLibros()
  }

  return (
    <section id="autores" className="section-card">
      <div className="section-header">
        <div>
          <span className="eyebrow">Catálogo</span>
          <h2>Autores</h2>
        </div>
        <span className="count-pill">{autores.length} registrados</span>
      </div>

      <form className="form-grid" onSubmit={crearAutor}>
        <label>
          Nombre del autor
          <input
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
          Crear autor
        </button>
      </form>

      {autores.length === 0 ? (
        <div className="empty-state">
          <h3>No hay autores registrados</h3>
          <p>Crea un autor para poder asociarle libros.</p>
        </div>
      ) : (
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
                  <td>
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
      )}
    </section>
  )
}

export default Autores