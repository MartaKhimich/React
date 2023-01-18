import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyB_FE5s3OC3dk29TKACtxywPEs0gEbE6Ko",
  authDomain: "gb-285061-d6cee.firebaseapp.com",
  projectId: "gb-285061-d6cee",
  storageBucket: "gb-285061-d6cee.appspot.com",
  messagingSenderId: "906436829900",
  appId: "1:906436829900:web:3edb8a0392aee7fbb8d869"
};


const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);

export const signUp = async (email, password) => await createUserWithEmailAndPassword(firebaseAuth, email, password)

export const signIn = async (email, password) => await signInWithEmailAndPassword(firebaseAuth, email, password)

export const logOut = async () => await signOut(firebaseAuth)

const db = getDatabase(app)

export const userRef = ref(db, 'user')

export const messagesRef = ref(db, 'messages')

export const getChatById = (chatId) => ref(db, `messages/${chatId}`)

export const getMessageListById = (chatId) => ref(db, `messages/${chatId}/messageList`)