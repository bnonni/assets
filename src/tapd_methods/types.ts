import { Tapd } from "../tapd_grpc/types.js";

export interface NewAddrRequest {
    asset_id: string;
    amount: number;
    tapd: Tapd;
    options?: {
        script_key?: string;
        internal_key?: string;
        tapscript_sibling?: string;
        proof_courier_addr?: string;
        asset_version?: string;
        address_version?: string;
    };
}