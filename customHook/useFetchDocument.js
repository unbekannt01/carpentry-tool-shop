import { useEffect, useState } from 'react'
import { db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
const useFetchDocument = (collectionname,documentId) => {
    const [document,setDocument]=useState(null)
    useEffect(()=>{
        getDocumentdata()
    })
    let getDocumentdata=async()=>{
        const docRef=doc(db,collectionname,documentId)
        const docSnap=await getDoc(docRef)
        if(docSnap.exists()){
            const obj={
                id:documentId,...docSnap.data()
            }   
            setDocument(obj)
        }
        else{
            toast.error("Document Not Found")
        }
    }
  return (
   {document}
  )
}

export default useFetchDocument
