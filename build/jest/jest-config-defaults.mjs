import { join, resolve } from "path";
import { fileURLToPath } from 'url';

const configRoot = resolve(join(fileURLToPath(new URL('.', import.meta.url)), './'));
const serenityNodeModules = resolve(join(configRoot, "../../../Serenity"));

export default () => ({
    coveragePathIgnorePatterns: [
        "<rootDir>/node_modules/",
        "<rootDir>/src/mocks/",
        "/src/Serenity.Assets/"
    ],
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/Modules/$1',
        "^@serenity-is/(.*)$": ["<rootDir>/node_modules/@serenity-is/$1", "<rootDir>/../node_modules/@serenity-is/$1", "<rootDir>/../../node_modules/@serenity-is/$1"]

    },
    setupFiles: [
        `${configRoot}/jest-setup.mjs`,
    ],
    setupFilesAfterEnv: [
        `${configRoot}/jest-setup-afterenv.mjs`
    ],   
    testEnvironment: `${configRoot}/jest-jsdom-global.mjs`,
    testMatch: [
        "<rootDir>/test/**/*.spec.ts*",
        "<rootDir>/src/**/*.spec.ts*"
    ],
    transform: {
        "^.+\.(t|j)sx?$": [`${serenityNodeModules}/node_modules/@swc/jest`, {
            jsc: {
                parser: {
                    syntax: "typescript",
                    decorators: true,
                    tsx: true
                },
                keepClassNames: true,
                transform: {
                    react: {
                        runtime: 'automatic',
                        importSource: 'jsx-dom'
                    }
                }
            },
            module: {
                type: "commonjs"
            }
        }]
    },
    transformIgnorePatterns: []
});