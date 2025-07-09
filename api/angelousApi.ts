import axios from 'axios'

const angelousapi = axios.create({
  baseURL: '/api',
  withCredentials: true // ✅ permite que se envíen cookies como la de NextAuth
})

export default angelousapi
