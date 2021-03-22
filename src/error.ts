/**
 * Error class
 * @memberof BaaS
 * @public
 */
export default class CurveError extends Error {
  public readonly code: number;
  public readonly message: string;

  constructor(code: number, message?: string) {
    super(message);

    this.code = code;
    this.message = `${code}. ${message || this.mapCodeToMessage(code)}.`;
  }

  mapCodeToMessage(code: number): string {
    switch (code) {
      case 600:
        return 'Parameter type is incorrect';
      case 601:
        return 'Required parameter is missing';
      case 602:
        return 'Connection refused';
      case 603:
        return 'Cloud functions cannot be invoked in Node environment';
      case 604:
        return 'Request failed';
      default:
        return 'Unknown error';
    }
  }
}
