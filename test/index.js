import test from 'ava';
import 'babel-core/register';

import pify from 'pify';

import user from './fixtures/models/user';
import {bucket} from './fixtures/orm';

test('insert an object', async t => {
    await user.insert('insertObject', {
        username: 'user',
        password: 'pass',
        email: 'test@test.com'
    });

    const insertedUser = (await user.get('insertObject')).value;

    t.is(insertedUser.username, 'user');
    t.is(insertedUser.password, 'pass');
    t.is(insertedUser.email, 'test@test.com');
});

test('add type to the created item', async t => {
    await user.insert('testUser', {
        username: 'user',
        password: 'pass',
        email: 'test@test.com'
    });

    const insertedUser = (await user.get('testUser')).value;

    t.is(insertedUser.username, 'user');
    t.is(insertedUser.password, 'pass');
    t.is(insertedUser.email, 'test@test.com');
    t.is(insertedUser.type, 'user');
});

test('check validity before inserting', t => {
    const throwingPromise = user.insert('valideObject', {
        username: 'user'
    });

    return t.throws(throwingPromise);
});

test('check that the type is right', async t => {
    await pify(bucket.insert.bind(bucket))('valideType', {
        username: 'user',
        password: 'pass',
        email: 'test@test.com',
        type: 'other'
    });

    return t.throws(user.get('valideType'));
});
