import React, { Fragment, useState } from 'react'

import { Box, Paper, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import QrReader from 'react-qr-scanner'


const Input = ({ data, setData, action, setAction}) => {


    const handleChange = (event) => {
        setAction(event.target.value);
        console.log(action)
    };

    const handleScan = (data) => {
        if (data !== null){
        
            setData(data)
        }
        console.log(data)
        
    }

    const handleError = (err) => {
        console.error(err)
    }

    const previewStyle = {
        width: "90vw",
    }

    return (
        <Fragment>
            <Box sx={{ my: 5, px: 3 }}>
                <FormControl fullWidth >
                    <InputLabel id="demo-simple-select-label">Select Action... </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={action}
                        label="Age"
                        onChange={handleChange}
                    >
                        <MenuItem value={"checkin"}>Check-In</MenuItem>
                        <MenuItem value={"checkout"}>Check-out</MenuItem>
                        <MenuItem value={"confirm"}>Confirm Prebooking</MenuItem>
                    </Select>
                </FormControl>
            </Box>


            <Box sx={{ alignItems: "center", textAlign: "center" }}>
                {action !== "" ?
                    <QrReader
                        delay={100}
                        style={previewStyle}
                        onError={handleError}
                        onScan={handleScan}
                    />
                    :
                    <Typography variant='h6' gutterBottom sx={{ m: 2 }}> Please provide permissions and select an action to Scan QR</Typography>
                }
            </Box>

        </Fragment>
    )
}

export default Input