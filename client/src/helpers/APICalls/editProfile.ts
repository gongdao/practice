import { FetchOptions } from '../../interface/FetchOptions';
import { iProfile } from '../../interface/Profile';

const editProfile = async (profile: iProfile): Promise<iProfile> => {
  const fetchOptions: FetchOptions = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profile),
    credentials: 'include',
  };
  return await fetch(`/profile/mid/` + profile.user, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default editProfile;
