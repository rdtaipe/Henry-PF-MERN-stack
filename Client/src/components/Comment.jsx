import React from 'react'
import Rating from './Rating'
import { Tooltip, IconButton, Menu, MenuItem, Typography, Avatar,Divider } from "@mui/material";

export default function Comments({ data,options }) {
    return (data &&
        <div key={data._id}>
            <Divider/> 

            <div className="relative flex flex-col min-w-0 break-words w-full mb-1 rounded-[4px]">
                <div className="relative px-2 py-2 flex-auto">
                    <div className="relative w-full h-[40px] mb-1">

                        <div className="absolute left-0 flex items-center">
                            <Avatar alt={data.name} src={data.picture} sx={{width:30,height:30}} />
                            <span className="text-ms text-gray-500 ml-1">{data.name}</span>
                        </div>
                        <div className="absolute right-0 flex items-center">
                            {new Date(data.date).toLocaleDateString()}
                        </div>
                    </div>
                    <Rating value={data.score} size={"small"} disabled={true} className="mb-1"/>

                    <div className="relative w-full mb-2 pl-1">
                        {data.body}
                        <div className="absolute top-0 right-0 flex items-center">
                            {options}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
