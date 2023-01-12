import { useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { defaultContext, ThemeContext } from './utils/ThemeContext';
import { store, persistor } from './store';

import { Header } from "./components/Header/Header";
import { MainPage } from './pages/MainPage';
import { ProfilePage } from './pages/ProfilePage';
import { AboutWithConnect } from './pages/AboutPage'
import { ChatsPage } from './pages/ChatsPage/ChatsPage';
import { ChatList } from './components/ChatList/ChatList';
import { Articles } from "./pages/Articles";


export function App() {
  const [theme, setTheme] = useState(defaultContext.theme)

  // const chats = Object.keys(messages).map((chat) => ({
  //   id: nanoid(),
  //   name: chat
  // }))

  // const onAddChat = (newChat) => {
  //   console.log('newChat', newChat)
  //   setMessages({
  //     ...messages,
  //     [newChat.name]: []
  //   })
  // }

  // const onAddMessage = (chatId, newMessage) => {
  //   setMessages({
  //     ...messages,
  //     [chatId]: [...messages[chatId], newMessage]
  //   })
  // }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <Routes>
                <Route path='/' element={<Header />}>
                  <Route index element={<MainPage />} />
                  <Route path='profile' element={<ProfilePage />} />
                  <Route path='about' element={<AboutWithConnect />} />
                  <Route path='chats'>
                    <Route index element={<ChatList />} />
                    <Route path=":chatId" element={<ChatsPage />} />
                  </Route>
                  <Route path='articles' element={<Articles />} />
                </Route>
                <Route path="*" element={<h1>404 page not found</h1>} />
            </Routes>
          </ThemeContext.Provider>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;