import { configureStore } from '@reduxjs/toolkit';
import userSignupSlice from '../reducers/auth/user/userSignupSlice';

// import  from '../reducers/auth/user/userSignupSlice'

// const loadState = () =>{
//    try{
//       const serializedState = localStorage.getItem("reduxState");
//       if(serializedState === null){
//          return undefined
//       }
//       return JSON.parse(serializedState)
//    }catch(err){
//       return undefined
//    }
// };


// //save state to localStorage
// const saveState = (state) =>{
//    try{
//       const serializedState = JSON.stringify(state)
//       localStorage.setItem("reduxState", serializedState)
//    }catch (err){
//       console.log(err);
//    }
// }

// const persistedState = loadState();


const store = configureStore({
   reducer:{
      signup: userSignupSlice,
      
   },
   // preloadedState:persistedState
})

export type AppDispatch = typeof store.dispatch

store.subscribe(()=>{(store.getState())
});

export default store