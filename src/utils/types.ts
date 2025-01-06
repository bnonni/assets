export interface IReturnResultArgs {
    reject: (arg: any) => any;
    resolve: (arg?: any) => any;
    of: any;
    cbk: Callback;
}

export type Callback = (err?: Error | null | undefined, result?: any) => void;