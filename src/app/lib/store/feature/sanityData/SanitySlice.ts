import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the interface for each product
interface Product {
  category: string;
  name: string;
  slug: {
    current: string;
  };
  image: string; // URL of the image
  price: number;
  quantity: number;
  tags: string[];
  description: string;
  features: string[];
  dimensions: string;
}

// Define the interface for the state
interface SanityState {
  products: Product[]; // Or define a specific type based on your data structure
  loading: boolean;
  error: string | null;
}

const initialState : SanityState  = {
  products: [], // Sanity products data
  loading: false,
  error: null,
};

// console.log("getting data in initialstate", initialState.products.name)

const sanitySlice = createSlice({
  name: 'sanity',
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<any> ) => {
      state.products = action.payload;
    },
    setLoading: (state) => {
      state.loading = true;
    },
    setError: (state, action:PayloadAction<any>) => {
      state.error = action.payload;
    },
    setLoaded: (state) => {
      state.loading = false;
    },
  },
});

export const { setProducts, setLoading, setError, setLoaded } = sanitySlice.actions;
export default sanitySlice.reducer;
