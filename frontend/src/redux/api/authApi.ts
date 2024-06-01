import axios from 'axios'

// import { Contstants } from '../../config'


const authAxios = axios.create({
   baseURL: 'http://localhost:4000',
   headers: {
      'Content-Type' : 'application/json',
      'Accept' : 'application/json'
   }
})

export default authAxios