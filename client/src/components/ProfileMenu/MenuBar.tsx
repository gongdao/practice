import { useHistory } from 'react-router-dom';
import { Box, CircularProgress, Grid, MenuItem, MenuList } from '@mui/material';
import { User } from '../../interface/User';

interface Props {
  loggedInUser: User;
  active: string;
}
const MenuBar = ({ loggedInUser, active }: Props): JSX.Element => {
  const history = useHistory();
  const menuItems = [
    { id: 1, name: 'Profile', to: 'profile' },
    { id: 2, name: 'Edit profile', to: 'editProfile' },
    { id: 3, name: 'Availability', to: 'availability' },
    { id: 4, name: 'Payment', to: 'payment' },
    { id: 5, name: 'Security', to: 'security' },
    { id: 6, name: 'Settings', to: 'settings' },
  ];

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  const createMenu = () => {
    const menu = [];
    for (let i = 0; i < menuItems.length; i++) {
      if (active === menuItems[i].name) {
        menu.push(
          <MenuItem key={menuItems[i].id} onClick={() => history.push(`/${menuItems[i].to}`)}>
            <Box sx={{ fontWeight: 700 }}>{menuItems[i].name}</Box>
          </MenuItem>,
        );
      } else {
        menu.push(
          <MenuItem key={menuItems[i].id} onClick={() => history.push(`/${menuItems[i].to}`)}>
            {menuItems[i].name}
          </MenuItem>,
        );
      }
    }
    return menu;
  };

  return (
    <Grid item xs={10} container justifyContent="flex-end" sx={{ border: '1px solid #fff' }}>
      <MenuList>{createMenu()}</MenuList>
    </Grid>
  );
};

export default MenuBar;
