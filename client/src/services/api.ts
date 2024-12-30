import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 1000,
    headers: {
        'X-Custom-Header': 'foobar',
        'x-api-key': import.meta.env.VITE_API_KEY
    }
});

async function signup(username: string, email: string, password: string): Promise<boolean> {
    let req = await api.post('/user/signup', {
        username, email, password
    })
    if (req.status == 201) return true;
    else return false;
}

export {
    signup
}