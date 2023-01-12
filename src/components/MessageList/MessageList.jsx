import PropTypes from 'prop-types';
import { useState } from "react"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import styles from './MessageList.module.css'

export function MessageList ({messages}) {
    // const [arrchats, setArr] = useState([{name: 'Ivan', id: 1},{name: 'Maria', id: 2},{name: 'Sasha', id: 3},{name: 'Katia', id: 4}])

    return (
        <>
            <h2 className={styles.header}>MessageList</h2>
            <div className={styles.arrchats}>
                {/* <List>
                    {arrchats.map((elem) => (
                        <ListItem key={elem.id}>{elem.name}</ListItem>
                    ))}
                </List> */}
                <ul className={styles.arrtext}>
                    {messages.map((message, index) => (
                        <li key={index}>
                            {message.author} : {message.text}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

MessageList.propTypes = {
    messages: PropTypes.array
}