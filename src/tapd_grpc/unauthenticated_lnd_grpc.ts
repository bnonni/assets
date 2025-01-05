import { join } from 'path';
import grpc from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { defaultSocket } from './../grpc/index.js';
import grpcOptions from './grpc_options.js';
import grpcSsl from './grpc_ssl.js';
import { grpcSslCipherSuites } from './../grpc/index.js';
import { packageTypes } from './../grpc/index.js';
import { protoFiles } from './../grpc/index.js';
import { protosDir } from './../grpc/index.js';
import { unauthenticatedServiceTypes } from './../grpc/index.js';
import { LND } from './types.js';
import { UnAuthParams } from '../grpc/types.js';

const GRPC_SSL_CIPHER_SUITES = process.env.GRPC_SSL_CIPHER_SUITES;
const pathToProto = (file: string) => join(__dirname, protosDir, file);

/** Unauthenticated gRPC interface to the Lightning Network Daemon (lnd).

  Make sure to provide a cert when using LND with its default self-signed cert

  {
    [cert]: <Base64 or Hex Serialized LND TLS Cert String>
    [path]: <Path to Proto Files Directory String>
    [socket]: <Host:Port String>
  }

  @throws
  <Error>

  @returns
  {
    lnd: {
      status: <Status LND API Object>
      unlocker: <Unlocker LND API Object>
    }
  }
*/
export default ({ cert, path, socket }: UnAuthParams): { lnd: LND } => {
  const credentials = grpcSsl({ cert }).ssl;
  const lndSocket = socket || defaultSocket;

  if (!!cert && GRPC_SSL_CIPHER_SUITES !== grpcSslCipherSuites) {
    process.env.GRPC_SSL_CIPHER_SUITES = grpcSslCipherSuites;
  }

  // Assemble different services from their proto files
  return {
    lnd: Object.keys(unauthenticatedServiceTypes).reduce((services, type) => {
      const service = unauthenticatedServiceTypes[type];

      const file = protoFiles[service];

      const protoPath = !!path ? join(path, file) : pathToProto(file);

      const rpc = grpc.loadPackageDefinition(loadSync(protoPath, grpcOptions));

      services[type] = new rpc[packageTypes[service]][service](
        lndSocket,
        credentials
      );

      return services;
    },
      {}),
  };
};
