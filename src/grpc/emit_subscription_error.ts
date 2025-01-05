import { EmitSubscriptionErrorParams } from "./types.js";

/**
 * Get a function that emits an error from a gRPC subscription proxy
 * 
 * @param {Object} emitSubscriptionErrorParams; {@link EmitSubscriptionErrorParams}
 * {
 *  emitter: <Event Subscription Proxy Object>
 *  subscription: <gRPC Subscription Object>
 * }
 * 
 * @returns {Object} An event emitter that emits an error
*/
export default ({ emitter, subscription }: EmitSubscriptionErrorParams): object => {
  return (err: { details: string; }) => {
    subscription.cancel();

    if (!!err && err.details === 'Cancelled on client') {
      subscription.removeAllListeners();
    }

    // Exit early when there are no error listeners
    if (!emitter.listenerCount('error')) {
      return;
    }

    return emitter.emit('error', err);
  };
};
