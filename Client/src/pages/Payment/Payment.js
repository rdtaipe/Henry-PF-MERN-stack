import React from 'react'
import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material';

import Success from './Success';
import Failure from './Failure';
import Pending from './Pending';

const status = {
    success: <Success />,
    failure: <Failure />,
    pending: <Pending />
}

export default function Payment(props) {
    const { res } = useParams();


    return (
        <Box  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
                {status[res]}
           
        </Box>
    )
}



