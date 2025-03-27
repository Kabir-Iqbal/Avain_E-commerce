import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AmountState {
  totalAmount: number;
}

const initialState: AmountState = {
  totalAmount: 0,
};

export const amountSlice = createSlice({
  name: 'amount',
  initialState,
  reducers: {
    addTotalAmount: (state, action: PayloadAction<number>) => {
      state.totalAmount = action.payload; // Directly assign value instead of push
    },
  },
});

// Action creators
export const { addTotalAmount } = amountSlice.actions;

export default amountSlice.reducer;
