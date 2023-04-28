import React from 'react'
import {Link} from 'react-router-dom'
import { Box, Typography ,Button} from '@mui/material';

export default function Failure(props) {
    

    return (

        <Box  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Typography variant="h4" component="h4" gutterBottom>
                Sorry, your payment was not successful
            </Typography>
            <Typography variant="h6" component="h6" gutterBottom>
                Please try again
            </Typography>
            <Link to="/home">
                <Button variant="contained" color="error" sx={{ mt: 2 }}>
                    Go to Home
                </Button>
            </Link>
        </Box>
    )
}
