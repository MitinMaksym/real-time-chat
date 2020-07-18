import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3003/'
axios.defaults.headers.common['token'] = window.localStorage.token

export default axios
//https://my-messager-api.herokuapp.com/

//http://localhost:3003
