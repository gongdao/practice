import { iProfile } from '../../interface/Profile';
import { FetchOptions } from '../../interface/FetchOptions';
interface Props {
  userId: string;
}

const getProfile = async ({ userId }: Props): Promise<iProfile> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/profile/mid/` + userId, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default getProfile;
