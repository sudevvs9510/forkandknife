//Provider
//Store
//Reducer
//Action

import { createSlice } from "@reduxjs/toolkit"

const Initial_State = {
  cartList : [],
  cartCount : 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState: Initial_State,
  reducers:{
    addToCart : (state) =>{
      state.cartCount = 1
    },
    increment : (state) =>{
      state.cartCount +=1

    },
    decrement : (state) =>{
      state.cartCount -=1
    }

  }
})

export const {increment, decrement, addToCart } = cartSlice.actions()

export default cartSlice.reducer;