"use client"
import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction, current } from '@reduxjs/toolkit'
import { json } from 'stream/consumers'
import { stringify } from 'querystring'

export interface cartitem {
    slug: string,
    quantity: number,
}


export interface CartState {
    item: cartitem[]
}
// const initialState: CartState = {
//     item: JSON.parse(localStorage.getItem('cartitems') || "[]") || [] ,   // Getting data from local storage with the key of of 'cartitems'
// }
let cartitems = [];
try {
    cartitems = JSON.parse(localStorage.getItem('cartitems') || "[]");
} catch (error) {
    console.error("Error parsing cartitems from localStorage:", error);
    cartitems = [];  // اگر JSON خراب ہو تو خالی array سیٹ کر دو
}

const initialState: CartState = {
    item: cartitems,
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, actions: PayloadAction<cartitem>) => {
            const { slug, quantity } = actions.payload

            // Check if the item is already in the cart
            const isAlreadyAvailable = state.item.some((item) => item.slug == actions.payload.slug)
            if (isAlreadyAvailable) {
                alert("Product is Already Added to Cart")
            } else {
                state.item.push({ slug, quantity })
            // Adding data to local storage with the key of 'cartitems'
                localStorage.setItem('cartitems',JSON.stringify(state.item))
            }
        },
        remove: (state, actions: PayloadAction<string>) => {
            state.item = state.item.filter((item) => item.slug !== actions.payload)
            // updated localstorage
            localStorage.setItem(`cartitems`, JSON.stringify(state.item))
        }
    }
})

// Action creators are generated for each case reducer function
export const { add, remove } = cartSlice.actions

export default cartSlice.reducer