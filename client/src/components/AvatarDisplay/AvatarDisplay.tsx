import Avatar from '@mui/material/Avatar';
import { User } from '../../interface/User';

interface Props {
  loggedIn: boolean;
  user: User;
}

const AvatarDisplay = ({ user }: Props): JSX.Element => {
  return <Avatar alt="Profile Image" src={`http://localhost:3001/upload?id=${user.id}`} />;
};

export default AvatarDisplay;
