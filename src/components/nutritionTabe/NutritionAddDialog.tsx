import React, { FC } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grow, Box } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { INutrition } from "../../models/nutrition.types";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import validator from "validator";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { addNewNutrition } from "../../store/ActionCreators";

interface Porps {
  isOpen: boolean;
  handleClose: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Grow ref={ref} {...props} />;
});

const NutritionAddDialog: FC<Porps> = ({ isOpen, handleClose }) => {
  const {
    control,
    formState: { isValid },
    handleSubmit,
    reset,
    getValues,
  } = useForm<INutrition>({
    mode: "onBlur",
  });
  const dispatch = useAppDispatch();
  const { onLoading: isLoading } = useAppSelector(
    (state) => state.loadingReducer
  );

  const checkAsNumber = (fieldName: keyof INutrition) => {
    return (
      validator.isDecimal(getValues(fieldName).toString()) || "Only numbers"
    );
  };

  const onSubmit: SubmitHandler<INutrition> = async (data) => {
    await dispatch(addNewNutrition(data));
    reset();
    handleClose();
  };
  const onDialogClose = () => {
    reset();
    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onDialogClose}
      fullWidth={true}
      disableEscapeKeyDown={isLoading}
      TransitionComponent={Transition}
    >
      <DialogTitle>Add new Nutrition</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          id="nutritionForm"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            m: "auto",
            maxHeight: 500,
            overflowY: "auto",
          }}
        >
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Field Dessert is required!",
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                error={!!error}
                autoFocus
                margin="dense"
                label="Dessert"
                type="text"
                fullWidth
                helperText={error?.message || null}
                variant="standard"
              />
            )}
          />
          <Controller
            name="calories"
            control={control}
            rules={{
              required: "Field Calories is required!",
              validate: () => checkAsNumber("calories"),
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                error={!!error}
                margin="dense"
                label="Calories"
                fullWidth
                helperText={error?.message || null}
                variant="standard"
              />
            )}
          />
          <Controller
            name="fat"
            control={control}
            rules={{
              required: "Field Calories is required!",
              validate: () => checkAsNumber("fat"),
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                error={!!error}
                margin="dense"
                label="Fat"
                type="text"
                fullWidth
                helperText={error?.message || null}
                variant="standard"
              />
            )}
          />
          <Controller
            name="carbs"
            control={control}
            rules={{
              required: "Field Calories is required!",
              validate: () => checkAsNumber("carbs"),
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                error={!!error}
                margin="dense"
                label="Carbs"
                type="text"
                fullWidth
                helperText={error?.message || null}
                variant="standard"
              />
            )}
          />
          <Controller
            name="protein"
            control={control}
            rules={{
              required: "Field Calories is required!",
              validate: () => checkAsNumber("protein"),
            }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                error={!!error}
                margin="dense"
                label="Protein"
                type="text"
                fullWidth
                helperText={error?.message || null}
                variant="standard"
              />
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} onClick={onDialogClose}>
          Cancel
        </Button>
        <Button
          type={"submit"}
          disabled={!isValid || isLoading}
          form={"nutritionForm"}
        >
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NutritionAddDialog;
