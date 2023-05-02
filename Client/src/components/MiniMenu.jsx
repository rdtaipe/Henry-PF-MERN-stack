import * as React from 'react';
import Button from '@mui/joy/Button';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import Apps from '@mui/icons-material/Apps';
import IconButton from '@mui/joy/IconButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListDivider from '@mui/joy/ListDivider';
import MoreVert from '@mui/icons-material/MoreVert';
import Edit from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';


const menuTest = [
  {
    close: false,
    onClick: () => { console.log("1") },
    icon: <Edit />,
    text: "Edit post"
  }, {
    close: false,
    onClick: () => { console.log("2") },
    text: "Draft post",
    props: { disabled: true },
    divider: true,
  }, {
    close: false,
    onClick: () => { console.log("2") },
    icon: <DeleteForever />,
    text: "Delete",
    props: { disabled: true, variant: "soft", color: "danger" },
  },
]

export default function SelectedMenu({id, iconAtributes, menuAtributes, icon, menu }) {

  var newIcon = icon ? icon : <MoreVert />
  var newMenu = menu ? menu : menuTest

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        id="positioned-demo-button"
        aria-controls={open ? 'positioned-demo-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="outlined"
        color="neutral"
        onClick={handleClick}
        {...iconAtributes}
      >
        {newIcon}
      </IconButton>
      <Menu
        id="positioned-demo-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        aria-labelledby="positioned-demo-button"
        placement="bottom-end"
        {...menuAtributes}
      >
        {newMenu.map((item) => {
          item.id=id?id:null
          return (<>
            <MenuItem onClick={(e) => { item.close ? null: handleClose(e) ; item.onClick ? item.onClick(e, item) : null }} {...item.props}>
              <ListItemDecorator sx={{ color: 'inherit' }}>
                {item.icon ? item.icon : null}
              </ListItemDecorator>{' '}
              {item.text ? item.text : null}
            </MenuItem>
            {item.divider ? <ListDivider /> : null}
          </>
          )
        })}
      </Menu>
    </div>
  );
}