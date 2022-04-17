import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBtfU-ez-um6sXoo3H-h0mpWzrD4A-LDWU",
  authDomain: "simple-plan-db.firebaseapp.com",
  projectId: "simple-plan-db",
  storageBucket: "simple-plan-db.appspot.com",
  messagingSenderId: "52563216509",
  appId: "1:52563216509:web:5a19ecccaa2df8d56ac914",
  measurementId: "G-6C016MQJPT",
}

const firebaseApp = initializeApp(firebaseConfig)
const analytics = getAnalytics(firebaseApp)

const googleProvider = new GoogleAuthProvider()

googleProvider.setCustomParameters({
  prompt: "select_account",
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (
  userAuth: any,
  additionalInformation?: object
) => {
  if (!userAuth) return

  const userDocRef = doc(db, "users", userAuth.uid)

  const userSnapShot = await getDoc(userDocRef)

  if (!userSnapShot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        projects: [],
        ...additionalInformation,
      })
    } catch (error) {
      console.log("error creating the user", error)
    }
  }

  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) {
    return
  }
  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}
