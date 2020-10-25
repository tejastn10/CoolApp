export interface Alert {
  id: string;
  msg: string;
  alertType: string;
}

export interface AlertState {
  alerts: Alert[] | null;
}
