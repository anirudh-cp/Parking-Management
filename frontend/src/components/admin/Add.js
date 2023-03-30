import React, { useState } from 'react'
import { TextField, Box, Typography, Button } from '@mui/material'
import useSlot from "./../../utils/Slot"

const Add = () => {

  const [value, setValue] = useState(0);

  const { createSlots, loadingAdd } = useSlot();

  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(value)
  };

  const handleClick = async () => {
    console.log('value ' + parseInt(value));

    let response = await createSlots(parseInt(value));

    if (response["code"] === 201) {
      alert("New slots created successfully.")
    }
    else {
      alert(response["data"]);
    }
  }


  return (
    <Box sx={{ alignItems: "center", textAlign: "center", my: 5, px: 3 }}>

      <Typography variant="h4" sx={{ my: 2, mb: 4 }}> Generate Slots</Typography>

      <Box>
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
      </Box>

      <Button variant="contained" sx={{ my: 5 }} onClick={handleClick} disabled={loadingAdd}>
        Create New Slots
      </Button>

    </Box>
  )
}

export default Add