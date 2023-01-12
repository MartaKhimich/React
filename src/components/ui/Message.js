import {useState} from "react"
import styles from './Message.module.css'


export function Message(props) {
    const [name, setName] = useState('Марта Химич')
    const [age, setAge] = useState('33')

    const handleChangeName = (event) => {
        setName(event.target.value)
    }

    const handleChangeAge = (event) => {
        setAge(event.target.value)
    }
    
    const handleClick = () => {
            window.location.reload();
    }

    return(
        <>
        <h3>{props.text}</h3>
        <div className={styles.name}>
            <h3>Name: {name}</h3>
            <h3>Age: {age}</h3>
        </div>
        <h3>{props.title}</h3>
        <div className={styles.form}>
            <p>Введите своё имя и фамилию</p>
            <input type="text" onChange={handleChangeName}/>
            <p>Ваш возраст</p>
            <input type="number" onChange={handleChangeAge} step="1" min="1" max="100"/>
        </div>
        <button className={styles.btn} onClick={handleClick}>Обновить</button>
        </>
    )
}

