import React, { Fragment } from 'react'
import { Card, Typography, Chip, Button } from '@mui/material'
import TransitionsModal from '../common/Modal'
import { useState } from 'react'
import Info from './Info'


const Tile = ({ obj, setRefresh }) => {

    const { code, plate } = obj;
    const [open, setOpen] = useState(false);

    const getColor = (data) => {
        console.log(data)
        if (data !== null)
            return "success"
        else
            return "error"
    }

    return (
        <Fragment>

            <TransitionsModal open={open} setOpen={setOpen}
                childElement={<Info obj={obj} setRefresh={setRefresh}/>} />

            <Card sx={{
                borderLeft: 5, borderColor: getColor(plate) + '.main',
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