import axios from 'axios'
import 'dotenv/config'

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

function signup(username: string, email: string, password: string) {
    let req = api.post('/user/signup', {
        username, email, password
    })
    console.log(req)
}

export {
    signup
}