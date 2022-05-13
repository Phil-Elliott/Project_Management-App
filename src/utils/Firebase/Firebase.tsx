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
        projects: [
          {
            name: "Transfer Files",
            initials: "TF",
            color: "#5ec99c",
            description:
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tempora saepe laborum reprehenderit, autem debitis totam facere accusamus odit minus ipsum dolores itaque laudantium nihil enim quibusdam eaque tenetur omnis.",
            launch: "2022-08-26",
            tasks: [
              {
                name: "Decide on what to transfer",
                department: "Accounting",
                date: "2022-05-24",
                assigned: "John Ellie",
                comments: [
                  {
                    name: "Bob Tyler",
                    date: "March 18, 2022 12:54 PM",
                    comment:
                      "We might need to change the deadline to a later date.",
                  },
                  {
                    name: "Darrel Kent",
                    date: "March 18, 2022 2:17 PM",
                    comment:
                      "That is not a problem Bob. Just let me know when the new deadline will be.",
                  },
                ],
              },
              {
                name: "Call about files",
                department: "Sales",
                date: "2022-04-27",
                assigned: "Tim",
                comments: [],
              },
              {
                name: "Figure out a structure",
                department: "Marketing",
                date: "2022-07-18",
                assigned: "Josh Sterling",
                comments: [],
              },
              {
                name: "Delete unnecessary files",
                department: "Accounting",
                date: "2022-04-06",
                assigned: "Lisa Atkins",
                comments: [
                  {
                    name: "Sarah Evans",
                    date: "March 29, 2022 7:54 AM",
                    comment: "Which files should we start with?",
                  },
                  {
                    name: "Dan Thompson",
                    date: "March 29, 2022 12:17 PM",
                    comment:
                      "Start with the oldest files in the system and make sure they have already been backed up.",
                  },
                  {
                    name: "Marry Glass",
                    date: "March 29, 2022 2:24 PM",
                    comment:
                      "I will be able to help starting tomorrow afternoon.",
                  },
                  {
                    name: "Sarah Evans",
                    date: "March 29, 2022 4:31 PM",
                    comment: "Thanks Marry",
                  },
                ],
              },
              {
                name: "Hire new employee",
                department: "Human Resources",
                date: "2022-04-14",
                assigned: "Tracy Daniels",
                comments: [],
              },
              {
                name: "Track progress",
                department: "Management",
                date: "2022-04-18",
                assigned: "Mark Stein",
                comments: [],
              },
              {
                name: "Sign documents",
                department: "Marketing",
                date: "2022-03-20",
                assigned: "Josh Peck",
                comments: [],
              },
              {
                name: "Meet clients",
                department: "Sales",
                date: "2022-03-08",
                assigned: "Diane",
                comments: [],
              },
              {
                name: "Fix UI",
                department: "Marketing",
                date: "2022-04-09",
                assigned: "Jose Nunez",
                comments: [],
              },
            ],
            completed: [
              {
                name: "Start project",
                department: "Management",
                date: "2022-03-13",
                assigned: "Samuel Eli",
                comments: [],
              },
            ],
          },
        ],
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
