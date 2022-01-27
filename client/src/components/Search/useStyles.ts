import { makeStyles } from '@mui/styles';

const drawerWidth = 240;

const useStyles = makeStyles(() => ({
  search: {
    position: 'relative',
    backgroundColor: '#E9EEF9',
    marginLeft: 0,
    height: '50px',
    lineHeight: '18px',
    width: `calc(${drawerWidth} - 2rem)`,
  },
  searchRoot: {
    color: 'inherit',
    width: '100%',
    height: '100%',
    padding: '0 0.5rem',
  },
  searchInput: {
    // vertical padding + font size from searchIcon
    width: '100%',
    fontWeight: 600,
  },
  searchIcon: {
    height: '100%',
    position: 'absolute',
    right: 15,
    pointerEvents: 'none',
  },
}));

export default useStyles;
