export interface Alert {
  id: string;
  msg: string;
  alertType: string;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean | null;
  loading: boolean | null;
  user: null;
}

export interface AlertState {
  alerts: Alert[] | null;
}
