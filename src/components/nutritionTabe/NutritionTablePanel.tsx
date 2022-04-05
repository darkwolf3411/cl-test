import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material'
import AddIcon from "@mui/icons-material/Add";
import React, {FC} from 'react'

type Props = {
    handleOpen: ()=> void
}

const NutritionTablePanel:FC<Props> = ({handleOpen}) => {
  return (
    <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
            }}
          >
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Nutrition
            </Typography>
            <Tooltip title="Add item">
              <IconButton>
                <AddIcon onClick={() => handleOpen()} />
              </IconButton>
            </Tooltip>
          </Toolbar>
  )
}

export default NutritionTablePanel