import React, { Fragment } from 'react'
import { Card, Typography, Chip, Button } from '@mui/material'
import TransitionsModal from '../common/Modal'
import { useState } from 'react'
import Info from './Info'


const Tile = ({ obj }) => {

    const { code, driver } = obj;
    const [open, setOpen] = useState(false);

    const getColor = (data) => {
        if (data !== null)
            return "success"
        else
            return "error"
    }

    const getString = (data) => {
        if (data !== null)
            return "Filled"
        else
            return "Empty"
    }

    return (
        <Fragment>

            <TransitionsModal open={open} setOpen={setOpen}
                childElement={<Info obj={obj}/>} />

            <Card sx={{
                borderLeft: 5, borderColor: getColor(driver) + '.main',
                display: 'inline-flex', width: '100%', justifyContent: 'space-between', my: 1
            }}
                style={{ 'cursor': 'pointer' }}
                onClick={() => { setOpen(true) }}
            >
                <Typography variant="h6" sx={{ m: 2, fontWeight: 500 }}>{code}</Typography>
            </Card>
        </Fragment>
    )
}

export default Tile