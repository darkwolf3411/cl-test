import { INutrition } from './../models/nutrition.types';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
    nutrition: INutrition[];
    totalCount: number;
    page: number;
    limit: number;
}

const initialState:State = {
    nutrition: [],
    totalCount: 100,
    page: 1,
    limit: 50,
}
const nutritionSlice = createSlice({
    name: "nutrition",
    initialState,
    reducers: {
        setNutritons(state, action: PayloadAction<INutrition[]>){
            state.nutrition = action.payload
        },
        setTotalCount(state, action: PayloadAction<number>){
            state.totalCount = action.payload;
        },
        setPage(state, action: PayloadAction<number>){
            state.page = action.payload;
        }
    }
})

export default nutritionSlice;