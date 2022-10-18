import {HttpTelevisionConfig} from './config/HttpTelevisionConfig';
import Timeout = NodeJS.Timeout;
import fetch, {Response} from 'node-fetch';
import {EventEmitter} from 'events';
import {TelevisionEvent} from './TelevisionEvent';
import {HttpAction} from './config/HttpAction';
import {RemoteKey} from './config/RemoteKey';
import {LoggerInterface} from './LoggerInterface';

/**
 * @event TelevisionEvent.TurnedOn
 * @event TelevisionEvent.TurnedOff
 * @event TelevisionEvent.ActiveChanged
 * @event TelevisionEvent.InputChanged
 */
export class HttpTelevision extends EventEmitter {
  private active = false;
  private playing = false;
  private input?: number;
  private volume = 100;
  private readonly volumeStep: number;
  private readonly maxVolume: number;

  private standByTimeout?: Timeout;

  public constructor(
    private readonly config: HttpTelevisionConfig,
    private readonly logger: LoggerInterface = console
  ) {
    super();

    this.volumeStep = config.volumeStep || 1;
    this.maxVolume = config.maxVolume || 100;
  }

  private combineUrl(action: HttpAction): string {
    let url = '';
    if (this.config.host) url = this.config.host;
    if (this.config.global && this.config.global.url) {
      if (this.config.global.url.indexOf('://') > -1)
        url = this.config.global.url;
      else url += this.config.global.url;
    }
    if (action.url) {
      if (action.url.indexOf('://') > -1) url = action.url;
      else url += action.url;
    }
    this.logger.info(url);
    return url;
  }

  private performAction(
    action: HttpAction,
    label: string,
    callback?: (result: boolean) => void
  ): void {
    this.logger.info('perform: ' + label);

    const url = this.combineUrl(action);
    const headers = this.combineHeaders(action);
    const method =
      action.method ||
      (this.config.global && this.config.global.method) ||
      'POST';
    const body: string | undefined =
      action.body || (this.config.global && this.config.global.body);
    const options = {
      method: method,
      body: body,
      headers: headers,
      timeout: action.timeout || this.config.global?.timeout,
    };

    fetch(url, options)
      .then((response: Response) => {
        const result = response.status >= 200 && response.status < 300;
        if (callback) callback(result);
      })
      .catch((err: Error) => {
        this.logger.error(err);
        if (callback) callback(false);
      });
  }

  private combineHeaders(action: HttpAction): {[key: string]: string} {
    const headers: {[key: string]: string} = {};

    if (this.config.global && this.config.global.headers) {
      for (const prop in this.config.global.headers) {
        const key = prop.toString();
        headers[key] = this.config.global.headers[prop].toString();
      }
    }

    if (action.headers) {
      for (const prop in action.headers) {
        const key = prop.toString();
        headers[key] = action.headers[prop].toString();
      }
    }

    return headers;
  }

  public isActive(): boolean {
    return this.active;
  }

  public getVolume(): number {
    return this.volume;
  }

  public getInput(): number | undefined {
    return this.input;
  }

  public powerOn(callback?: (result: boolean) => void): void {
    if (this.active) {
      if (callback) callback(true);
      return;
    }

    const cb = (result: boolean) => {
      if (result) {
        this.active = true;
        this.emit(TelevisionEvent.TurnedOn);
        this.emit(TelevisionEvent.ActiveChanged);

        if (this.config.autoStandby && this.config.autoStandby > 0) {
          if (this.standByTimeout) clearTimeout(this.standByTimeout);
          this.standByTimeout = setTimeout(
            this.handleStandbyTimeout.bind(this),
            this.config.autoStandby * 1000
          );
          this.logger.info(
            'waiting for ' +
              this.config.autoStandby +
              ' seconds to turn off due to auto standby.'
          );
        }
      }
      if (callback) callback(result);
    };

    if (this.config.actions.powerOn) {
      this.performAction(this.config.actions.powerOn, 'powerOn', cb);
    } else if (this.config.actions.powerToggle) {
      this.performAction(this.config.actions.powerToggle, 'powerToggle', cb);
    }
  }

  public powerOff(callback?: (result: boolean) => void): void {
    if (!this.active) {
      if (callback) callback(true);
      return;
    }

    const cb = (result: boolean) => {
      if (result) {
        this.active = false;
        this.emit(TelevisionEvent.TurnedOff);
        this.emit(TelevisionEvent.ActiveChanged);

        if (this.standByTimeout) clearTimeout(this.standByTimeout);
      }
      if (callback) callback(result);
    };

    if (this.config.actions.powerOff) {
      this.performAction(this.config.actions.powerOff, 'powerOff', cb);
    } else if (this.config.actions.powerToggle) {
      this.performAction(this.config.actions.powerToggle, 'powerToggle', cb);
    }
  }

  private handleStandbyTimeout(): void {
    this.logger.info('turn off due to auto standby');
    this.active = false;
    this.emit(TelevisionEvent.TurnedOff);
    this.emit(TelevisionEvent.ActiveChanged);
  }

  public togglePower(callback?: (result: boolean) => void): void {
    if (this.active) this.powerOff(callback);
    else this.powerOn(callback);
  }

  public volumeUp(callback?: (result: boolean) => void): void {
    this.pressKey('volumeUp', (result: boolean) => {
      if (result && this.volume + this.volumeStep <= this.maxVolume)
        this.volume += this.volumeStep;

      if (callback) callback(result);
    });
  }

  public volumeDown(callback?: (result: boolean) => void): void {
    this.pressKey('volumeDown', (result: boolean) => {
      if (result && this.volume - this.volumeStep >= 0)
        this.volume -= this.volumeStep;

      if (callback) callback(result);
    });
  }

  public setVolume(volume: number, callback?: (result: boolean) => void): void {
    const intervalId = setInterval(() => {
      const steps = Math.floor((this.volume - volume) / this.volumeStep);

      if (steps === 0) {
        clearInterval(intervalId);

        if (callback) callback(true);
      } else if (steps < 0) {
        this.volumeUp();
      } else if (steps > 0) {
        this.volumeDown();
      }
    }, 100);
  }

  public setInput(input: number, callback?: (result: boolean) => void): void {
    const action = this.config.actions.inputs
      ? this.config.actions.inputs[input]
      : undefined;
    if (!action) {
      this.logger.error('setInput to not configured input', input);
      if (callback) callback(false);

      return;
    }

    this.performAction(action, 'setInput', (result: boolean) => {
      this.input = input;
      this.emit(TelevisionEvent.InputChanged);

      if (callback) callback(result);
    });
  }

  public pressKey(key: RemoteKey, callback?: (result: boolean) => void): void {
    const action = this.config.actions[key];
    if (!action) {
      this.logger.error('pressKey not configured', key);
      if (callback) callback(false);

      return;
    }

    this.performAction(action, 'pressKey(' + key + ')', callback);
  }

  public up(callback?: (result: boolean) => void): void {
    this.pressKey('up', callback);
  }

  public down(callback?: (result: boolean) => void): void {
    this.pressKey('down', callback);
  }

  public left(callback?: (result: boolean) => void): void {
    this.pressKey('left', callback);
  }

  public right(callback?: (result: boolean) => void): void {
    this.pressKey('right', callback);
  }

  public select(callback?: (result: boolean) => void): void {
    this.pressKey('select', callback);
  }

  public back(callback?: (result: boolean) => void): void {
    this.pressKey('back', callback);
  }

  public exit(callback?: (result: boolean) => void): void {
    this.pressKey('exit', callback);
  }

  public info(callback?: (result: boolean) => void): void {
    this.pressKey('info', callback);
  }

  public play(callback?: (result: boolean) => void): void {
    if (this.playing) {
      if (callback) callback(true);
      return;
    }

    const cb = (result: boolean) => {
      if (result) this.playing = true;
      if (callback) callback(result);
    };

    if (this.config.actions.play) {
      this.performAction(this.config.actions.play, 'play', cb);
    } else if (this.config.actions.playPause) {
      this.performAction(this.config.actions.playPause, 'playPause', cb);
    }
  }

  public pause(callback?: (result: boolean) => void): void {
    if (!this.playing) {
      if (callback) callback(true);
      return;
    }

    const cb = (result: boolean) => {
      if (result) this.playing = false;
      if (callback) callback(result);
    };

    if (this.config.actions.pause) {
      this.performAction(this.config.actions.pause, 'pause', cb);
    } else if (this.config.actions.playPause) {
      this.performAction(this.config.actions.playPause, 'playPause', cb);
    }
  }

  public playPause(callback?: (result: boolean) => void): void {
    if (this.playing) this.pause(callback);
    else this.play(callback);
  }
}
