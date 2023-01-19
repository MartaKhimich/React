import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { defaultContext, ThemeContext } from './utils/ThemeContext';
import { persistor } from './store';
import { auth } from "./store/profile/actions";
import { firebaseAuth, messagesRef } from "./services/firebase";
import { onValue } from "firebase/database";

import { Header } from "./components/Header/Header";
import { MainPage } from './pages/MainPage';
import { ProfilePage } from './pages/ProfilePage';
import { AboutWithConnect } from './pages/AboutPage'
import { ChatsPage } from './pages/ChatsPage/ChatsPage';
import { ChatList } from './components/ChatList/ChatList';
import { Articles } from "./pages/Articles";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { PrivateRoute } from "./utils/PriviteRoute";
import { PublicRoute } from "./utils/PublicRoute";


export function App() {
  const dispatch = useDispatch()
  const [theme, setTheme] = useState(defaultContext.theme)

  const [messageDB, setMessageDB] = useState({})

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
      if(user) {
        dispatch(auth(true))
      } else {
        dispatch(auth(false))
      }
    })
    return unsubscribe
  },[])

  useEffect(() => {
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val()

      setMessageDB(data)
    })
  },[])

  return (
    <>
        <PersistGate persistor={persistor}>
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <Routes>
                <Route path='/' element={<Header />}>
                  <Route index element={<MainPage />} />
                  <Route path='profile' element={<ProfilePage />} />
                  <Route path='about' element={<AboutWithConnect />} />
                  <Route path="chats" element={<PrivateRoute />}>
                    <Route
                      index
                      element={<ChatList messageDB={messageDB} />}
                    />
                    <Route
                      path=":chatId"
                      element={<ChatsPage />}
                    />
                  </Route>
                  <Route path='articles' element={<Articles />} />
                  <Route path="signin" element={<PublicRoute component={<SignIn />} />} />
                  <Route path='signUp' element={<SignUp />} />
                </Route>
                <Route path="*" element={<h1>404 page not found</h1>} />
            </Routes>
          </ThemeContext.Provider>
        </PersistGate>
    </>
  );
}

export default App;