// import React, { useEffect } from "react"
import { useParams, Navigate } from 'react-router-dom'
// import { Message } from '../components/ui/Message'
import { Form } from '../../components/Form/Form'
import { MessageList } from '../../components/MessageList/MessageList'
import { ChatList } from '../../components/ChatList/ChatList'
import { WithClasses } from '../../HOC/WithClasses'
import styles from './ChatsPage.module.css'
import { useSelector } from 'react-redux'
import { selectMessage } from '../../store/messages/selectors'

export function ChatsPage() {
  // const mytext = < Message title='Function component - функциональный компонент' text = 'JavaScript-библиотека для создания пользовательских интерфейсов' />;
  // const[messages, setMessages] = useState([])
  const { chatId } = useParams()
  const MessageListWithClass = WithClasses(MessageList)
  const messages = useSelector(selectMessage)


  // const addMessage = (newMessage) => {
  //   setMessages([...messages, newMessage])
  // }

  // useEffect(() => {
  //   if (chatId &&
  //     messages[chatId].length > 0 &&
  //     messages[chatId][messages[chatId].length - 1].author === AUTHOR.user
  //   ) {
  //     const timeout = setTimeout(() => {
  //       onAddMessage(chatId, {
  //         author: AUTHOR.bot,
  //         text: 'I am bot',
  //       })
  //     }, 1500)
  //     return () => {
  //       clearTimeout(timeout)
  //     }
  //   }
  // }, [chatId, messages])

  // const handleAddMessage = (message) => {
  //   if (chatId) {
  //     onAddMessage(chatId, message)
  //   }
  // }

  if (chatId && !messages[chatId]) {
    return <Navigate to="/chats" replace />
  }

  return (
    <>
      {/* {mytext} */}
      <ChatList />
      <MessageListWithClass
        messages={chatId ? messages[chatId] : []}
        classes={styles.bgc}
      />
      <Form />
      {/* <MessageList messages={chatId ? messages[chatId] : []}/> */}
    </>
  );
}


