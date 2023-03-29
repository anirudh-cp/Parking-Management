import { useState } from 'react';
import { Box, Paper } from '@mui/material';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import BookmarkIcon from '@mui/icons-material/Bookmark';
import DriveEtaIcon from '@mui/icons-material/DriveEta';

import Onsite from '../components/user/Onsite';
import Prebooking from '../components/user/Prebooking';


export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);



  return (
    <Box >

      {value === 0 ? <Onsite /> : <Prebooking />}

      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={5}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction label="Onsite" icon={<DriveEtaIcon />} />
          <BottomNavigationAction label="Prebook" icon={<BookmarkIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}