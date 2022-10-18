export enum TelevisionEvent {
  /**
   * Event when television was turned on
   */
  TurnedOn = 'turned on',

  /**
   * Event when television was turned off
   */
  TurnedOff = 'turned off',

  /**
   * Event when television has been turned on and/or off
   */
  ActiveChanged = 'active changed',

  /**
   * Event when television input has been changed
   */
  InputChanged = 'input changed',
}
