import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFrameWork = () => {
  if(firebase.apps.length === 0){
    firebase.initializeApp(firebaseConfig)
  }
}

export const handleGoogleSignIn =()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
   return firebase.auth().signInWithPopup(provider)
    .then(res=>{
      const {displayName,email} =res.user
      const signInUser ={
        isSignIn:true,
        name:displayName,
        email:email,
        success:true
     
      }
    
      setUserToken()

      return signInUser;

      console.log(displayName,email)
    })
    .catch(error=>{
    console.log(error);
    console.log(error.massage)
    })
   
  }

  export const handleSignOut = ()=>{
  return  firebase.auth().signOut()
    .then(res=>{
      const singOutUser ={
        isSignIn
        :false,
        name:'', 
        email:'',
        error:'',
        success:false

      }
      
      return singOutUser;
    })
    .catch(err=>{
      console.log(err)
    })
  }


  const setUserToken =()=>{
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
      sessionStorage.setItem('token',idToken)
      // Send token to your backend via HTTPS
      // ...
    }).catch(function(error) {
      // Handle error
    });
  }

  export const createUserWithEmailAndPassword = (name ,email,password)=>{
  return  firebase.auth().createUserWithEmailAndPassword(email,password)
  .then(res=>{
    const newUserInfo = res.user;
    newUserInfo.error = '';
    newUserInfo.success =true
 
    updateUserName(name)
    return newUserInfo;
  })
  .catch(error => {
    // Handle Errors here.
    const newUserInfo ={};
    newUserInfo.error =error.message;
    newUserInfo.success = false
    return newUserInfo;
  });
  }

  export const signInWithEmailAndPassword = (email,password)=>{
 return   firebase.auth().signInWithEmailAndPassword(email,password)
  .then(res=>{
    const newUserInfo = res.user;
    newUserInfo.error = '';
    newUserInfo.success =true
    return newUserInfo;
    
  })
  .catch(function(error) {
    
    const newUserInfo ={};
    newUserInfo.error =error.message;
    newUserInfo.success = false
   return newUserInfo // Handle Errors here.

  });
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