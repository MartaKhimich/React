import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' 
import { useDispatch } from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import styles from './Pages.module.css'

import { signUp } from '../services/firebase'

export function SignUp () {
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
            await signUp(inputs.email, inputs.password)
            navigate('/signin')
        } catch (error) {
            setError(error.message)
            setInputs({email: '', password: ''})
        } finally {
            setLoading(false)
        }

        // if(inputs.email === 'gb' && inputs.password === 'gb') {
        //     dispatch(auth(true))
        //     navigate('/')
        // } else {
        //     setError('Invalid email or password')
        //     setInputs({email: '', password: ''})
        // }
    }

    return (
        <>
            <h1 className={styles.header}>SignUp</h1>
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
                <button>SignUp</button>
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
  