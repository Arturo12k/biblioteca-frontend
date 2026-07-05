import { useEffect, useState } from 'react'
import Login from './components/Login'
import Autores from './components/Autores'
import Libros from './components/Libros'
import { obtenerAutores, obtenerLibros } from './services/api'
import './App.css'

const UNA_HORA = 60 * 60 * 1000

function App() {
  const [logueado, setLogueado] = useState(false)
  const [mensajeLogin, setMensajeLogin] = useState('')

  const [autores, setAutores] = useState([])
  const [libros, setLibros] = useState([])

  const [autorPage, setAutorPage] = useState(0)
  const [autorTotalPages, setAutorTotalPages] = useState(1)

  const [libroPage, setLibroPage] = useState(0)
  const [libroTotalPages, setLibroTotalPages] = useState(1)
  const [buscarLibros, setBuscarLibros] = useState('')

  function validarSesion() {
    const token = localStorage.getItem('token')
    const loginTime = localStorage.getItem('loginTime')

    if (!token || !loginTime) {
      setLogueado(false)
      return false
    }

    const sesionExpirada = Date.now() - Number(loginTime) > UNA_HORA

    if (sesionExpirada) {
      localStorage.removeItem('token')
      localStorage.removeItem('loginTime')
      setLogueado(false)
      setMensajeLogin('La sesión expiró. Inicia sesión nuevamente.')
      return false
    }

    setLogueado(true)
    return true
  }

  function iniciarSesion(token) {
    localStorage.setItem('token', token)
    localStorage.setItem('loginTime', Date.now().toString())

    setMensajeLogin('')
    setLogueado(true)
  }

  function cerrarSesion() {
    localStorage.removeItem('token')
    localStorage.removeItem('loginTime')
    setLogueado(false)
  }

  async function cargarAutores(page = autorPage) {
    const data = await obtenerAutores(page, 5)

    setAutores(data.content || [])
    setAutorPage(data.number || 0)
    setAutorTotalPages(Math.max(data.totalPages || 1, 1))
  }

  async function cargarLibros(page = libroPage, buscar = buscarLibros) {
    const data = await obtenerLibros(page, 6, buscar)

    setLibros(data.content || [])
    setLibroPage(data.number || 0)
    setLibroTotalPages(Math.max(data.totalPages || 1, 1))
    setBuscarLibros(buscar)
  }

  useEffect(() => {
    validarSesion()
  }, [])

  useEffect(() => {
    if (logueado) {
      cargarAutores(0)
      cargarLibros(0, '')
    }
  }, [logueado])

  if (!logueado) {
    return (
      <Login
        onLogin={iniciarSesion}
        mensajeLogin={mensajeLogin}
      />
    )
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">B</div>
          <div>
            <h2>Biblioteca</h2>
            <p>Gestión de libros</p>
          </div>
        </div>

        <nav className="nav-menu">
          <a href="#autores">Autores</a>
          <a href="#libros">Libros</a>
          <a href="http://localhost:8080/swagger-ui/index.html" target="_blank">
            Swagger
          </a>
        </nav>

        <button className="logout-button" onClick={cerrarSesion}>
          Cerrar sesión
        </button>
      </aside>

      <main className="main-content">
        <section className="hero-card">
          <div>
            <span className="eyebrow">Panel administrativo</span>
            <h1>Gestión de biblioteca</h1>
            <p>
              Administra autores y libros desde una interfaz conectada al backend Spring Boot.
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <span>{autores.length}</span>
              <p>Autores en página</p>
            </div>

            <div className="stat-card">
              <span>{libros.length}</span>
              <p>Libros en página</p>
            </div>
          </div>
        </section>

        <Autores
          autores={autores}
          cargarAutores={cargarAutores}
          cargarLibros={cargarLibros}
          paginaActual={autorPage}
          totalPaginas={autorTotalPages}
        />

        <Libros
          libros={libros}
          autores={autores}
          cargarLibros={cargarLibros}
          paginaActual={libroPage}
          totalPaginas={libroTotalPages}
          buscarLibros={buscarLibros}
          setBuscarLibros={setBuscarLibros}
        />
      </main>
    </div>
  )
}

export default App