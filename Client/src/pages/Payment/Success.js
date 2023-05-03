import React from 'react'
import {Link} from 'react-router-dom'
import { Box, Typography ,Button} from '@mui/material';


export default function Success(props) {
    

    return (

        <Box  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', textAlign: "center" }}>
            <Typography variant="h4" component="h4" gutterBottom>
                Thank you for your purchase!
            </Typography>
            <Typography variant="h6" component="h6" gutterBottom>
                Your order is being processed
            </Typography>
            <Link to="/home">
                <Button variant="contained" color="success" sx={{ mt: 2 }}>
                    Go to Home
                </Button>
            </Link>
        </Box>

        
    )
}
