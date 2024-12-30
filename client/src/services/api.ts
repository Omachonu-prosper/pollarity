import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 1000,
    headers: {
        'X-Custom-Header': 'foobar',
        'x-api-key': import.meta.env.VITE_API_KEY
    }
});

function signup(username: string, email: string, password: string) {
    let req = api.post('/user/signup', {
        username, email, password
    }).then(res => {
        console.log(res.data)
    })
}

export {
    signup
}