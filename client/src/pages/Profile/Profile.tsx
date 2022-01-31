import { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Typography, Grid, Box, Avatar, Button } from '@mui/material';
import { Navbar } from '../../components/Navbar/Navbar';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuBar from '../../components/ProfileMenu/MenuBar';
import getProfile from '../../helpers/APICalls/getProfile';
import { iProfile } from '../../interface/Profile';

export default function Profile(): JSX.Element {
  const { loggedInUser } = useAuth();
  const [data, setData] = useState<iProfile>();
  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      if (loggedInUser) {
        const response = await getProfile({ userId: loggedInUser.id });
        setData(response);
      }
    };
    getData();
  }, [loggedInUser]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    // loading for a split seconds until history.push works
    return <CircularProgress />;
  }

  return (
    <>
      <Navbar />
      <Grid container sx={{ border: '1px solid #fff', mx: 'auto', mt: 2 }}>
        <Grid item xs={2.2} sx={{ mr: -5 }}>
          <MenuBar loggedInUser={loggedInUser} active="Profile" />
        </Grid>
        <Grid item xs={8} sx={{ borderLeft: '1px solid #fff', mt: -5 }}>
          {data && (
            <Grid item display="flex" flexDirection="column" alignItems="center">
              <Avatar
                alt="user photo"
                src={`https://robohash.org/${loggedInUser.email}.png`}
                sx={{ width: 86, height: 86, my: 3 }}
              />

              <Typography variant="body1">
                First Name: <strong>{data.firstname} </strong>
              </Typography>
              <Typography variant="body1">
                Last Name: <strong>{data.lastname} </strong>
              </Typography>
              <Typography variant="body1">
                Description: <strong>{data.description} </strong>
              </Typography>
              <Typography variant="body1">
                Availability: <strong>{data.availability} </strong>
              </Typography>
              <Typography variant="body1">
                Telephone: <strong>{data.telephone} </strong>
              </Typography>
              <Typography variant="body1">
                Address: <strong>{data.address} </strong>
              </Typography>
              <Typography variant="body1">
                Create Date: <strong>{data.create_date} </strong>
              </Typography>
              <Typography variant="body1">
                Modify Date: <strong>{data.modify_date} </strong>
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
}
