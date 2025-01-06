import { CallbackFunction, IReturnResultArgs } from "./types.js";

/** Return a specific result of an async/auto process

  Omit a cbk and specify reject/resolve if using a Promise

  {
    [of]: <Property String>
    [reject]: <Promise Reject Function>
    [resolve]: <Promise Resolve Function>
  }
  [cbk]: <Callback Function>

  @returns
  <Function> (err, res) => {}
*/
export const returnResult = ({ reject, resolve, of }: IReturnResultArgs, cbk: CallbackFunction) => {
    if (!cbk && !(!!reject && !!resolve)) {
        throw new Error('ExpectedCbkOrPromiseFunctionsToReturnResult');
    }

    return (err: null | undefined, res: { [x: string]: undefined; }) => {
        if (!!err) {
            return !cbk ? reject(err) : cbk(err);
        }

        if (!!of) {
            return !cbk ? resolve(res[of]) : cbk(null, res[of]);
        }

        return !cbk ? resolve() : cbk();
    };
};
