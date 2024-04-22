export interface StatesResponse {
  count: number;
  next: null;
  previous: null;
  results: State[];
}

export interface State {
  id: number;
  name: string;
  country: number;
  state_place_id: string;
  decentro_code: number | null;
  gst_code: string[];
}
