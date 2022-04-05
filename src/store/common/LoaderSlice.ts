import { createSlice, PayloadAction } from '@reduxjs/toolkit';


const loaderSlice = createSlice({
    name: 'loading',
    initialState: {
        onLoading: true
    },
    reducers: {
        setIsLoading(state, action: PayloadAction<boolean>){
            state.onLoading = action.payload;
        }
    }
})

export default loaderSlice