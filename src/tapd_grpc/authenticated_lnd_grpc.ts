import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import {
  defaultSocket,
  grpcSslCipherSuites,
  packageTypes,
  protoFiles,
  protosDir,
  serviceTypes
} from '../grpc/index.js';
import { AuthParams } from '../grpc/types.js';
import apiForProto from './api_for_proto.js';
import grpcCredentials from './grpc_credentials.js';
import { LND } from './types.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const GRPC_SSL_CIPHER_SUITES = process.env.GRPC_SSL_CIPHER_SUITES;
const pathForProto = (proto: string) => join(__dirname, protosDir, proto);

/**
 * Initiate a gRPC API Methods Object for authenticated methods
 * Both the cert and macaroon expect the entire serialized LND generated file
 * {
    [cert]: <Base64 or Hex Serialized LND TLS Cert>
    [macaroon]: <Base64 or Hex Serialized Macaroon String>
    [path]: <Path to Proto Files Directory String>
    [socket]: <Host:Port Network Address String>
  }

  @throws
  <Error>

  @returns
  {
    lnd: {
      autopilot: <Autopilot API Methods Object>
      chain: <ChainNotifier API Methods Object>
      default: <Default API Methods Object>
      invoices: <Invoices API Methods Object>
      peers: <Peers API Methods Object>
      router: <Router API Methods Object>
      signer: <Signer Methods API Object>
      tower_client: <Watchtower Client Methods Object>
      tower_server: <Watchtower Server Methods API Object>
      wallet: <WalletKit gRPC Methods API Object>
      version: <Version Methods API Object>
    }
  }
*/

export default ({ cert, macaroon, path, socket }: AuthParams): { lnd: LND } => {
  const { credentials } = grpcCredentials({ cert, macaroon });
  const lndSocket = socket || defaultSocket;

  if (!!cert && GRPC_SSL_CIPHER_SUITES !== grpcSslCipherSuites) {
    process.env.GRPC_SSL_CIPHER_SUITES = grpcSslCipherSuites;
  }

  const params = {
    'grpc.max_receive_message_length': -1,
    'grpc.max_send_message_length': -1,
  };

  // Assemble different services from their proto files
  return {
    lnd: Object.keys(serviceTypes).reduce((services: any, type: string): any => {
      const service = serviceTypes[type];
      const file = protoFiles[service];

      services[type] = apiForProto({
        credentials,
        params,
        service,
        path: !!path ? join(path, file) : pathForProto(file),
        socket: lndSocket,
        type: packageTypes[service],
      });

      return services;
    }, {} as any),
  };
};
