export default class TapdError extends Error {
    code: number;
    constructor([code, message]: [number, string]) {
        super(message);
        this.name = 'TapdError';
        this.code = code;
    }
}