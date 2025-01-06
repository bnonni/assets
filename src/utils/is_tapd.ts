import { IsTapdResponse } from "../tapd_grpc/types.js";

/** Determine if object is an expected LND Object

  {
    [lnd]: <LND Object>
    [method]: <Method Name String>
    [type]: <Method Type String>
  }

  @returns
  <Is Expected LND Object Bool>
*/
export default ({ tapd, method, type }: IsTapdResponse) => {
  return !!tapd && !!tapd[type] && !!tapd[type][method];
};