import React from 'react'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function PaginationComponent({spacing,count,page,onChange,setPage}) {
    

    return (
        <div className='relative flex justify-center'>
            <Stack spacing={spacing?spacing:2} >
                <Pagination count={count?count:10} onChange={(e)=>{
                    if(onChange){
                        onChange(e)
                    }
                    if(setPage){
                        setPage(Number(e.target.textContent))
                    }
                    
                }}/>
            </Stack>
        </div>
    )
}
