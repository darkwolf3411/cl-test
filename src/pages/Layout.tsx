import React, { useEffect } from "react";
import { Container } from "@mui/material";
import NutritionTable from "../components/nutritionTabe/NutritionTable";
import { useSnackbar } from 'notistack';
import { useAppSelector } from "../hooks/redux";

const Layout = () => {
  const { enqueueSnackbar } = useSnackbar();
  const {errors} = useAppSelector(state=>state.errorsReducer)

  const tableCellsName: string[] = [
    "Dessert (100g serving)",
    "Calories",
    "Fat(g)",
    "Carbs(g)",
    "Protein(g)",
  ];
  useEffect(()=>{
    if(errors){
      enqueueSnackbar(errors, {variant: "error"})
    }
    return
  },[errors])
  return (
    <Container maxWidth="lg">
      <NutritionTable tableCellsName={tableCellsName} />
    </Container>
  );
};

export default Layout;
