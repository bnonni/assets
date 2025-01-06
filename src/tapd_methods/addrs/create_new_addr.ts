import { auto } from 'async';
import { returnResult } from '../../utils/asyncjs_util.js';
import isTapd from '../../utils/is_tapd.js';
// import { Tapd } from '../../tapd_grpc/types.js';
import TapdError from '../../utils/tapd_error.js';
import { Callback } from '../../utils/types.js';
import { NewAddrRequest } from '../types.js';

const connectFailMessage = '14 UNAVAILABLE: Connect Failed';
const method = 'newAddr';
const type = 'default';

/** Create a new address from the set of request params.

 * @param {Object} createNewAddrParams; {@link NewAddrRequest}
  {
    asset_id: <Asset Id to Create Receive Address For String>
    amount: <Amount of Asset to Create Address For Number>
    tapd: <Authenticated TAPD API Object>
    options: <Options Object>
  }

  @returns via cbk or Promise
  {
    encoded:  string;
    asset_id:  string;
    asset_type:  string;
    amount:  string;
    group_key:  string;
    script_key:  string;
    internal_key:  string;
    tapscript_sibling:  string;
    taproot_output_key:  string;
    proof_courier_addr:  string;
    asset_version:  string;
    address_version:  string;
  }
*/
interface Addr {
    encoded: string;
    asset_id: string;
    asset_type: string;
    amount: string;
    group_key: string;
    script_key: string;
    internal_key: string;
    tapscript_sibling: string;
    taproot_output_key: string;
    proof_courier_addr: string;
    asset_version: string;
    address_version: string;
}

export default ({ asset_id, amount, tapd, options }: NewAddrRequest, cbk: Callback) => {
    return new Promise((resolve, reject) => {
        return auto({
            // Check arguments
            validate: cbk => {
                if (!asset_id) {
                    return cbk(new TapdError([400, 'ExpectedAssetId']));
                }

                if (!amount) {
                    return cbk(new TapdError([400, 'ExpectedAmount']));
                }

                if (!isTapd({ tapd, method, type })) {
                    return cbk(new TapdError([400, 'ExpectedTapdForAddressCreation']));
                }

                // TODO: Add options checks

                return cbk();
            },

            // Create new addr
            createAddr: ['validate', ({ asset_id, amount, tapd, options }, cbk) => {
                return tapd.default.newAddress({ asset_id, amount, ...options },
                    (err: Error, res: Addr) => {
                        if (!!err && err.message === connectFailMessage) {
                            return cbk(new TapdError([503, 'FailedToConnectToDaemonToCreateChainAddress']));
                        }

                        if (!!err) {
                            return cbk(err);
                        }

                        if (!res) {
                            return cbk(new TapdError([503, 'ExpectedResponseForAddressCreation']));
                        }

                        // TODO: Add more checks to response

                        return cbk(null, res);
                    });
            }],
        }, returnResult({ reject, resolve, of: 'createAddr', cbk }));
    });
};
