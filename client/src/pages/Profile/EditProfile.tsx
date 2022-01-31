import { useEffect } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Typography, Grid, Box, Avatar, Button } from '@mui/material';
import { Navbar } from '../../components/Navbar/Navbar';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuBar from '../../components/ProfileMenu/MenuBar';

export default function EditProfile(): JSX.Element {
  const { loggedInUser } = useAuth();
  const history = useHistory();

  useEffect(() => {
    console.log('edit profile');
  }, []);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    return <CircularProgress />;
  }

  return (
    <>
      <Navbar />
      <Grid container sx={{ border: '1px solid #fff', mx: 'auto', mt: 2 }}>
        <Grid item xs={2.2} sx={{ mr: -5 }}>
          <MenuBar loggedInUser={loggedInUser} active="Edit profile" />
        </Grid>
        <Grid item xs={8} sx={{ borderLeft: '1px solid #fff' }}>
          <Grid item display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h4" sx={{ mt: 1 }}>
              Edit Profile
            </Typography>
            <Avatar
              alt="user photo"
              src={`https://robohash.org/${loggedInUser.email}.png`}
              //src={`http://localhost:3001/upload/img01.png`}
              sx={{ width: 86, height: 86, my: 3 }}
            />
            <Typography variant="body1">Be sure to use photo that clearly show your face</Typography>
            <Box sx={{ marginTop: 3 }}>
              <Button
                type="submit"
                size="large"
                sx={{ color: '#ff0000', border: 'solid red 1px', width: '320', height: '56' }}
              >
                {'Upload a file from your device'}
              </Button>
            </Box>
            <Grid item display="flex" flexDirection="row" style={{ marginTop: 26 }}>
              <DeleteIcon />
              <Typography variant="body1">Delete photo</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
