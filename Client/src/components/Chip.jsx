import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ComponentChip({key,label,onChange,selected,onClick,className}) {
  return (
    <Stack key={key} direction="row" spacing={2} className={className}>
      <Chip label={label} component="a" 
        clickable
        color={selected ? "primary" : "default"}
        onClick={onClick}
        onChange={onChange}
        />
    </Stack>
  );
}