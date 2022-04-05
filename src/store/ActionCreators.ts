import { AppDispatch, RootState } from "./index";
import { INutrition } from "./../models/nutrition.types";
import axios from "axios";
import nutritionSlice from "./NutritionSlice";
import loaderSlice from "./common/LoaderSlice";
import errorSlice from "./common/ErrorsSlice";

export const fetchNutritions = () => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    try {
      dispatch(loaderSlice.actions.setIsLoading(true));
      const response = await axios.get<INutrition[]>(
        "http://localhost:3001/nutrations?_sort=id&_order=desc",
        {
          params: {
            _limit: state.nutritionReducer.limit,
            _page: state.nutritionReducer.page,
          },
        }
      );
      dispatch(nutritionSlice.actions.setNutritons(response.data));
      dispatch(
        nutritionSlice.actions.setTotalCount(
          Number(response.headers["x-total-count"])
        )
      );
    } catch (error: any) {
      dispatch(errorSlice.actions.setErros(error.message));
    } finally {
      dispatch(loaderSlice.actions.setIsLoading(false));
    }
  };
};

export const addNewNutrition = (body: INutrition) => {
  return async (dispatch: AppDispatch) => {
    try {
      dispatch(loaderSlice.actions.setIsLoading(true));
      await axios.post<INutrition[]>("http://localhost:3001/nutrations", body);
      dispatch(setPage(1));
      await dispatch(fetchNutritions());
    } catch (error: any) {
      dispatch(errorSlice.actions.setErros(error.message));
    } finally {
      dispatch(loaderSlice.actions.setIsLoading(false));
    }
  };
};

export const setPage = (page?: number) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState();
    if (page) {
      dispatch(nutritionSlice.actions.setPage(page));
    } else {
      dispatch(nutritionSlice.actions.setPage(state.nutritionReducer.page + 1));
    }
  };
};
