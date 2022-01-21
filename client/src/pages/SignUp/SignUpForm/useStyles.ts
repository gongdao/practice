import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  form: {
    width: '100%', // Fix IE 11 issue.
  },
  label: {
    color: 'rgb(0,0,0,0.0)',
    paddingLeft: '5px',
  },
  staticLabel: {
    color: 'rgb(0,0,0,0.9)',
    paddingLeft: '5px',
  },
  inputs: {
    marginTop: '1rem',
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
    fontSize: 14,
    backgroundColor: '#3a8dff',
    fontWeight: 'bold',
  },
}));

export default useStyles;
