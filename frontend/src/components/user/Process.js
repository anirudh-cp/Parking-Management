import { Button, Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import useBook from '../../utils/Book';
import useUserStore from '../../storages/AuthStore';


const Process = ({ data, action, resetData }) => {

    const { checkIn, confirm, checkout, loadingBook } = useBook();
    const { plate } = useUserStore();

    const [message, setMessage] = useState("Processing Request...")

    useEffect(() => {

        async function fetchData() {

            console.log(action)

            let response = "";
            if (action === "checkin") {
                response = await checkIn(data, plate, action);
            }
            else if (action === "confirm") {
                response = await confirm(data, plate, action);
            }
            else {
                response = await checkout(data);
            }

            if (response['code'] >= 200) {
                setMessage({
                    "checkin": "Check-in ", "confirm": "Prebooking Confirmation ",
                    "checkout": "Checkout "
                }[action] + " was completed successfully!")
            }
            else{
                setMessage(response['data']);
            }
        }
        fetchData();
    }, [])


    return (
        <Box sx={{ my: 5, px: 3 }}>
            <Typography variant="h5" sx={{ mt: 5, mb: 2 }}> {message} </Typography>
            <Box>
                <Button variant="contained" sx={{ my: 1 }} disabled={loadingBook} onClick={resetData}>
                    Go Back
                </Button>
            </Box>
        </Box>
    )
}

export default Process