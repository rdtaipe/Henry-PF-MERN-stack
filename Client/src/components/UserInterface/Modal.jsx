import React from 'react';
import Chip from '@mui/material/Chip';

{/* <Chip label={label} component="a" 
clickable
color={selected ? "primary" : "default"}
onClick={onClick}
onChange={onChange}
/>
</Stack> */}

function Modal({ onClose, onLogout }) {
    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-30 flex justify-center items-center">
            <div className="bg-white shadow-xl rounded-lg p-8">
                <p className="mb-4">Are you sure you want to leave?</p>
                <div className="flex justify-end">
                    <Chip
                        label="Yes"
                        color="default"
                        onClick={onLogout}
                        style={{ marginRight: 8, width: "55px" }}
                    />

                    <Chip
                        label="No"
                        color="primary"
                        onClick={onClose}
                        style={{ marginRight: 8, width: "55px"}}
                    />
                </div>
            </div>
        </div>
    );
  }

export default Modal
  