import React, { useRef } from 'react'

import { BasicTable } from '../BasicTable/BasicTable';

export const Form = () => {
    const firstNameRef = useRef()
    const lastNameRef = useRef()
    const emailRef = useRef()
    const addressRef = useRef()

    const handleSubmit = e=>{
        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const email = emailRef.current.value;
        const address = addressRef.current.value;


       const newUser ={firstName, lastName, email, address}
       fetch('http://localhost:5000/users',{
        method: 'POST',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(newUser)
       })
       .then(res=> res.json())
       .then(data=>{
        if(data.insertedId){
            alert('User added successfully')
            e.target.reset()
        }
       })

        e.preventDefault()
    }

  return (
    <div className=''>
        
        <div className='my-6'>
        <form onSubmit={handleSubmit} className='max-w-[500px] w-full mx-auto bg-gray-900 p-8 px-8 rounded-lg' >
                <h2 className='text-4xl text-white font-bold text-center'> User Form</h2>
               <div className='flex flex-col text-gray-400 py-2'>
               <label className='text-left'>First Name</label>
                <input ref={firstNameRef} className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" required minLength={5}  title="4 to 8 lowercase letters" />
               </div>
               <div className='flex flex-col text-gray-400 py-2'>
               <label className='text-left'>Last Name</label>
                <input ref={lastNameRef} className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" required minLength={5}  title="4 to 8 lowercase letters" />
               </div>
               <div className='flex flex-col text-gray-400 py-2'>
               <label className='text-left'>Email</label>
                <input ref={emailRef} className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="email" required   />
               </div>
               
               <div className='flex flex-col text-gray-400 py-2'>
               <label className='text-left'>Address</label>
               <textarea ref={addressRef}  className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' id="t3" name="msg" maxlength="50" rows="3" required></textarea>
               </div>
               <div className='flex justify-between text-gray-400 py-2'>
                <p className='flex items-center'><input className='mr-2' type="checkbox" />Remember me</p>
                <p>Forgot Password</p>
               </div>
               <button type='submit' className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/80 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'>Submit</button>
            </form>
            <div className='my-10 ml-80 px-4 py-8'>
             <BasicTable/>
            </div>
        </div>
    </div>
  )
}
