import { configureStore, combineReducers} from "@reduxjs/toolkit";
import errorSlice from "./common/ErrorsSlice";
import loaderSlice from "./common/LoaderSlice";
import nutritionSlice from "./NutritionSlice";

const rootReducer = combineReducers({
    nutritionReducer: nutritionSlice.reducer,
    loadingReducer: loaderSlice.reducer,
    errorsReducer: errorSlice.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']