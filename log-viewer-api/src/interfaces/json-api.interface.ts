export interface JSONAPIData {
  type: string;
  id: number;
  attributes?: Object;
  relationships?: Object;
}

export interface JSONAPIResult {
  data: JSONAPIData[],
  errors?: Object[],
  meta: Object
}