# couchbase-model-decorator [![Build Status](https://travis-ci.org/mastilver/couchbase-model-decorator.svg?branch=master)](https://travis-ci.org/mastilver/couchbase-model-decorator)

> A [couchbase](http://couchbase.com/) interface using decorator and [joi](https://github.com/hapijs/joi)


## Install

```
$ npm install --save couchbase-model-decorator
```


## Usage

`orm.js`:
```js
import path from 'path';

import couchbase from 'couchbase';
import couchbaseModelDecorator from 'couchbase-model-decorator';

const cluster = new couchbase.Cluster();
const bucket = cluster.openBucket();

export const model = couchbaseModelDecorator(bucket);
```

`models/user.js`:
```js
import Joi from 'joi';
import {model} from './orm';

@model('user')
export default class {
    username = Joi.string().alphanum();
    password = Joi.string();
    email = Joi.string();
}
```

```js
import user from './models/user';

user.insert({
    username: 'user',
    password: 'pass',
    email: 'test@test.com'
})
.then(result => {
    console.log(result);
})
```


## API

### couchbaseModelDecorator(couchbaseBucket)

return a decorator method which can be used on models

#### couchbaseBucket

Type: `Bucket`  

couchbase bucket to which we will connect to


## License

MIT © [Thomas Sileghem](http://mastilver.com)
