export default class GeneralErrorResponse extends Error {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly validationMessages: string[];

  constructor(
    message: string,
    statusCode: number,
    validationMessages: string[] = [],
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.validationMessages = validationMessages;
    //garante que o nome da classe seja exibida no log
    this.name = 'GeneralErrorResponse';
    //captura o local onde o erro ocorreu
    Error.captureStackTrace(this, this.constructor);
  }
}
