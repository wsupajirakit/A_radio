/** Error thrown for any failed API call (HTTP, envelope, network or timeout). */
export default class ApiError extends Error {
  /**
   * @param {string} code    snake_case code from the envelope, or a client code
   * @param {string} message English description
   * @param {number} [status] HTTP status (0 when no response)
   */
  constructor(code, message, status = 0) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }
}
