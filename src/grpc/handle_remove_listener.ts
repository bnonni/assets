import { HandleRemoveListenerParams } from "./types.js";
import { sumOf } from "../utils/generic.js";

/**
 * Get a function that emits an error from a gRPC subscription proxy
 * 
 * @param {Object} handleRemoveListenerParams; {@link EmitSubscriptionErrorParams}
 * {
 *  emitter: <EventEmitter Subscription Proxy Object>
 *  events: [<Event Name String>]
 *  subscription: <gRPC Subscription Object>
 * }
 *
 * @returns {void}
*/

export default ({ emitter, events, subscription }: HandleRemoveListenerParams): void => {
  // Cancel the subscription when all listeners are removed
  emitter.on('removeListener', () => {
    const counts = events.map(n => emitter.listenerCount(n));

    // Exit early when there are still active listeners
    if (!!sumOf(counts)) {
      return;
    }

    subscription.cancel();

    return;
  });
};
