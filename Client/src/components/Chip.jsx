import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ComponentChip({key,label,onChange,selected,onClick}) {
  return (
    <Stack key={key} direction="row" spacing={2}>
      <Chip label={label} component="a" 
        href="#chip"
        clickable
        color={selected ? "primary" : "default"}
        onClick={onClick}
        onChange={onChange}
        />
    </Stack>
  );
}