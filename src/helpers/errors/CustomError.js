export default class CustomError extends Error {
    constructor(message, statusCode = 200, customCode) {
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.customCode = customCode;
    }
}