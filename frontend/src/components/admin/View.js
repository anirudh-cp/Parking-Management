import React from 'react'
import Tile from './Tile'
import { Box } from '@mui/system'

const View = () => {
  return (
    <Box sx={{m:3}}>
        <Tile obj={{code: "120", "driver": "ABCD"}}/>
    </Box>
  )
}

export default View