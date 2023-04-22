import React from 'react'
import Rating from './Rating'
export default function Comments({ data }) {
    return (data &&

        <div key={data._id}>
            <div className="relative flex flex-col min-w-0 break-words w-full mb-1 rounded-[4px]">
                <div className="relative px-2 py-2 flex-auto">
                    <div className="relative w-full h-[40px] mb-1">

                        <div className="absolute left-0 flex items-center">
                            <img src={data.picture} alt="avatar" className="w-8 h-8 rounded-full mr-2" />
                            <span className="text-ms text-gray-500 ml-1">{data.name}</span>
                        </div>
                        <div className="absolute right-0">
                            {new Date(data.date).toLocaleDateString()}
                        </div>
                    </div>
                    <Rating value={data.score} size={"small"} disabled={true} className="mb-1"/>

                    <div className="relative w-full mb-2 pl-1">
                        {data.body}
                    </div>
                </div>
            </div>



        </div>
    )
}
