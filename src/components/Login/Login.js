import React, { useState, useContext } from 'react';

import {UserContext} from '../../App'
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFrameWork, handleGoogleSignIn, handleSignOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './LoginManager';


function Login() {
  const [newUser,setNewUser] = useState(false)
  const [user,setUser] =useState({
    isSignedIn:false,
    name:'',
    email:'',
    password:''
  });

  initializeLoginFrameWork();

const [loggedInUser,setLoggedInUser] = useContext(UserContext);
const history = useHistory();
const location = useLocation();
let { from } = location.state || { from: { pathname: "/" } };

const googleSignIn = ()=>{
  handleGoogleSignIn()
.then(res =>{ 
  handleResponse(res,true)
})
}

const signOut =()=>{
  handleSignOut()
  .then(res =>{
    handleResponse(res,false)
  })
}

const handleResponse =(res,redirect)=>{
  setUser(res)
  setLoggedInUser(res)
if(redirect){
   history.replace(from);
}

}
 
  

  

// input
const handleBlur = (event)=>{

let  isFieldValid = true;
if(event.target.name === 'email'){
isFieldValid =  /\S+@\S+\.\S+/.test(event.target.value);

}
if(event.target.name === 'password'){
  const isPasswordValid = event.target.value.length > 6;
  const passwordHasNumber = /\d{1}/.test(event.target.value)
 isFieldValid =isPasswordValid && passwordHasNumber;
}
if(isFieldValid){

const newUserInfo = {...user};
newUserInfo[event.target.name]=event.target.value;
setUser(newUserInfo)
}
}


const handleSubmit = (event)=>{
  // console.log(user.email,user.password)
if(newUser && user.email && user.password){
  createUserWithEmailAndPassword(user.name, user.email,user.password)
  .then(res=>{
    handleResponse(res,true)
  })
}

if(!newUser && user.email && user.password){
  
  signInWithEmailAndPassword(user.email,user.password)
  .then(res=>{
    handleResponse(res,true)
  })

}
event.preventDefault();
}




  return (
    <div style={{textAlign:'center'}}>
     {
      user.isSignedIn ?  <button onClick={signOut}>Sign out</button> :

      <button onClick={googleSignIn}>Sign In</button>
      
      }
      <br/>
      <button>Log In Facebook</button>
    {user.isSignedIn &&<div>
    <p>Welcome To {user.name}</p>
    <p>YOUR Email:{user.email}</p>
    </div>
  }

  <h1>Our Own Authentication</h1>
  <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" id=""></input>
  <label htmlFor="newUser" >New User Sign Up</label>
  <form onSubmit={handleSubmit}>

  {/* onChange holo komo input a likta thakla oita console a save hota thaka  */}
   {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder="Enter Your Name"/>}
      <br/>
    <input type="text" name="email" onBlur={handleBlur} placeholder="Enter Your Email" required></input><br></br>
    <input type="password" name="password" onBlur={handleBlur} placeholder="Enter Your Password" required></input><br></br>
    <input type="submit" value={newUser ? 'sign up' : 'sign In'}></input>
  </form> 
    <p style={{color:'red'}}>{user.error}</p>
    {
      user.success && <p style={{color:'green'}}>User {newUser ? 'Created' : 'Logged In'} Success</p>
    }
    </div>
  );
}

export default Login;
