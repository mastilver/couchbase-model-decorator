import path from 'path';

import {Mock as couchbase} from 'couchbase';

import fn from '../../index';

const cluster = new couchbase.Cluster();

export const bucket = cluster.openBucket();
export const model = fn(bucket, path.join(__dirname, 'models/**.js'));
