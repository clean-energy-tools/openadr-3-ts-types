

import * as path from 'path';
import * as url from 'url';
import util from 'node:util';

export const __filename = url.fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

import {
    OpenAPIClientAxios,
    
} from 'openapi-client-axios';

import {
    Components, Paths
} from '../../dist/openadr-3.js';

const api = new OpenAPIClientAxios({ definition: '../../oadr3.0.1.yaml' });

api.init();

import { Client as OpenADRClient } from '../../dist/openadr-3.js';

type Event = Components.Schemas.Event;

import { default as EventZod } from './zod/zod-event.js';
