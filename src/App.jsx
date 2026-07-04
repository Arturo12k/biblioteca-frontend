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

  function iniciarSesion() {
    localStorage.setItem('token', 'token-simulado')
    localStorage.setItem('loginTime', Date.now().toString())

    setMensajeLogin('')
    setLogueado(true)
  }

  function cerrarSesion() {
    localStorage.removeItem('token')
    localStorage.removeItem('loginTime')
    setLogueado(false)
  }

  async function cargarAutores() {
    const data = await obtenerAutores()
    setAutores(data.content || [])
  }

  async function cargarLibros() {
    const data = await obtenerLibros()
    setLibros(data.content || [])
  }

  useEffect(() => {
    validarSesion()
  }, [])

  useEffect(() => {
    if (logueado) {
      cargarAutores()
      cargarLibros()
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
              Administra autores y libros.
            </p>
          </div>

          <div className="stats-grid">
            <div className="stat-card">
              <span>{autores.length}</span>
              <p>Autores</p>
            </div>

            <div className="stat-card">
              <span>{libros.length}</span>
              <p>Libros</p>
            </div>
          </div>
        </section>

        <Autores
          autores={autores}
          cargarAutores={cargarAutores}
          cargarLibros={cargarLibros}
        />

        <Libros
          libros={libros}
          autores={autores}
          cargarLibros={cargarLibros}
        />
      </main>
    </div>
  )
}

export default App