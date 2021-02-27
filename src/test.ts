import {HttpTelevision} from "./HttpTelevision";
import {HttpTelevisionConfig} from "./config/HttpTelevisionConfig";

const config = <HttpTelevisionConfig>{
    name: 'HTTP Television',
    host: 'http://192.168.2.151',
    global: {
        url: '/play',
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
    },
    actions: {
        powerToggle: {
            body: 'timings=9008,4462,600,516,600,514,592,1642,594,522,596,520,598,518,600,516,602,514,592,1642,592,1642,594,1642,594,1640,594,520,596,520,650,466,600,516,592,1644,592,522,594,1640,596,1640,596,520,596,1638,598,518,598,1636,600,516,602,1634,592,524,594,522,648,1588,596,518,598,1636,598,518,600',
        },
        volumeUp: {
            body: 'timings=9006,4462,600,516,602,540,576,1632,592,522,596,520,596,520,598,518,600,516,602,1634,602,1632,604,1632,594,1642,594,522,596,520,598,518,600,516,600,514,602,1632,592,524,594,520,596,520,598,518,600,516,602,514,592,1642,594,522,596,1640,596,1640,596,1638,596,1638,598,1638,598,1638,598',
        },
        volumeDown: {
            body: 'timings=9008,4462,600,516,592,524,594,1640,594,522,596,520,598,518,600,516,602,514,594,1642,594,1640,596,1640,596,1640,596,520,596,518,600,516,600,514,592,1642,594,1642,594,522,596,520,598,518,598,516,602,514,592,522,594,522,596,520,598,1636,598,1636,600,1636,600,1636,600,1634,602,1634,602',
        },
        up: {
            body: 'timings=9002,4468,594,520,596,520,598,1638,598,516,600,516,592,522,594,522,596,520,598,1638,598,1636,598,1638,598,1636,600,516,652,464,592,522,594,520,598,518,598,518,600,516,602,514,656,460,594,520,596,1638,598,518,600,1636,600,1636,600,1634,600,1634,602,1634,602,1632,592,524,594,1642,596',
        },
        down: {
            body: 'timings=9002,4466,596,518,598,518,600,1636,600,514,592,524,594,522,596,520,648,468,600,1638,596,1636,600,1636,600,1634,600,514,592,524,594,522,596,520,598,1638,598,516,600,516,602,514,592,524,594,520,596,1638,598,518,598,516,652,1582,592,1644,592,1644,592,1642,592,1642,594,522,596,1640,596',
        },
        left: {
            body: 'timings=9002,4468,594,522,596,520,598,1638,598,516,600,514,602,514,594,522,594,520,596,1638,598,1638,598,1638,598,1636,598,518,600,516,590,524,594,522,594,1640,596,1638,596,1638,598,518,598,518,600,514,592,522,594,522,594,520,598,518,600,516,600,1634,592,1644,592,1644,592,1642,594,1642,594',
        },
        right: {
            body: 'timings=9006,4462,600,516,592,524,594,1642,594,522,596,520,598,518,600,516,652,464,654,1580,592,1642,594,1640,594,1640,596,520,648,468,650,466,600,516,592,524,592,1642,594,1640,594,522,596,518,598,518,600,516,602,514,592,1642,594,522,596,520,598,1638,598,1638,598,1636,598,1636,600,1636,600',
        },
        play: {
            body: 'timings=9002,4468,594,522,596,520,596,1638,598,518,600,516,600,516,592,524,594,520,596,1638,598,1638,596,1638,598,1638,598,518,600,516,654,462,654,460,596,520,598,518,598,516,600,516,592,1644,592,1642,592,522,596,1640,594,1640,596,1640,596,1638,596,1638,598,518,600,516,602,1634,592,524,594',
        },
        pause: {
            body: 'timings=9004,4464,598,516,600,514,602,1634,592,524,594,520,596,520,650,466,650,464,602,1634,590,1644,592,1642,592,1642,594,522,596,520,598,518,598,516,602,514,592,1644,592,522,596,1640,594,1640,596,1640,596,518,598,1636,600,1636,600,516,602,1634,602,514,594,522,596,520,598,1638,598,518,600',
        },
        select: {
            body: 'timings=9006,4464,598,518,600,516,602,1632,592,524,646,470,646,470,596,518,600,516,602,1634,602,1632,592,1642,594,1642,594,522,596,520,598,518,598,516,652,464,592,522,594,1640,596,520,648,468,598,518,600,1634,600,514,592,1644,592,1642,592,522,648,1588,594,1640,596,1638,598,518,598,1636,600',
        },
        back: {
            body: 'timings=9006,4462,600,516,602,514,592,1642,594,522,596,520,598,518,650,466,652,462,592,1642,592,1642,594,1642,594,1640,596,520,598,518,598,516,600,516,602,514,654,462,646,470,596,1640,596,518,600,1636,600,516,602,514,594,1642,594,1642,594,1642,594,522,596,1640,596,520,598,1636,598,1636,600',
        },
        exit: {
            body: 'timings=9006,4462,600,516,602,514,592,1642,594,522,596,520,598,518,650,466,652,462,592,1642,592,1642,594,1642,594,1640,596,520,598,518,598,516,600,516,602,514,654,462,646,470,596,1640,596,518,600,1636,600,516,602,514,594,1642,594,1642,594,1642,594,522,596,1640,596,520,598,1636,598,1636,600',
        },
        info: {
            body: 'timings=9002,4470,592,522,594,520,598,1638,598,518,600,516,602,514,592,522,596,520,596,1640,596,1638,598,1638,598,1636,598,516,600,516,654,462,592,524,594,1640,596,1640,598,1638,598,1638,598,518,598,1636,600,1634,600,1636,600,514,592,526,592,522,596,520,598,1638,598,518,600,516,602,514,594',
        },
        inputs: [
            {
                label: 'HDMI',
                body: 'timings=',
            },
            {
                label: 'USB',
                body: 'timings=9002,4466,596,520,598,518,598,1636,600,516,600,514,594,522,594,520,596,520,650,1586,598,1636,600,1636,600,1636,600,514,592,524,594,520,596,520,598,518,600,516,602,1634,602,1634,592,1644,592,1642,592,1642,594,522,594,1640,596,1640,596,520,598,518,600,516,602,514,592,522,596,1640,596',
            }
        ]
    }
    // actions: {
    //     powerOn: {
    //         body: 'timings=9120,4478,600,534,602,534,604,532,604,532,604,530,606,530,606,530,606,528,638,1604,606,1634,598,1644,598,1642,598,1642,598,1642,600,1640,602,1640,602,534,632,500,636,500,636,498,626,508,628,506,630,504,632,502,634,1606,634,1606,604,1636,636,1606,606,1634,606,1634,598,1642,598,1642,600',
    //         headers: {},
    //     },
    //     powerOff: {
    //         body: 'timings=9130,4484,606,530,606,530,604,530,606,530,606,530,606,530,606,530,606,530,604,1636,606,1636,606,1638,604,1640,602,1640,602,1640,602,1640,602,1640,602,532,604,1638,604,532,604,532,604,530,606,528,598,536,600,536,600,1638,604,532,604,1634,608,1632,598,1640,602,1638,602,1636,606,1634,606',
    //     }
    // }
};

const tv = new HttpTelevision(config);

tv.powerOn();
tv.volumeUp();
tv.volumeDown();
tv.setVolume(100);

tv.info();
tv.up();
tv.down();
tv.left();
tv.right();
tv.select();
tv.back();
tv.play();
tv.pause();
tv.playPause();
tv.exit();
tv.getInput();
tv.getVolume();
tv.isActive();
tv.setInput(0);

tv.togglePower();
tv.powerOff();
