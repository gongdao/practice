import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: 0,
  },
  label: {
    color: 'rgb(0,0,0,0.0)',
    paddingLeft: '5px',
  },
  inputs: {
    marginTop: '.8rem',
    height: '2rem',
    padding: '5px',
  },
  forgot: {
    paddingRight: 10,
    color: '#3a8dff',
  },
  submit: {
    padding: 10,
    width: 120,
    height: 40,
    borderRadius: 0,
    fontSize: 16,
    backgroundColor: '#3a8dff',
  },
}));

export default useStyles;
