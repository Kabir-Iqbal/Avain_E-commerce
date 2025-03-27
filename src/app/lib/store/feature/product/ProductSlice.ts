import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ProductState {
  filteredProducts: any[]; // Define type properly
}

// reducer.js
const initialState : ProductState = {
  filteredProducts: []
};

export const productSlice = createSlice({
  name : "products",
  initialState ,
  reducers : {
    SetFilteredProducts : (state, action: PayloadAction<any[]>) => {
      state.filteredProducts = action.payload
      console.log("Data in Redux_slice", state.filteredProducts);
      
    }
  }
})

export const { SetFilteredProducts } = productSlice.actions; // Export action

export default productSlice.reducer;
