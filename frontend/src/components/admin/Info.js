import React from 'react'
import { Button, Typography } from '@mui/material'
import QRCode from "react-qr-code";
import useSlot from '../../utils/Slot';


const Info = ({ obj, setRefresh }) => {
  
  const { deleteSlot, loadingDelete } = useSlot()

  const handleClick = async () => {
    let response = await deleteSlot(obj.code);
    
    if (response["code"] === 200) {
      alert("Slot deleted successully.")
      setRefresh(new Date())
    }
    else {
      alert(response["data"]);
    }
  }
  
  return (
    <div style={{textAlign: 'center'}}>

        <QRCode value={obj.code.toString()} />

        <Typography variant='h4' sx={{my:2}}>{ obj.name }</Typography>
        <Typography variant='h4' sx={{my:2}}>{ obj.plate }</Typography>
        <Button variant="outlined" sx={{mt: 2}} onClick={handleClick} disabled={loadingDelete}> 
          Delete Slot 
        </Button>
    </div>
  )
}

export default Info