import { HttpAction } from "./HttpAction";

export interface HttpInputAction extends HttpAction {
  /**
   * Name of the television input
   * @type string
   * @example "HDMI 1", "HDMI 2", "USB"
   */
  label: string;

  /**
   * Type of the input
   * @type string
   * @example "HDMI", "USB"
   */
  type?: string;
}