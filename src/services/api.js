const API_URL = '/api'

function obtenerHeaders() {
  const token = localStorage.getItem('token')

  return {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : ''
  }
}

export async function loginApi(credenciales) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credenciales)
  })

  if (!response.ok) {
    throw new Error('Credenciales incorrectas')
  }

  return response.json()
}

export async function obtenerAutores() {
  const response = await fetch(`${API_URL}/autores`, {
    headers: obtenerHeaders()
  })
  return response.json()
}

export async function crearAutorApi(autor) {
  return fetch(`${API_URL}/autores`, {
    method: 'POST',
    headers: obtenerHeaders(),
    body: JSON.stringify(autor)
  })
}

export async function actualizarAutorApi(id, autor) {
  return fetch(`${API_URL}/autores/${id}`, {
    method: 'PATCH',
    headers: obtenerHeaders(),
    body: JSON.stringify(autor)
  })
}

export async function eliminarAutorApi(id) {
  return fetch(`${API_URL}/autores/${id}`, {
    method: 'DELETE',
    headers: obtenerHeaders()
  })
}

export async function obtenerLibros() {
  const response = await fetch(`${API_URL}/libros`, {
    headers: obtenerHeaders()
  })
  return response.json()
}

export async function crearLibroApi(libro) {
  return fetch(`${API_URL}/libros`, {
    method: 'POST',
    headers: obtenerHeaders(),
    body: JSON.stringify(libro)
  })
}

export async function actualizarLibroApi(id, libro) {
  return fetch(`${API_URL}/libros/${id}`, {
    method: 'PATCH',
    headers: obtenerHeaders(),
    body: JSON.stringify(libro)
  })
}

export async function eliminarLibroApi(id) {
  return fetch(`${API_URL}/libros/${id}`, {
    method: 'DELETE',
    headers: obtenerHeaders()
  })
}