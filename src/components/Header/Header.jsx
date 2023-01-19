import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Outlet, NavLink } from 'react-router-dom'
import { logOut } from '../../services/firebase'
import IButton from '@mui/material/Button';
import styles from './Header.module.css'


export const navigates = [
    {
        id: 1,
        name: 'Main',
        to: '/'
    },
    {
        id: 2,
        name: 'Profile',
        to: '/profile'
    },
    {
        id: 3,
        name: 'Chats',
        to: '/chats'
    },
    {
        id: 4,
        name: 'About',
        to: '/about'
    },
    {
        id: 5,
        name: 'Articles',
        to: '/articles'
    }
    // {
    //     id: 6,
    //     name: 'SignIn',
    //     to: '/signIn'
    // },
    // {
    //     id: 7,
    //     name: 'SignUp',
    //     to: '/signUp'
    // }
]

export function Header () {
    const navigate = useNavigate()
    const isAuth = useSelector((store) => store.profile.isAuth)

    const handleSignIn = () => {
        navigate('/signIn')
    }
    const handleSignUp = () => {
        navigate('/signUp')
    }
    const handleLogout = async () => {
        await logOut ()
    }

    return (
        <>
            <header>
                <nav className={styles.header}>
                    <ul>
                        {navigates.map((link) => (
                            <li key={link.id}>
                                <NavLink 
                                    to={link.to}
                                    style={({isActive}) => ({
                                        color: isActive ? 'darkblue' : 'grey'
                                    })}
                                    >{link.name}</NavLink>
                            </li>
                        ))}
                    </ul>
                    <div className={styles.buttns}>
                    {!isAuth && (
                        <>
                            <IButton 
                                className={styles.btn}   
                                variant="contained" 
                                size="small" 
                                onClick={handleSignIn}>SignIn</IButton>
                            <IButton 
                                className={styles.btn}   
                                variant="contained" 
                                size="small" 
                                onClick={handleSignUp}>SignUp</IButton>
                        </>
                    )}
                    {isAuth && (
                        <>
                            <IButton 
                                className={styles.btn}
                                variant="contained" 
                                size="small" 
                                onClick={handleLogout}>Logout</IButton>
                        </>
                    )}
                    </div>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </> 
    )
}