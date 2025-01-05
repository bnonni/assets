import { IsLndResponse } from "./types.js";

/** Determine if object is an expected LND Object

  {
    [lnd]: <LND Object>
    [method]: <Method Name String>
    [type]: <Method Type String>
  }

  @returns
  <Is Expected LND Object Bool>
*/
export default ({ lnd, method, type }: IsLndResponse) => {
  return !!lnd && !!lnd[type] && !!lnd[type][method];
};
