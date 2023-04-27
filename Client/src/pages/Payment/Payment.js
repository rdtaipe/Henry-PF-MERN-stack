import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material';

export default function Payment(props) {
    const { res } = useParams();


    return (
        <Box textAlign="center">
            <Typography variant="h4" gutterBottom>
                Pago exitoso
            </Typography>
            <Typography variant="body1">
                ¡Gracias por tu compra!
            </Typography>
        </Box>
    )
}



