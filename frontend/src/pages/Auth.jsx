import React,{useState} from 'react'
import {SignUp} from '../components/SignUp'
import { SignIn } from '../components/SignIn'
export const Auth = () => {
  const [signin,setSignin]=useState(false);
const toggleSignin=()=>{
  console.log("inside toggle signin");
  setSignin(!signin);
}
  if(signin===false){
    return (
<SignUp toggleSignin={toggleSignin}/>
    )
  }
  return (
    <>
    <SignIn toggleSignin={toggleSignin}/>
    </>
  )
}
