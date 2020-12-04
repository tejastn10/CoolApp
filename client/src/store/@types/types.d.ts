export interface Alert {
  id: string;
  msg: string;
  alertType: string;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean | null;
  loading: boolean | null;
  user: null | User;
}

export interface AlertState {
  alerts: Alert[] | null;
}

export interface ProfileState {
  profile: null;
  profiles: [];
  loading: boolean;
  error: any;
}

interface User {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  date: Date;
}
