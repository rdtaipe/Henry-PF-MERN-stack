import {SET_STATE} from './types';

export function setter(value) {
    return {type:SET_STATE,payload:value}
}

