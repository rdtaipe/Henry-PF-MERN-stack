import * as React from 'react';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

export default function SimpleBadge({origin, color, counter, children}) {
  const newOrigin= origin || {
    vertical: 'top',
    horizontal: 'right',
  }
  const newColor = color || 'secondary'
  const badgeContent = counter || 0
  const newChildren = children || <MailIcon color="action" />
  return (
    <Badge badgeContent={badgeContent} color={newColor} anchorOrigin={newOrigin}>
      
      {newChildren}
    </Badge>
  );
}