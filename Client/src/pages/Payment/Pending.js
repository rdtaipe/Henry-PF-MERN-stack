import React from 'react'
import { Link } from 'react-router-dom'
import { Box, Typography, Button } from '@mui/material';

export default function Pending(props) {

    return (

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: "center" }}>
            <Typography variant="h4" component="h4" gutterBottom>
                Your payment is being processed
            </Typography>
            <Typography variant="h6" component="h6" gutterBottom>
                Please wait
            </Typography>
            <Link to="/home">
                <Button variant="contained" color="warning" sx={{ mt: 2 }}>
                    Go to Home
                </Button>
            </Link>
        </Box>

    )
}
