import { TableCell, TableHead, TableRow } from "@mui/material";
import React, {FC} from "react";

type Props = {
    tableCellsName: string[];
}

const NutritionTableHeader:FC<Props> = ({tableCellsName}) => {
  return (
    <TableHead>
      <TableRow>
        {tableCellsName.map((cellName, index) =>
          index === 0 ? (
            <TableCell key={cellName}>{cellName}</TableCell>
          ) : (
            <TableCell key={cellName} align="right">
              {cellName}
            </TableCell>
          )
        )}
      </TableRow>
    </TableHead>
  );
};

export default NutritionTableHeader;
