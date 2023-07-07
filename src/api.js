import axios from 'axios'

const domain = process.env.REACT_APP_SERVER_DOMAIN

const api = axios.create({
  baseURL: `${domain}/api`
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  config.headers.Authorization = `Bearer ${token}`

  return config
})

api.interceptors.response.use((response) => response, (error) => {
  try {

    console.log(error);
    const { response } = error

    if (response.status === 401) {

      localStorage.removeItem('access_token')

    }

  } catch (error) {
    console.log(error);
  }
})

export default api
