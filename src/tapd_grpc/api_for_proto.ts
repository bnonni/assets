import grpc from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import grpcOptions from './grpc_options.js';
import { ApiForProtoParams, ApiObject, GrpcObjectExt } from './types.js';

/**
 * Get an api for a proto file
 * 
 * @param {Object} apiForProtoParams; {@link ApiForProtoParams}
 * {
 *  path: <Proto File Path String>
 *  service: <Service Name String>
 *  type: <RPC Type String>
 * }
 * 
 * @returns <API Object>
*/

export default ({ credentials, params, path, service, socket, type }: ApiForProtoParams): ApiObject => {
  const rpc: GrpcObjectExt = grpc.loadPackageDefinition(loadSync(path, grpcOptions));
  return new rpc[type][service](socket, credentials, params);
};
