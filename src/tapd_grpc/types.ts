import { GrpcObject, ServiceClientConstructor } from '@grpc/grpc-js';
import { ProtobufTypeDefinition } from '@grpc/proto-loader';

export interface ApiForProtoParams {
    credentials: any;
    params: any;
    path: string;
    service: string;
    socket: string;
    type: string;
};

export type GrpcObjectExt = GrpcObject & { [index: string]: any };

export type ApiObject =
    | GrpcObject
    | ServiceClientConstructor
    | ProtobufTypeDefinition;

export interface LND {
    assetwallet: any;
    mint: any;
    price_oracle: any;
    rfq: any;
    tapchannel: any;
    tapdev: any;
    universe: any;
}

export type IsLndResponse = {
    lnd: LND;
    method: string;
    type:
    | 'assetwallet'
    | 'mint'
    | 'price_oracle'
    | 'rfq'
    | 'tapchannel'
    | 'tapdev'
    | 'universe'
}