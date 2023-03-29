import React from 'react'
import { Button, Typography } from '@mui/material'
import QRCode from "react-qr-code";


const Info = ({ obj }) => {
  return (
    <div style={{textAlign: 'center'}}>

        <QRCode value={obj.code} />

        <Typography variant='h4' sx={{my:2}}>{ obj.name }</Typography>
        <Typography variant='h4' sx={{my:2}}>{ obj.plate }</Typography>
        <Button variant="outlined"> Delete Slot </Button>
    </div>
  )
}

export default Info