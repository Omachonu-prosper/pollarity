import axios from 'axios'

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    timeout: 1000,
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': import.meta.env.VITE_API_KEY,
    }
});

export interface Poll {
    id: number;
    created_at: string;
    is_anonymous: boolean;
    is_open: boolean;
    ref: string;
    title: string;
    user_id: number;
    options: Array<{
        choice: string;
        chosen: number;
        id: number
    }>;
    total_chosen: number;
}

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

async function fetchUserPolls(): Promise<{
    success: boolean, data: Poll[]
}> {
    let req = await api.get('/user/polls', {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('AuthToken')}`
        }
    }).then((res) => {
        return res
    }).catch((err) => {
        return err
    })
    if (req.status == 200) return {
        success: true,
        data: req.data.data,
    }
    return {
        success: false,
        data: []
    }
}

async function fetchPoll(pollRef: string): Promise<{
    success: boolean, data?: Poll
}> {
    let req = await api.get(`poll/${pollRef}`)
    .then((res) => {
        return res
    }).catch((err) => {
        return err
    })
    if (req.status == 200) return {
        success: true,
        data: req.data.data.poll,
    }
    return {
        success: false,
    }
}

async function closePoll(pollRef: string): Promise<{
    success: boolean
}> {
    let req = await api.post(`poll/${pollRef}/close`)
    .then((res) => {
        return res
    }).catch((err) => {
        return err
    })
    if (req.status == 200) return {
        success: true,
    }
    return {
        success: false,
    }
}

async function vote(pollRef: string, optionId: number): Promise<{
    success: boolean, 
}> {
    let req = await api.post(`poll/${pollRef}/vote`, {
        option_id: optionId
    }).then((res) => {
        return res
    }).catch((err) => {
        return err
    })
    if (req.status == 200) return {
        success: true,
    }
    return {
        success: false,
    }
}

export {
    signup, login, fetchUserPolls, fetchPoll, vote, closePoll
}