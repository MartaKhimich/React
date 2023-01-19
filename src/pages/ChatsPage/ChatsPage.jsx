import { useParams, Navigate } from 'react-router-dom'
import { Form } from '../../components/Form/Form'
import { MessageList } from '../../components/MessageList/MessageList'
import { ChatList } from '../../components/ChatList/ChatList'
import { WithClasses } from '../../HOC/WithClasses'
import styles from './ChatsPage.module.css'
import { useSelector } from 'react-redux'
import { selectMessage } from '../../store/messages/selectors'

export function ChatsPage() {
  const { chatId } = useParams()
  const MessageListWithClass = WithClasses(MessageList)
  const messages = useSelector(selectMessage)

  if (chatId && !messages[chatId]) {
    return <Navigate to="/chats" replace />
  }

  return (
    <>
      <ChatList />
      <MessageListWithClass
        messages={chatId ? messages[chatId] : []}
        classes={styles.bgc}
      />
      <Form />
    </>
  );
}


