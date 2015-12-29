import pify from 'pify';
import Joi from 'joi';

const methods = [
    'upsert',
    'insert',
    'replace',
    'query',
    'get',
    'getMulti',
    'getAndTouch',
    'getAndLock',
    'getReplica',
    'touch',
    'unlock',
    'remove'
];

const methodsToVerifyBeforeInserting = [
    'upsert',
    'insert',
    'replace'
];

const methodsToVerifyBeforeGetting = [
    'get',
    'getAndTouch',
    'getAndLock',
    'getReplica'
];

export default function (couchbaseBucket) {
    return function (modelName) {
        return function (Target) {
            const target = new Target();
            target.type = Joi.string().required();
            const schema = Joi.object().keys(target);

            methods.forEach(name => {
                Target[name] = async function (...params) {
                    if (methodsToVerifyBeforeInserting.includes(name)) {
                        const object = ((key, value) => value)(...params);
                        object.type = modelName;

                        await pify(Joi.validate)(object, schema);
                    }

                    const result = await pify(couchbaseBucket[name].bind(couchbaseBucket))(...params);

                    if (methodsToVerifyBeforeGetting.includes(name) && result.value.type !== modelName) {
                        throw new Error(`Item with id: ${ params[0] } is not of type: ${ modelName }`);
                    }

                    return result;
                };
            });
        };
    };
}
