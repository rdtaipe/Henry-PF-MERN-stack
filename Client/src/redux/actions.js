import {SET_STATE} from './types';

export async function setState(value) {
    return {type:SET_STATE,payload:value}
}

