import { useState } from 'react'
import usuarios from '../data/usuarios.json'

function Login({ onLogin, mensajeLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function iniciarSesion(e) {
    e.preventDefault()

    const usuarioEncontrado = usuarios.find(
      (usuario) =>
        usuario.username === username &&
        usuario.password === password
    )

    if (!usuarioEncontrado) {
      setError('Usuario o contraseña incorrectos')
      return
    }

    setError('')
    onLogin()
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-brand">
          <div className="brand-icon large">B</div>
          <div>
            <h1>Biblioteca</h1>
            <p>Ingresa para administrar libros y autores.</p>
          </div>
        </div>

        <form className="form-stack" onSubmit={iniciarSesion}>
          <label>
            Usuario
            <input
              type="text"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label>
            Contraseña
            <input
              type="password"
              placeholder="123456"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button className="primary-button full-width" type="submit">
            Iniciar sesión
          </button>
        </form>

        {mensajeLogin && <div className="alert warning">{mensajeLogin}</div>}
        {error && <div className="alert error">{error}</div>}

        <div className="credentials-box">
          <strong>Credenciales de prueba</strong>
          <span>Usuario: admin</span>
          <span>Contraseña: 123456</span>
        </div>
      </section>
    </main>
  )
}

export default Login