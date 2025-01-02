import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY
    }
});

async function signup(username: string, email: string, password: string): Promise<{
    success: boolean, message: string, token: string, data: object | null
}> {
    let req = await api.post('/user/signup', {
        username, email, password
    }).then(res => {
        return res
    }).catch(err => {
        return err
    })
    console.log(req)
    if (req.status == 201) return {
        success: true,
        token: req.data.data.access_token,
        data: req.data.data.user_details,
        message: ''
    }
    return {
        success: false,
        message: req.response ? req.response.data.detail : 'An unexpected error occured',
        token: '',
        data: null
    }
}

async function login(email: string, password: string): Promise<{
    success: boolean, message: string, token: string, data: object | null
}> {
    let req = await api.post('/user/login', {
        email, password
    }).then((res) => {
        return res
    }).catch((err) => {
        return err
    })
    if (req.status == 200) return {
        success: true,
        token: req.data.data.access_token,
        data: req.data.data.user_details,
        message: ''
    }
    return {
        success: false,
        message: req.response ? req.response.data.detail : 'An unexpected error occured',
        token: '',
        data: null
    }
}

export {
    signup, login
}