import { iProfile } from './Profile';

export interface ProfileApiDataSuccess {
  message: string;
  profile: iProfile;
}

export interface ProfileApiData {
  error?: { message: string };
  success?: ProfileApiDataSuccess;
}
