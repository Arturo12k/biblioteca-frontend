const API_URL = '/api'

export async function obtenerAutores() {
  const response = await fetch(`${API_URL}/autores`)
  return response.json()
}

export async function crearAutorApi(autor) {
  return fetch(`${API_URL}/autores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(autor)
  })
}

export async function eliminarAutorApi(id) {
  return fetch(`${API_URL}/autores/${id}`, {
    method: 'DELETE'
  })
}

export async function obtenerLibros() {
  const response = await fetch(`${API_URL}/libros`)
  return response.json()
}

export async function crearLibroApi(libro) {
  return fetch(`${API_URL}/libros`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(libro)
  })
}

export async function eliminarLibroApi(id) {
  return fetch(`${API_URL}/libros/${id}`, {
    method: 'DELETE'
  })
}

export async function actualizarAutorApi(id, autor) {
  return fetch(`${API_URL}/autores/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(autor)
  })
}

export async function actualizarLibroApi(id, libro) {
  return fetch(`${API_URL}/libros/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(libro)
  })
}