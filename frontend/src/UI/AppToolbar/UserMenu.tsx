import React, {useState} from 'react';
import {Button, Grid, Menu, MenuItem} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import {User} from '../../types';
import {useAppDispatch} from '../../app/hooks';
import {logout} from '../../features/User/usersThunks';
import AddIcon from '@mui/icons-material/Add';
import {useNavigate} from 'react-router-dom';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isOpen= Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Grid item>
      <Button onClick={handleClick} color="inherit">
        Hello, {user.displayName}!
      </Button>
      <Menu open={isOpen} anchorEl={anchorEl} onClose={handleClose} keepMounted>
        <MenuItem onClick={() => navigate('/products/new-product')}>
          <AddIcon sx={{mr: 2}} />
          Add new item
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <RestoreIcon sx={{mr: 2}} />
          Log out
        </MenuItem>
      </Menu>
    </Grid>
  );
};

export default UserMenu;