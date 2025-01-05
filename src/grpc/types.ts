import { EventEmitter } from 'events';
import { ClientReadableStream } from '@grpc/grpc-js';

export interface EmitSubscriptionErrorParams {
    emitter: EventEmitter;
    subscription: ClientReadableStream<any>
};

export interface ServiceTypes {
    assetwallet: string;
    mint: string;
    price_oracle: string;
    rfq: string;
    tapchannel: string;
    tapdev: string;
    universe: string;
    [index: string]: any;
};

export interface ProtoFiles {
    AssetWallet: string;
    Mint: string;
    PriceOracle: string;
    RFQ: string;
    TapChannel: string;
    TapDev: string;
    Universe: string;
    [index: string]: any;
};

export interface UnAuthParams {
    cert: string;
    path?: string;
    socket?: string;
};

export type AuthParams = UnAuthParams & { macaroon: string; };

export type PackageTypes = ProtoFiles;

export type HandleRemoveListenerParams = EmitSubscriptionErrorParams & {
    events: string[];
};