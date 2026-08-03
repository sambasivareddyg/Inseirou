import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.response.use(
  res => res,
  err => {
    console.error('API Error:', err.response?.data || err.message)
    return Promise.reject(err)
  }
)

export const contactService = {
  submit: data => api.post('/contact', data)
}

export const projectService = {
  getAll:    () => api.get('/projects'),
  getById:   id => api.get(`/projects/${id}`)
}

export const userService = {
  getAll: () => api.get('/users'),
}

export default api
