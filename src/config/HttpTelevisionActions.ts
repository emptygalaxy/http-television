import { HttpAction } from "./HttpAction";
import { HttpInputAction } from "./HttpInputAction";

export interface HttpTelevisionActions {
  powerToggle?: HttpAction;
  powerOn?: HttpAction;
  powerOff?: HttpAction;

  volumeUp?: HttpAction;
  volumeDown?: HttpAction;

  up?: HttpAction;
  down?: HttpAction;
  left?: HttpAction;
  right?: HttpAction;

  play?: HttpAction;
  pause?: HttpAction;
  playPause?: HttpAction;

  rewind?: HttpAction;
  forward?: HttpAction;

  select?: HttpAction;
  back?: HttpAction;
  info?: HttpAction;
  exit?: HttpAction;

  inputs?: HttpInputAction[];
}