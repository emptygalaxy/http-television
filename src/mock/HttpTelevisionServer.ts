import {Request, Response} from 'express';

export enum Input {
  HDMI,
  USB,
}

export class HttpTelevisionServer {
  private active = false;
  private inputs = [Input.HDMI, Input.USB];
  private playing = false;
  private input?: number;
  private volume = 100;
  private readonly volumeStep: number = 5;
  private readonly maxVolume: number = 100;

  public isActive() {
    return this.active;
  }

  public isPlaying() {
    return this.playing;
  }

  public getVolume() {
    return this.volume;
  }

  public getInput() {
    return this.input;
  }

  public powerOn() {
    this.active = true;
    console.log('active:', this.active);
  }
  public powerOff() {
    this.active = false;
    console.log('active:', this.active);
  }
  public togglePower() {
    this.active ? this.powerOff() : this.powerOn();
  }

  public volumeUp() {
    this.volume = Math.min(this.maxVolume, this.volume + this.volumeStep);
    console.log('volume', this.volume);
  }

  public volumeDown() {
    this.volume = Math.max(0, this.volume - this.volumeStep);
    console.log('volume', this.volume);
  }

  public setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(this.maxVolume, volume));
    console.log('volume', this.volume);
  }

  public setInput(input: number) {
    if (input > 0 && input < this.inputs.length) this.input = input;
    console.log('input', input);
  }

  public up() {
    console.log('up');
  }
  public down() {
    console.log('down');
  }
  public left() {
    console.log('left');
  }
  public right() {
    console.log('right');
  }
  public select() {
    console.log('select');
  }
  public back() {
    console.log('back');
  }
  public exit() {
    console.log('exit');
  }
  public info() {
    console.log('info');
  }
  public play() {
    this.playing = true;
    console.log('play');
  }
  public pause() {
    this.playing = false;
    console.log('pause');
  }
  public playPause() {
    this.playing ? this.pause() : this.play();
  }

  public handlePost(req: Request, res: Response) {
    if (!req.body && !req.body.timings) return res.send('Invalid request');

    const timings: string = req.body.timings;
    if (
      timings ===
      '9008,4462,600,516,600,514,592,1642,594,522,596,520,598,518,600,516,602,514,592,1642,592,1642,594,1642,594,1640,594,520,596,520,650,466,600,516,592,1644,592,522,594,1640,596,1640,596,520,596,1638,598,518,598,1636,600,516,602,1634,592,524,594,522,648,1588,596,518,598,1636,598,518,600'
    )
      this.togglePower();
    else if (
      timings ===
      '9006,4462,600,516,602,540,576,1632,592,522,596,520,596,520,598,518,600,516,602,1634,602,1632,604,1632,594,1642,594,522,596,520,598,518,600,516,600,514,602,1632,592,524,594,520,596,520,598,518,600,516,602,514,592,1642,594,522,596,1640,596,1640,596,1638,596,1638,598,1638,598,1638,598'
    )
      this.volumeUp();
    else if (
      timings ===
      '9008,4462,600,516,592,524,594,1640,594,522,596,520,598,518,600,516,602,514,594,1642,594,1640,596,1640,596,1640,596,520,596,518,600,516,600,514,592,1642,594,1642,594,522,596,520,598,518,598,516,602,514,592,522,594,522,596,520,598,1636,598,1636,600,1636,600,1636,600,1634,602,1634,602'
    )
      this.volumeDown();
    else if (
      timings ===
      '9002,4468,594,520,596,520,598,1638,598,516,600,516,592,522,594,522,596,520,598,1638,598,1636,598,1638,598,1636,600,516,652,464,592,522,594,520,598,518,598,518,600,516,602,514,656,460,594,520,596,1638,598,518,600,1636,600,1636,600,1634,600,1634,602,1634,602,1632,592,524,594,1642,596'
    )
      this.up();
    else if (
      timings ===
      '9002,4466,596,518,598,518,600,1636,600,514,592,524,594,522,596,520,648,468,600,1638,596,1636,600,1636,600,1634,600,514,592,524,594,522,596,520,598,1638,598,516,600,516,602,514,592,524,594,520,596,1638,598,518,598,516,652,1582,592,1644,592,1644,592,1642,592,1642,594,522,596,1640,596'
    )
      this.down();
    else if (
      timings ===
      '9002,4468,594,522,596,520,598,1638,598,516,600,514,602,514,594,522,594,520,596,1638,598,1638,598,1638,598,1636,598,518,600,516,590,524,594,522,594,1640,596,1638,596,1638,598,518,598,518,600,514,592,522,594,522,594,520,598,518,600,516,600,1634,592,1644,592,1644,592,1642,594,1642,594'
    )
      this.left();
    else if (
      timings ===
      '9006,4462,600,516,592,524,594,1642,594,522,596,520,598,518,600,516,652,464,654,1580,592,1642,594,1640,594,1640,596,520,648,468,650,466,600,516,592,524,592,1642,594,1640,594,522,596,518,598,518,600,516,602,514,592,1642,594,522,596,520,598,1638,598,1638,598,1636,598,1636,600,1636,600'
    )
      this.right();
    else if (
      timings ===
      '9002,4468,594,522,596,520,596,1638,598,518,600,516,600,516,592,524,594,520,596,1638,598,1638,596,1638,598,1638,598,518,600,516,654,462,654,460,596,520,598,518,598,516,600,516,592,1644,592,1642,592,522,596,1640,594,1640,596,1640,596,1638,596,1638,598,518,600,516,602,1634,592,524,594'
    )
      this.play();
    else if (
      timings ===
      '9004,4464,598,516,600,514,602,1634,592,524,594,520,596,520,650,466,650,464,602,1634,590,1644,592,1642,592,1642,594,522,596,520,598,518,598,516,602,514,592,1644,592,522,596,1640,594,1640,596,1640,596,518,598,1636,600,1636,600,516,602,1634,602,514,594,522,596,520,598,1638,598,518,600'
    )
      this.pause();
    else if (
      timings ===
      '9006,4464,598,518,600,516,602,1632,592,524,646,470,646,470,596,518,600,516,602,1634,602,1632,592,1642,594,1642,594,522,596,520,598,518,598,516,652,464,592,522,594,1640,596,520,648,468,598,518,600,1634,600,514,592,1644,592,1642,592,522,648,1588,594,1640,596,1638,598,518,598,1636,600'
    )
      this.select();
    else if (
      timings ===
      '9006,4462,600,516,602,514,592,1642,594,522,596,520,598,518,650,466,652,462,592,1642,592,1642,594,1642,594,1640,596,520,598,518,598,516,600,516,602,514,654,462,646,470,596,1640,596,518,600,1636,600,516,602,514,594,1642,594,1642,594,1642,594,522,596,1640,596,520,598,1636,598,1636,600'
    )
      this.back();
    else if (
      timings ===
      '9006,4462,600,516,602,514,592,1642,594,522,596,520,598,518,650,466,652,462,592,1642,592,1642,594,1642,594,1640,596,520,598,518,598,516,600,516,602,514,654,462,646,470,596,1640,596,518,600,1636,600,516,602,514,594,1642,594,1642,594,1642,594,522,596,1640,596,520,598,1636,598,1636,600'
    )
      this.exit();
    else if (
      timings ===
      '9002,4470,592,522,594,520,598,1638,598,518,600,516,602,514,592,522,596,520,596,1640,596,1638,598,1638,598,1636,598,516,600,516,654,462,592,524,594,1640,596,1640,598,1638,598,1638,598,518,598,1636,600,1634,600,1636,600,514,592,526,592,522,596,520,598,1638,598,518,600,516,602,514,594'
    )
      this.info();
    else if (
      timings ===
      '9002,4466,596,520,598,518,598,1636,600,516,600,514,594,522,594,520,596,520,650,1586,598,1636,600,1636,600,1636,600,514,592,524,594,520,596,520,598,518,600,516,602,1634,602,1634,592,1644,592,1642,592,1642,594,522,594,1640,596,1640,596,520,598,518,600,516,602,514,592,522,596,1640,596'
    )
      this.setInput(Input.USB);
    else {
      console.log('Invalid command', req.url, req.body);
      res.send('Invalid command');
      return;
    }

    res.send('success');
  }
}