import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material'
const pos = {
    center: "text-center",
    left: "text-left",
    right: "text-right"
}
function Modal({type, title, message, onTrue, onFalse, onClose, position }) {
    position = position ? pos[position] : "text-center"
    type=type?type:"negative"

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-30 flex justify-center items-center ">

            <div className="relative bg-white shadow-xl rounded-[4px] p-4 min-w-[310px]">
                {/* onClose */}
                <div className="absolute w-[100%] h-[34px] flex justify-end left-0 top-0 ">
                    {onClose &&

                        <Chip variant="contained" color="error" size="small" onClick={onClose} label={<CloseIcon style={{ fontSize: "16px" }} />} style={{ width: 32, height: 32, borderRadius:"0 4px 0 0" }} />

                    }
                </div>
                {title && <p className={`text-2xl font-bold mb-2 ${position} text-gray-900`}>{title}</p>}

                <p className={`text-ml mb-4 ${position} text-gray-700`}>{message}</p>
                {(onFalse || onTrue) && <div className="relative w-full h-[40px] flex rounded-lg">
                    <div className="absolute bottom-0 right-0">
                        <Stack direction={`${type==="negative"?"row":"row-reverse"}`} spacing={1}>
                            {onTrue && <Chip
                                label="Yes"
                                color={type==="negative"?"default":"primary"}
                                onClick={onTrue}
                                style={{ width: "55px" }}
                                clickable
                            />}

                            {onFalse && <Chip
                                label="No"
                                color={type==="negative"?"primary":"default"}
                                onClick={onFalse}
                                style={{ width: "55px" }}
                                clickable
                            />
                            }
                        </Stack>
                    </div>
                </div>
                }
            </div>
        </div>
    );
}

export default Modal
