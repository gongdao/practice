import { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { useHistory } from 'react-router-dom';
import { CircularProgress, Typography, Grid, Box, Avatar, Button, TextField } from '@mui/material';
import { Navbar } from '../../components/Navbar/Navbar';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuBar from '../../components/ProfileMenu/MenuBar';
import getProfile from '../../helpers/APICalls/getProfile';
import editProfile from '../../helpers/APICalls/editProfile';
import createProfile from '../../helpers/APICalls/createProfile';
import { iProfile } from '../../interface/Profile';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function EditProfile(): JSX.Element {
  const { loggedInUser } = useAuth();
  const [data, setData] = useState<iProfile>();
  const [status, setStatus] = useState('');
  const history = useHistory();

  interface input {
    firstname: string;
    lastname: string;
    description: string;
    availability: string;
    telephone: string;
    address: string;
    imgurl: string;
    create_date: string;
  }

  useEffect(() => {
    const getData = async () => {
      if (loggedInUser) {
        try {
          const response = await getProfile({ userId: loggedInUser.id });
          setData(response);
        } catch (ex) {
          console.clear();
        }
      }
    };
    getData();
  }, [loggedInUser]);

  if (loggedInUser === undefined) return <CircularProgress />;
  if (!loggedInUser) {
    history.push('/login');
    return <CircularProgress />;
  }

  const handleSubmit = (values: input) => {
    const ip = {
      user: loggedInUser.id,
      firstname: values.firstname,
      lastname: values.lastname,
      description: values.description,
      availability: values.availability,
      telephone: values.telephone,
      address: values.address,
      imgurl: values.imgurl,
      create_date: data ? data.create_date : Date.now().toString(),
      modify_date: Date.now().toString(),
    };
    const modify = async () => {
      await editProfile(ip);
      history.push('/profile');
    };
    const create = async () => {
      await createProfile(ip);
      history.push('/profile');
    };
    if (data?.user === undefined) {
      create();
    } else {
      modify();
    }
  };
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      return;
    }

    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    const response = await fetch('http://localhost:3001/profile/upload/', {
      mode: 'no-cors',
      credentials: 'include',
      method: 'POST',
      body: formData,
    });
    if (response) setStatus(response.statusText);
    console.log(status);
  };

  const handleDelete = async () => {
    const response = await fetch('http://localhost:3001/profile/delete/', {
      mode: 'no-cors',
      credentials: 'include',
      method: 'post',
    });
    if (response) setStatus(response.statusText);
    console.log(status);
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        firstname: data ? data.firstname : '',
        lastname: data ? data.lastname : '',
        description: data ? data.description : '',
        availability: data ? data?.availability : '',
        telephone: data ? data?.telephone : '',
        address: data ? data.address : '',
        imgurl: data ? data?.imgurl : '',
        create_date: data ? data?.create_date : '',
      }}
      validationSchema={Yup.object().shape({
        firstname: Yup.string().required('First name is required'),
        lastname: Yup.string().required('Last name is required'),
        description: Yup.string().required('Description is required'),
        telephone: Yup.string().required('Telephone is required'),
      })}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit, handleChange, values, touched, errors, isSubmitting }) => (
        <form onSubmit={handleSubmit} noValidate>
          <Navbar />
          <Grid container sx={{ border: '1px solid #fff', mx: 'auto', mt: 2 }}>
            <Grid item xs={2.2} sx={{ mr: -5 }}>
              <MenuBar loggedInUser={loggedInUser} active="Edit profile" />
            </Grid>
            <Grid item xs={8} sx={{ borderLeft: '1px solid #fff', mt: -5 }}>
              {data && (
                <Grid item display="flex" flexDirection="column" alignItems="center">
                  <Avatar
                    alt="user photo"
                    //src={`https://robohash.org/${loggedInUser.email}.png`}
                    src={`http://localhost:3001/upload?id=${loggedInUser.id}`}
                    sx={{ width: 86, height: 86, my: 3 }}
                  />
                  <Typography variant="body1" sx={{ display: 'none' }}>
                    Image URL:{values.imgurl}
                  </Typography>
                  <Box sx={{ marginTop: 1 }}>
                    <Button
                      variant="contained"
                      component="label"
                      sx={{
                        color: '#ff0000',
                        background: '#ffffff',
                        border: 'solid red 1px',
                        width: '320',
                        height: '56',
                      }}
                    >
                      {'Upload a file from your device'}
                      <input type="file" hidden onChange={handleFileChange} placeholder="Choose a file to upload.." />
                    </Button>
                  </Box>
                  <Grid
                    item
                    display="flex"
                    flexDirection="row"
                    sx={{ marginTop: 2, cursor: 'pointer' }}
                    onClick={handleDelete}
                  >
                    <DeleteIcon />
                    <Typography variant="body1">Delete photo</Typography>
                  </Grid>
                  <TextField
                    id="firstname"
                    sx={{ width: 300, height: 35 }}
                    label={<Typography>First Name</Typography>}
                    fullWidth
                    size="small"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="firstname"
                    autoComplete="firstname"
                    placeholder={'Your first name'}
                    autoFocus
                    helperText={touched.firstname ? errors.firstname : ''}
                    error={touched.firstname && Boolean(errors.firstname)}
                    value={values.firstname}
                    onChange={handleChange}
                  />

                  <TextField
                    id="lastname"
                    sx={{ width: 300, height: 35 }}
                    label={<Typography>Last Name</Typography>}
                    fullWidth
                    size="small"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="lastname"
                    autoComplete="lastname"
                    placeholder={'Your last name'}
                    autoFocus
                    helperText={touched.lastname ? errors.lastname : ''}
                    error={touched.lastname && Boolean(errors.lastname)}
                    value={values.lastname}
                    onChange={handleChange}
                  />
                  <TextField
                    id="description"
                    sx={{ width: 300, height: 35 }}
                    label={<Typography>Description</Typography>}
                    fullWidth
                    size="small"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="description"
                    autoComplete="description"
                    placeholder={'Your description'}
                    autoFocus
                    helperText={touched.description ? errors.description : ''}
                    error={touched.description && Boolean(errors.description)}
                    value={values.description}
                    onChange={handleChange}
                  />
                  <TextField
                    id="availability"
                    sx={{ width: 300, height: 35 }}
                    label={<Typography>Availability</Typography>}
                    fullWidth
                    size="small"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="availability"
                    autoComplete="availability"
                    placeholder={'Your availability'}
                    autoFocus
                    helperText={touched.availability ? errors.availability : ''}
                    error={touched.availability && Boolean(errors.availability)}
                    value={values.availability}
                    onChange={handleChange}
                  />
                  <TextField
                    id="telephone"
                    sx={{ width: 300, height: 35 }}
                    label={<Typography>Telephone</Typography>}
                    fullWidth
                    size="small"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="telephone"
                    autoComplete="telephone"
                    placeholder={'Your telephone'}
                    autoFocus
                    helperText={touched.telephone ? errors.telephone : ''}
                    error={touched.telephone && Boolean(errors.telephone)}
                    value={values.telephone}
                    onChange={handleChange}
                  />
                  <TextField
                    id="address"
                    sx={{ width: 300, height: 35 }}
                    label={<Typography>Address</Typography>}
                    fullWidth
                    size="small"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="address"
                    autoComplete="address"
                    placeholder={'Your address'}
                    autoFocus
                    helperText={touched.address ? errors.address : ''}
                    error={touched.address && Boolean(errors.address)}
                    value={values.address}
                    onChange={handleChange}
                  />
                  <TextField
                    id="create_date"
                    sx={{ width: 300, height: 35 }}
                    label={<Typography>Create Date</Typography>}
                    fullWidth
                    size="small"
                    margin="normal"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    name="create_date"
                    autoComplete="create_date"
                    placeholder={'Your create date'}
                    autoFocus
                    helperText={touched.create_date ? errors.create_date : ''}
                    error={touched.create_date && Boolean(errors.create_date)}
                    value={values.create_date}
                    onChange={handleChange}
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
          <Box textAlign="center">
            <Button
              type="submit"
              size="large"
              variant="contained"
              sx={{
                width: 500,
                mx: 'auto',
                mt: 2,
                background: 'white',
                border: '1.2px solid rgba(255, 0, 0, 0.8)',
                color: '#f00',
              }}
            >
              {isSubmitting ? <CircularProgress style={{ color: 'white' }} /> : 'Save'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}
