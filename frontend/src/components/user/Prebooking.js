import { Button, Typography, Box } from '@mui/material'
import React, { Fragment } from 'react'

const Prebooking = () => {
    return (
        <Fragment>

            <Box sx={{ alignItems: "center", textAlign: "center", my: 5, px: 3 }}>
                <Button variant="contained" sx={{my: 5}}> Enquire Vacant Parking Lots</Button>

                <Typography variant="h5" sx={{my: 2}}> Slot Found : 102</Typography>
                <Typography variant="h6"> Go to "Onsite -> Confirm Prebooking" to confirm slot.</Typography>

            </Box>

        </Fragment>
    )
}

export default Prebooking