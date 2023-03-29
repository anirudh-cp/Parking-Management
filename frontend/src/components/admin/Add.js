import React, { useState } from 'react'
import { TextField, Box, Typography, Button } from '@mui/material'

const Add = () => {

  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(value)
  };

  const handleClick = () => {
    console.log('value '+ value);
  }


  return (
    <Box sx={{ alignItems: "center", textAlign: "center", my: 5, px: 3 }}>

      <Typography variant="h4" sx={{ my: 2, mb: 4 }}> Generate Slots</Typography>

      <TextField
        id="outlined-number"
        label="Number of Slots to Create"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        value={value}
        onChange={handleChange}
      />

      <Button variant="contained" sx={{ my: 5 }} onClick={handleClick}> Create New Slots</Button>


    </Box>
  )
}

export default Add