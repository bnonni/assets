import grpc from '@grpc/grpc-js';
import decodeSerialized from './decode_serialized.js';


/** Get SSL for gRPC

  {
    [cert]: <Cert Hex or Base64 String>
  }

  @returns
  {
    ssl: <SSL gRPC Object>
  }
*/
export default ({ cert }: { cert: string }): { ssl: grpc.ChannelCredentials } => {
  return {
    ssl: grpc.credentials.createSsl(
      decodeSerialized({ serialized: cert }).decoded
    )
  };
};
