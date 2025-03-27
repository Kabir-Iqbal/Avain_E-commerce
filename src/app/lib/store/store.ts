import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./feature/cart/CartSlice"
import sanityReducer from "./feature/sanityData/SanitySlice"
import amountReducer from "./feature/amount/AmountSlice"
import productReducer from "./feature/product/ProductSlice" 




//  Create globally store
export const makeStore = () => {
  return configureStore({
    reducer: {
        cart : cartReducer,
        sanityData : sanityReducer,
        amount : amountReducer,
        products: productReducer,  // ✅ Adding reducer to store

    },
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']






// function checkoutReducer(state: unknown, action: UnknownAction): unknown {
//   throw new Error('Function not implemented.')
// }
// function sanityReducer(state: unknown, action: UnknownAction): unknown {
//   throw new Error('Function not implemented.')
// }
