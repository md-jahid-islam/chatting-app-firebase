
import './Register.css'
import { IoMdEyeOff } from "react-icons/io";
import { IoEyeSharp } from "react-icons/io5";
import 'react-toastify/dist/ReactToastify.css';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

import Lottie from "lottie-react";
import Animation from "../../../public/animations/Animation - 1721135189137.json";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState, CSSProperties } from "react";
import { ScaleLoader } from 'react-spinners';
const Register = () => {
// ========================variable part start


const [userName , setuserName]            = useState ('')
const [userNameerror , setuserNameerror]  = useState ('')
const [email , setEmail]                  = useState ('')
const [emailError , setEmailError ]       = useState ('')
const [password , setPassword]            = useState ('')
const [passwordError , setPasswordError]  = useState ('')
const [show , setshow]                    = useState (false)

// ========================firebase variable part start
const auth = getAuth();
const [loading, setLoading]               = useState(false)




//======================= functions part start


const handelEmail = (e)=>{
   setEmail(e.target.value)
   setEmailError('')
}

const handelPassword = (e)=>{
    setPassword(e.target.value)
    setPasswordError('')
}
const handeluser = (e)=>{
    setuserName(e.target.value)
    setuserNameerror('')
}
//===============  show functions
 const handelshow= ()=>{
  setshow(!show)
  console.log(show)

 }


// ==========================submit
const handelSubmit = (e)=>{
  
    e.preventDefault()
    if(!userName){
        setuserNameerror('enter your user Name')
     }
    if(!email){
       setEmailError('enter your email')
    }
     if(!password){
        setPasswordError('enter your password')
    }

    
    else{
      setLoading(true)
            createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setLoading(false)
                navigate('/')
                toast('Registration Successful', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                    });
            })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setLoading(false)

        if(errorCode == 'auth/weak-password'){
            toast('Please Select Stronge password', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
        }
        if(errorCode == 'auth/email-already-in-use'){
            toast('Email already used', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
        }
     
      });
    }

}
  return (
    <>
   <ToastContainer />
    <div className=' flex h-screen justify-center items-center '>
   
    <div className=' w-[550px] '>
    <Lottie animationData={Animation} />
    </div>
      <div className='login'>
       <h1 className=' text-[18px] font-bold text-black flex justify-center items-center mt-8 p-2 uppercase'>welcome to back register form</h1>
         <form onSubmit={handelSubmit} className='main_form'>
          
           <label>user name</label>
           <br />
           <input className=' p-5' onChange={handeluser} type="usernam" placeholder=' Enter your username' />
           <br />
           <p className=' error'>{userNameerror}</p>

           <label>Email</label>
           <br />
           <input className=' p-5' onChange={handelEmail} type="email" placeholder=' Enter your email' />
           <br />
           <p className=' error'>{emailError}</p>
           <label>Password</label>
           <br />
           <div className=' main_icons'>
 
             {
               show?
               <IoEyeSharp onClick={handelshow} className=' icons' />
              :
               <IoMdEyeOff onClick={handelshow} className=' icons' />
 
             }


         <input className=' p-5' onChange={handelPassword} type={show? 'text' : 'password'} placeholder=' Enter your password' />
           </div>
           <p className=' error'>{passwordError}</p>
           
           {
            loading?
            <div className=' w-full h-[40px] flex justify-center items-center px-4 py-2 font-bold text-white bg-blue-700 rounded-full focus:outline-none focus:shadow-outline'><ScaleLoader /></div>
          
          :
    
         <button type='submit' className='Button'> Register </button>
          }

           <hr className='my-6'/>

         <Link to='/' className=' text-sm font-bold text-balance'>allredy have an accound ? <span className=' text-sm font-bold'>signup</span></Link>

         </form>
        
      </div>
 
 
    </div>
    
    </>
    
)
}

export default Register