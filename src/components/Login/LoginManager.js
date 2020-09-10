// import * as firebase from "firebase/app";
// import "firebase/auth";
// import firebaseConfig from './firebase.config';

// export const initializeLoginFrameWork = () => {
//     firebase.initializeApp(firebaseConfig)
// }

// export const handleGoogleSignIn =()=>{
//     const provider = new firebase.auth.GoogleAuthProvider();
//    return firebase.auth().signInWithPopup(provider)
//     .then(res=>{
//       const {displayName,email} =res.user
//       const signInUser ={
//         isSignIn:true,
//         name:displayName,
//         email:email
     
//       }
//       return signInUser

//       console.log(displayName,email)
//     })
//     .catch(error=>{
//     console.log(error);
//     console.log(error.massage)
//     })
   
//   }

//   const handleSignOut = ()=>{
//     firebase.auth().signOut()
//     .then(res=>{
//       const singOutUser ={
//         isSignIn
//         :false,
//         name:'', 
//         email:'',
//         error:'',
//         success:false

//       }
//       setUser(singOutUser)
//     })
//     .catch(err=>{
//       console.log(err)
//     })
//   }

//   export const createUserWithEmailAndPassword = ()=>{
//     firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
//   .then(res=>{
//     const newUserInfo = {...user};
//     newUserInfo.error = '';
//     newUserInfo.success =true
//     setUser(newUserInfo);
//     updateUserName(user.name)
//   })
//   .catch(error => {
//     // Handle Errors here.
//     const newUserInfo ={...user};
//     newUserInfo.error =error.message;
//     newUserInfo.success = false
//    setUser(newUserInfo)
//   });
//   }

//   export const signInWithEmailAndPassword = ()=>{
//     firebase.auth().signInWithEmailAndPassword(user.email, user.password)
//   .then(res=>{
//     const newUserInfo = {...user};
//     newUserInfo.error = '';
//     newUserInfo.success =true
//     setUser(newUserInfo)
//     setLoggedInUser(newUserInfo);
//     history.replace(from);
//     console.log("sign in",res.user);
//   })
//   .catch(function(error) {
    
//     const newUserInfo ={...user};
//     newUserInfo.error =error.message;
//     newUserInfo.success = false
//    setUser(newUserInfo) // Handle Errors here.

//   });
//   }

//   const updateUserName = name =>{
//     const user = firebase.auth().currentUser;
    
//     user.updateProfile({
//       displayName:name,
     
//     }).then(function() {
//       console.log('user name update successfully');
//     }).catch(function(error) {
//       console.log(error);
//     });
    
//     }