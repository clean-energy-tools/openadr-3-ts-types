
import { z } from 'zod';

import * as path from 'path';
import * as url from 'url';
import util from 'node:util';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import {
    Event, parseEvent, Interval
} from '../../package/dist/index.js';

const event: Event = parseEvent.parse({
    programID: '00',
    eventName: 'Test event',
    intervals: [
        {
            id: 0,
            payloads: [
                {
                    type: 'PAYLOAD',
                    values: [ 'Hello, World!' ]
                }
            ]
        } // as Interval
    ]
} as Event);

console.log(event);