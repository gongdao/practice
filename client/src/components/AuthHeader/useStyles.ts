import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  authHeader: {
    marginLeft: 50,
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  accAside: {
    color: '#303030',
    padding: '1rem',
    marginRight: -20,
  },
  accBtn: {
    width: 100,
    height: 0,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#ffffff',
  },
}));

export default useStyles;
