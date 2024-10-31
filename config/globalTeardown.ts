import { rimraf } from 'rimraf';

async function globalTeardown() {
    rimraf('playwright');
}

export default globalTeardown;