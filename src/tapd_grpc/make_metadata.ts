import { Metadata } from '@grpc/grpc-js';
// const grpc = require('grpc');

/** Make metadata

  {
    macaroon: <Macaroon Buffer Object>
  }

  @returns
  {
    metadata: <Metadata Object>
  }
*/
export default ({ macaroon }: { macaroon: string }): { metadata: Metadata } => {
  const metadata = new Metadata();
  metadata.add('macaroon', macaroon);
  return { metadata };
};
