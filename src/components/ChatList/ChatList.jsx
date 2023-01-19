import { useState } from "react"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addChat, deleteChat } from '../../store/messages/actions'
import { selectChat } from '../../store/messages/selectors'
import { push, set, remove } from "firebase/database";
import { messagesRef } from "../../services/firebase"
import styles from '../../pages/Pages.module.css'

export function ChatList ({messageDB}) {
    const[value, setValue] = useState('')
    const dispatch = useDispatch()
    const chats = useSelector(selectChat, (prev,next) => prev.length === next.length)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addChat(value))

        set(messagesRef, {
            ...messageDB,
            [value]: {
                name: value
            }
        })
    }

    return (
        <>
            <h1 className={styles.header}>Welcome to chat!</h1>
            <h2>ChatList</h2>
            <ul>
                {chats.map((chat) => (
                    <li key={chat.id}>
                        <Link to={`/chats/${chat.name}`}>
                            {chat.name}
                        </Link>
                        <button onClick={() => dispatch(deleteChat(chat.name))}>x</button>
                    </li>
                ))}
            </ul>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)} 
                />
                <button type="submit">Create Chat</button>
            </form>
        </>
    )
}