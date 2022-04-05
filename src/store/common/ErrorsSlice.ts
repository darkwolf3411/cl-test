import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const errorSlice = createSlice({
    name: 'loading',
    initialState: {
        errors: ''
    },
    reducers: {
        setErros(state, action: PayloadAction<string>){
            state.errors = action.payload;
        }
    }
})

export default errorSlice