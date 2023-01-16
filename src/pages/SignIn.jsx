import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styles from './Pages.module.css'

import { signIn } from '../services/firebase';
import { auth } from '../store/profile/actions'

export function SignIn () {
    const [inputs, setInputs] = useState({email: '', password: ''})
    const [error, setError] = useState('')
    const[loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            await signIn(inputs.email, inputs.password)
            dispatch(auth(true))
            navigate('/chats')
        } catch (error) {
            setError(error.message)
            setInputs({email: '', password: ''})
        } finally {
            setLoading(false)
        }
    }
    //     if(inputs.login === 'gb' && inputs.password === 'gb') {
    //         dispatch(auth(true))
    //         navigate('/')
    //     } else {
    //         setError('Invalid login or password')
    //         setInputs({login: '', password: ''})
    //     }
    // }

    return (
        <>
            <h1 className={styles.header}>SignIn</h1>
            <form onSubmit={handleSubmit}>
                <p>Email:</p>
                <input 
                type="email" 
                name="email"
                value={inputs.email}
                onChange={(e) => setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))}
                />
                <p>Password:</p>
                <input 
                type="text" 
                name="password"
                value={inputs.password}
                onChange={(e) => setInputs((prev) => ({...prev, [e.target.name]: e.target.value}))}
                />
                <br/>
                <button>login</button>
            </form>
            {loading && (
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress />
                </Box>
            )}
            {error && <p style={{color: 'red'}}>{error}</p>}
        </>
    )
}