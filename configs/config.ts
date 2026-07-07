import { Environment, environments } from './environments';

const currentEnv = (process.env.TEST_ENV as Environment) || 'qa';

export const appConfig = {
    environment: currentEnv,
    baseUrl: environments[currentEnv].baseUrl,
    headless: process.env.CI === 'true'
};