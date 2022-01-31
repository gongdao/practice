import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';

interface Props {
  linkTo: string;
  asideText: string;
  btnText: string;
}

const AuthFooter = ({ linkTo, asideText, btnText }: Props): JSX.Element => {
  const classes = useStyles();

  return (
    <Box padding={1} display="flex" justifyContent="center" className={classes.authHeader}>
      <Typography className={classes.accAside} variant="subtitle2" sx={{ mr: -4 }}>
        {asideText}
      </Typography>
      <Button
        component={Link}
        to={linkTo}
        color="inherit"
        sx={{ color: '#f11', paddingLeft: 0, textIndent: -35 }}
        className={classes.accBtn}
      >
        {btnText}
      </Button>
    </Box>
  );
};

export default AuthFooter;
