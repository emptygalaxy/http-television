export interface HttpAction {
    url?: string;
    method?: string;
    headers?: {[key: string]: string};
    body?: string;
}

export interface HttpInputAction extends HttpAction {
    label: string;
    type?: string;
}

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

export interface HttpTelevisionConfig {
    name: string;
    host?: string;

    autoStandby?: number;

    volumeStep?: number;
    maxVolume?: number;

    global?: HttpAction;
    actions: HttpTelevisionActions;
}

export type RemoteKey = 'volumeUp'|'volumeDown'|'left'|'right'|'up'|'down'|'playPause'|'select'|'back'|'info'|'exit'|'rewind'|'forward';