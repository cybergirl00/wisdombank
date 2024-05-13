"use client"
import { useEffect, useState } from "react"
import BookContainer from "../BookContainer"
import Navbar from "../Navbar"
import { db } from "@/lib/firebase"
import { collection, doc, getDoc, getDocs } from "firebase/firestore"

const HomeScreen = () => {
    const userId = localStorage.getItem('wisdombankprovider')
    const programs = localStorage.getItem('program')
    const [user, setUser] = useState()
    const [program, setprogram] = useState()
    const [books, setBooks] = useState([])
 
    useEffect(() => {
     const getUser = async () => {
        const docRef = doc(db, 'students', userId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            setUser(docSnap.data());
            const program = docSnap.get('course')
            console.log(program)
        } else {
            console.log('No such document!');
        }
     }
     getUser();
    }, [])

    useEffect(() => {
        const getBooks = async () => {
            const selectedprogram= programs === 'sen' && 'software engineering' || programs === 'cyb' && 'cyber security' || programs === 'cmp' && 'computer science' || programs === 'ins' && 'information system'
        const data =  await getDocs(collection(db, selectedprogram))
        setBooks(data.docs.map((doc) => ({
          ...doc.data(), id: doc.id
        })
      ))
        }
        getBooks();
      }, [])
  return (
    <div>
        
        <Navbar user={user}/>
        <BookContainer user={user} course={program} books={books}/>
    </div>
  )
}

export default HomeScreen