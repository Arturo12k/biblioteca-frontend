const API_URL = '/api'

function obtenerHeaders() {
  const token = localStorage.getItem('token')

  return {
    'Content-Type': 'application/json',
    Authorization: token ? `Bearer ${token}` : ''
  }
}

async function manejarRespuesta(response) {
  if (!response.ok) {
    let mensaje = 'Ocurrió un error'

    try {
      const data = await response.json()
      mensaje =
        data.mensaje ||
        data.message ||
        data.error ||
        'Error al procesar la solicitud'
    } catch {
      mensaje = 'Error al procesar la solicitud'
    }

    throw new Error(mensaje)
  }

  if (response.status === 204) {
    return null
  }

  return response.json()
}

export async function loginApi(credenciales) {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credenciales)
  })

  return manejarRespuesta(response)
}

export async function obtenerAutores(page = 0, size = 5) {
  const response = await fetch(`${API_URL}/autores?page=${page}&size=${size}`, {
    headers: obtenerHeaders()
  })

  return manejarRespuesta(response)
}

export async function crearAutorApi(autor) {
  const response = await fetch(`${API_URL}/autores`, {
    method: 'POST',
    headers: obtenerHeaders(),
    body: JSON.stringify(autor)
  })

  return manejarRespuesta(response)
}

export async function actualizarAutorApi(id, autor) {
  const response = await fetch(`${API_URL}/autores/${id}`, {
    method: 'PATCH',
    headers: obtenerHeaders(),
    body: JSON.stringify(autor)
  })

  return manejarRespuesta(response)
}

export async function eliminarAutorApi(id) {
  const response = await fetch(`${API_URL}/autores/${id}`, {
    method: 'DELETE',
    headers: obtenerHeaders()
  })

  return manejarRespuesta(response)
}

export async function obtenerLibros(page = 0, size = 6, buscar = '') {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString()
  })

  if (buscar.trim()) {
    params.append('buscar', buscar.trim())
  }

  const response = await fetch(`${API_URL}/libros?${params.toString()}`, {
    headers: obtenerHeaders()
  })

  return manejarRespuesta(response)
}

export async function crearLibroApi(libro) {
  const response = await fetch(`${API_URL}/libros`, {
    method: 'POST',
    headers: obtenerHeaders(),
    body: JSON.stringify(libro)
  })

  return manejarRespuesta(response)
}

export async function actualizarLibroApi(id, libro) {
  const response = await fetch(`${API_URL}/libros/${id}`, {
    method: 'PATCH',
    headers: obtenerHeaders(),
    body: JSON.stringify(libro)
  })

  return manejarRespuesta(response)
}

export async function eliminarLibroApi(id) {
  const response = await fetch(`${API_URL}/libros/${id}`, {
    method: 'DELETE',
    headers: obtenerHeaders()
  })

  return manejarRespuesta(response)
}