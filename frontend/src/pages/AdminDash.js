import { useState } from 'react';
import { Box, Paper } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import ViewListIcon from '@mui/icons-material/ViewList';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import Add from '../components/admin/Add';
import View from '../components/admin/View';

export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);

  return (
    <Box >

      {value === 0 ? <View /> : <Add />}

      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={5}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="View" icon={<ViewListIcon />} />
          <BottomNavigationAction label="Add" icon={<AddCircleOutlineIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}