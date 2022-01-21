import { makeStyles } from '@mui/styles';

const drawerWidth = 240;

const useStyles = makeStyles(() => ({
  chatSideBanner: {
    height: '100vh',
    padding: '1rem 1rem',
    width: drawerWidth,
  },
  userPanel: {
    paddingBottom: '2rem',
  },
  userText: {
    fontWeight: 700,
    paddingLeft: '1rem',
    fontSize: 16,
  },
  chatTitle: {
    fontWeight: 700,
    fontSize: 20,
    padding: '1rem 0',
  },
  chatSummaryContainer: { overflowY: 'auto', marginTop: '1rem' },
  newChatBtn: {
    margin: '1rem 0',
  },
  noChatToSelectText: {
    margin: '1rem 0',
  },
}));

export default useStyles;
