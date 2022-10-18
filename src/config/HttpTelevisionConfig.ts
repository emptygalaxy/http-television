import { HttpAction } from "./HttpAction";
import { HttpTelevisionActions } from "./HttpTelevisionActions";

export interface HttpTelevisionConfig {
  /**
   * Name of the television
   * @type string
   */
  name: string;

  /**
   * Default host
   * @type string
   */
  host?: string;

  /**
   * Auto standby time (in seconds)
   * @type number
   */
  autoStandby?: number;

  /**
   * Steps by which to increase the volume
   * @type number
   */
  volumeStep?: number;

  /**
   * Maximum volume
   * @type number
   */
  maxVolume?: number;

  /**
   * Default settings for each action
   * @type HttpAction
   */
  global?: HttpAction;

  /**
   * Specific configuration for each action
   * @type HttpTelevisionActions
   */
  actions: HttpTelevisionActions;
}

