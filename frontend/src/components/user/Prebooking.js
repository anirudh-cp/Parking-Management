import { Button, Typography, Box } from '@mui/material'
import React, { Fragment, useState } from 'react'
import useSlot from '../../utils/Slot';
import useBook from '../../utils/Book';
import useUserStore from '../../storages/AuthStore';


const Prebooking = () => {

    const { getSlot, loading } = useSlot();
    const { checkIn, loadingBook } = useBook();
    const { plate } = useUserStore();

    const [slot, setSlot] = useState(null);

    const handleEnquire = async () => {
        let response = await getSlot();

        if (response["code"] === 200) {
            setSlot(response['data']['code'])
        }
        else {
            alert(response["data"]);
            setSlot(-1)
        }
    }

    const handlePreBook = async () => {
        
        let response = await checkIn(slot, plate, "prebook");

        if (response["code"] === 201) {
            alert("Prebooking confirmed! Upon reaching the venue be sure to confirm prebooking check-in.");
        }
        else {
            alert(response["data"]);
        }
    }



    return (
        <Fragment>

            <Box sx={{ alignItems: "center", textAlign: "center", my: 5, px: 3 }}>
                <Button variant="contained" sx={{ my: 5 }} disabled={loading} onClick={handleEnquire}>
                    Enquire Vacant Parking Lots
                </Button>
                {
                    slot !== null &&
                    <>
                        {
                            (slot !== -1) ?
                                <Fragment>
                                    <Typography variant="h5" sx={{ mt: 5, mb: 2 }}> Slot Found : {slot}</Typography>
                                    <Box>
                                        <Button variant="contained" sx={{ my: 1 }} disabled={loadingBook} onClick={handlePreBook}> 
                                            Confirm Slot Booking
                                        </Button>
                                    </Box>
                                </Fragment>
                                :
                                <Fragment>
                                    <Typography variant='h5' sx={{ mt: 2 }}> No Slots Available at the Moment </Typography>
                                </Fragment>
                        }
                    </>
                }
            </Box>

        </Fragment>
    )
}

export default Prebooking