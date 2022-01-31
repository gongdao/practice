export interface iProfile {
  user: string;
  firstname: string;
  lastname: string;
  description: string;
  availability: string;
  telephone: string;
  address: string;
  imgurl: string;
  create_date: string;
  modify_date: string;
}

export interface GetProfileApiData {
  profile?: iProfile;
  error?: { message: string };
}
