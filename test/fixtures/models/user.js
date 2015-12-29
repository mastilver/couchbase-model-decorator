import {model} from '../orm';
import Joi from 'joi';

@model('user')
export default class {
    username = Joi.string().alphanum().required();
    password = Joi.string().required();
    email = Joi.string().email();
}
