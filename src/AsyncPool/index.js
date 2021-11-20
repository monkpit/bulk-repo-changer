import { sleep } from '../util';

import { asyncPoolSleep } from '../../config';

export default class AsyncPool {
    joined = 0;

    constructor(max) {
        this.max = max;
    }

    async join(name) {
        while (this.joined >= this.max) {
            await sleep(asyncPoolSleep);
        }
        this.joined += 1;
        console.log(`${name} joined the pool!`);
    }
    
    leave(name) {
        console.log(`${name} left the pool.`);
        this.joined -=  1;
    }
}