import axios from 'axios'

const domain = process.env.REACT_APP_SERVER_DOMAIN

const api = axios.create({
  baseURL: `${domain}/api`
})

api.interceptors.request.use((config) => {
  config.withCredentials = true;
  return config
})

api.interceptors.response.use((response) => {
  return response;
}, (error) => {
  try {

    const { response } = error

    if (response.status === 401) {
      window.location.href = '/login';
    }

  } catch (error) {
    // console.log(error);
  }
})

export default api
