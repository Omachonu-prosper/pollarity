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

async function login(email: string, password: string): Promise<{success: boolean, message: string}> {
    let req = await api.post('/user/login', {
        email, password
    }).then((res) => {
        return res
    }).catch((err) => {
        return err
    })
    if (req.status == 200) return {
        success: true,
        message: ''
    }
    return {success: false, message: req.response.data.detail}
}

export {
    signup, login
}