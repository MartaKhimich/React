import { useState } from "react"
import { AUTHOR } from "../../constants"
//import { Button } from '../ui/Button'
import styles from './Form.module.css'
import PropTypes from 'prop-types'
import IButton from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';
import TextField from '@mui/material/TextField';
import { useDispatch } from 'react-redux'
import { addMessageWithReply } from '../../store/messages/actions'
import { useParams } from 'react-router-dom'
import { push } from "firebase/database";
import { getMessageListById } from "../../services/firebase";

const theme = createTheme({
    palette: {
      primary: {
        main: blueGrey[300],
      }
    },
  });

export function Form () {
    const [text, setText] = useState('')
    const dispatch = useDispatch()
    const { chatId } = useParams()

    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(addMessageWithReply(chatId, {
            author: AUTHOR.user,
            text
        }))

        push(getMessageListById(chatId), {
            author: AUTHOR.user,
            text
        })

        setText('')
    }


    return (
        <>
            <h2>Form</h2>
            <form className={styles.chatform} onSubmit={handleSubmit}>
                <TextField 
                    className={styles.txtinput} 
                    onChange={(event) => setText(event.target.value)}
                    id="outlined-basic" 
                    type="text"
                    value={text}
                    autoFocus={true}
                    focused
                    variant="outlined"/>
                <ThemeProvider theme={theme}>
                    <IButton 
                        className={styles.btn}
                        variant="contained"
                        size="small"
                        type="submit">
                            Add message
                    </IButton>
                </ThemeProvider>
            </form>
        </>
    )
}

Form.propTypes = {
    addMessage: PropTypes.func
}