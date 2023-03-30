import { useEffect, useState, forwardRef } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';

import useHeaderVisiblityStore from '../storages/HeaderVisibility';
import CustomTheme from '../assets/themes/CustomTheme'

import { useNavigate } from "react-router-dom";
import useDriver from '../utils/Driver';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



export default function SignIn() {

    const navigate = useNavigate();
    const { driverAdd, loading } = useDriver();

    const [error, setError] = useState(false);
    const [message, setMessage] = useState("");

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setError(false);
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let response = await driverAdd(data.get('name'), data.get('plate'))

        if (response["code"] === 200 || response['code'] === 201) {
            navigate("/dash");
        }
        else {
            setError(true);
            setMessage(JSON.stringify(response["data"]));
        }
    };

    const { setHideUserOptions } = useHeaderVisiblityStore();

    useEffect(() => {
        setHideUserOptions(true);
    }, [setHideUserOptions])


    return (
        <ThemeProvider theme={CustomTheme}>

            <Container style={{ display: "flex", flexDirection: "column", }}>
                <Container component="main" maxWidth="xs"
                    sx={{ backgroundColor: "rgba(240,240,240,0.15)", marginTop: 5, borderRadius: "15px" }}
                >
                    <CssBaseline />

                    <Snackbar open={error} autoHideDuration={3000} onClose={handleClose}>
                        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                            <> {message} </>
                        </Alert>
                    </Snackbar>

                    <Snackbar open={loading} autoHideDuration={3000}>
                        <Alert severity="info" sx={{ width: '100%' }}>
                            Signing In...
                        </Alert>
                    </Snackbar>

                    <Box
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>

                        <Typography component="h1" variant="h3" sx={{ pt: 1, pb: 2 }}>
                            Contactless, Quick and Efficient
                        </Typography>

                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                type="text"
                                autoFocus />

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="plate"
                                label="Number Plate"
                                type="text"
                                id="plate" />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}>
                                Sign In
                            </Button>
                          </Box>
                    </Box>
                </Container>
            </Container>
        </ThemeProvider>
    );
}