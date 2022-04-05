import { TableBody, TableCell, TableRow } from "@mui/material";
import React, { FC } from "react";
import { INutrition } from "../../models/nutrition.types";

type Props = {
  rows: INutrition[];
  sentryRef: any;
};

const NutritionTableBody: FC<Props> = ({ rows, sentryRef }) => {
  return (
    <TableBody>
      {rows.map((row, index) => (
        <TableRow
          ref={index === rows.length - 10 ? sentryRef : null}
          key={row.id}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell align="right">{row.calories}</TableCell>
          <TableCell align="right">{row.fat}</TableCell>
          <TableCell align="right">{row.carbs}</TableCell>
          <TableCell align="right">{row.protein}</TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default NutritionTableBody;
