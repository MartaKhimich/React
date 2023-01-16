import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { selectAuth } from '../../store/profile/selectors'
import { Outlet, NavLink } from 'react-router-dom'
import { logOut } from '../../services/firebase'
import styles from './Header.module.css'
import { async } from '@firebase/util'

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
    // const isAuth = useSelector(selectAuth())
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
                    {!isAuth && (
                        <>
                            <button onClick={handleSignIn}>SignIn</button>
                            <button onClick={handleSignUp}>SignUp</button>
                        </>
                    )}
                    {isAuth && (
                        <>
                            <button onClick={handleLogout}>Logout</button>
                        </>
                    )}
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </> 
    )
}