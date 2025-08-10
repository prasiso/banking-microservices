interface Banking {
  id_banking: number;
  agency: string;
  account: string;
  id_client: number | null;
}

export interface BodyQueueUpdateClient {
  id_client: number;
  name: string;
  email: string;
  address: string;
  profile_picture: string | null;
  created_at: string;
  updated_at: string;
  id_banking: number;
  banking: Banking;
}
