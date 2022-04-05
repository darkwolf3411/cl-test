import { FC, useEffect, useMemo, useState } from "react";
import { fetchNutritions, setPage } from "../../store/ActionCreators";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { CircularProgress, Stack } from "@mui/material";
import useInfiniteScroll from "react-infinite-scroll-hook";
import NutritionTablePanel from "./NutritionTablePanel";
import NutritionTableHeader from "./NutritionTableHeader";
import NutritionTableBody from "./NutritionTableBody";
import NutritionAddDialog from "./NutritionAddDialog";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { INutrition } from "../../models/nutrition.types";

interface MyTableProps {
  tableCellsName: string[];
}
interface IFetchParams {
  limit: number;
  page: number;
}

const NutritionTable: FC<MyTableProps> = ({ tableCellsName }) => {
  const [combinedRows, setCombinedRows] = useState<INutrition[]>([]);
  const [open, setOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { nutrition, totalCount, page } = useAppSelector(
    (state) => state.nutritionReducer
  );
  const { onLoading: isLoading } = useAppSelector(
    (state) => state.loadingReducer
  );
  const { errors } = useAppSelector((state) => state.errorsReducer);

  useEffect(() => {
    dispatch(fetchNutritions());
  }, [page]);

  useMemo(() => {
    if (page === 1) {
      setCombinedRows(nutrition);
    } else {
      setCombinedRows([...combinedRows, ...nutrition]);
    }
  }, [nutrition]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const hasNextPage = combinedRows.length !== totalCount || false;
  const onLoadMore = () => dispatch(setPage());

  const [sentryRef] = useInfiniteScroll({
    loading: isLoading || false,
    hasNextPage,
    onLoadMore,
    disabled: !!errors,
  });

  if (isLoading && nutrition.length === 0) {
    return (
      <CircularProgress
        sx={{ position: "absolute", top: "50%", right: "50%" }}
        color="primary"
      />
    );
  }

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      {combinedRows && (
        <TableContainer component={Paper}>
          <NutritionAddDialog handleClose={handleClose} isOpen={open} />
          <NutritionTablePanel handleOpen={handleOpen} />
          <Table sx={{ minWidth: 650 }} aria-label="Nutrition table">
            <NutritionTableHeader tableCellsName={tableCellsName} />
            <NutritionTableBody rows={combinedRows} sentryRef={sentryRef} />
          </Table>
        </TableContainer>
      )}
      {isLoading && (
        <CircularProgress sx={{ display: "block" }} color="primary" />
      )}
      {
        !hasNextPage && <h4>That is all</h4>
      }
    </Stack>
  );
};

export default NutritionTable;
