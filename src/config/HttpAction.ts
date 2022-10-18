export interface HttpAction {
  /**
   * URL to call for specific action
   * @type string
   */
  url?: string;

  /**
   * HTTP method to use
   * @type string
   */
  method?: 'GET'|'POST'|'PATCH'|'PUT'|'DELETE';

  /**
   * Key-value object with headers
   * @type object
   */
  headers?: { [key: string]: string };

  /**
   * Body for post/patch/put
   * @type string
   */
  body?: string;

  /**
   * Timeout to wait before cancelling call
   * @type number
   */
  timeout?: number;
}