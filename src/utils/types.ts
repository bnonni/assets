export interface IReturnResultArgs {
    reject: (arg: any) => any;
    resolve: (arg?: any) => any;
    of: string | number;
}

export type CallbackFunction = (arg0?: any, arg1?: any) => any;