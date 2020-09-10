import React, { useState, useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

import {UserContext} from '../../App'
import { useHistory, useLocation } from 'react-router-dom';
// import { initializeLoginFrameWork } from './LoginManager';

firebase.initializeApp(firebaseConfig)

function Login() {
  const [newUser,setNewUser] = useState(false)
  const [user,setUser] =useState({
    isSignIn:false,
    name:'',
    email:'',
    password:''
  });

 

const [loggedInUser,setLoggedInUser] = useContext(UserContext);
const history = useHistory();
const location = useLocation();
let { from } = location.state || { from: { pathname: "/" } };
const provider = new firebase.auth.GoogleAuthProvider();
const handleGoogleSignIn =()=>{
  
  firebase.auth().signInWithPopup(provider)
  .then(res=>{
    const {displayName,email} =res.user
    const signInUser ={
      isSignIn:true,
      name:displayName,
      email:email
   
    }
    setUser (signInUser)

    console.log(displayName,email)
  })
  .catch(error=>{
  console.log(error);
  console.log(error.massage)
  })
 
}

const handleSignOut = ()=>{
  firebase.auth().signOut()
  .then(res=>{
    const singOutUser ={
      isSignIn
      :false,
      name:'', 
      email:'',
      error:'',
      success:false

    }
    setUser(singOutUser)
  })
  .catch(err=>{
    console.log(err)
  })
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
 
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
  .then(res=>{
    const newUserInfo = {...user};
    newUserInfo.error = '';
    newUserInfo.success =true
    setUser(newUserInfo);
    updateUserName(user.name)
  })
  .catch(error => {
    // Handle Errors here.
    const newUserInfo ={...user};
    newUserInfo.error =error.message;
    newUserInfo.success = false
   setUser(newUserInfo)
  });
  

}

if(!newUser && user.email && user.password){
  firebase.auth().signInWithEmailAndPassword(user.email, user.password)
  .then(res=>{
    const newUserInfo = {...user};
    newUserInfo.error = '';
    newUserInfo.success =true
    setUser(newUserInfo)
    setLoggedInUser(newUserInfo);
    history.replace(from);
    console.log("sign in",res.user);
  })
  .catch(function(error) {
    
    const newUserInfo ={...user};
    newUserInfo.error =error.message;
    newUserInfo.success = false
   setUser(newUserInfo) // Handle Errors here.

  });
}
event.preventDefault();
}
const updateUserName = name =>{
  const user = firebase.auth().currentUser;
  
  user.updateProfile({
    displayName:name,
   
  }).then(function() {
    console.log('user name update successfully');
  }).catch(function(error) {
    console.log(error);
  });
  
  }




  return (
    <div style={{textAlign:'center'}}>
     {
      user.isSignIn ?  <button onClick={handleSignOut}>Sign out</button> :

      <button onClick={handleGoogleSignIn}>Sign In</button>
      
      }
      <br/>
      <button>Log In Facebook</button>
    {user.isSignIn &&<div>
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
