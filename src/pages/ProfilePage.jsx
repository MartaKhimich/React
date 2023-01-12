import { useContext, useState } from 'react'
import { ThemeContext } from '../utils/ThemeContext'
import { useSelector, useDispatch } from 'react-redux'
import { changeName, toggleProfile } from '../store/profile/actions'
import { selectName, selectVisible } from '../store/profile/selectors'
import styles from './Pages.module.css'

export function ProfilePage () {
    const {theme, toggleTheme} = useContext(ThemeContext)
    const name = useSelector(selectName)
    const visible = useSelector(selectVisible)
    const [value, setValue] = useState('')

    const dispatch = useDispatch()

    const handleChange = () => {
        // dispatch({type: types.CHANGE_NAME, payload: value})
        dispatch(changeName(value))
        setValue('')
    }

    return (
        <>
            <h1 className={styles.header}>Profile Page</h1>
            <p>{theme === 'light' ? '☀️' : '🌑'}</p>
            <button onClick={toggleTheme}>Change theme</button>
            <hr />
            <h2>{name}</h2>
            <input 
                type="text"
                value={value} 
                onChange={(e) => setValue(e.target.value)}
            />
            <button onClick={handleChange}>Change name</button>
            <br/>
            <input type="checkbox" checked={visible} readOnly />
            <button onClick={() => dispatch(toggleProfile())}>Checked</button>
        </>
    )
}