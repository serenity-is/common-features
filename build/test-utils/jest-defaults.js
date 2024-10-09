import { join, resolve } from "path";
import { fileURLToPath } from 'url';

const configRoot = resolve(join(fileURLToPath(new URL('.', import.meta.url)), './'));
const serenityNodeModules = resolve(join(configRoot, "../../../Serenity"));

export default () => ({
    coveragePathIgnorePatterns: [
        "<rootDir>/node_modules/",
        "/src/Serenity.Assets/"
    ],
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    moduleNameMapper: {
        "^@serenity-is/(.*)$": ["<rootDir>/node_modules/@serenity-is/$1", "<rootDir>/../node_modules/@serenity-is/$1", "<rootDir>/../../node_modules/@serenity-is/$1"]
    },
    setupFiles: [
        `${configRoot}/jest-setup.js`,
    ],
    setupFilesAfterEnv: [
        `${configRoot}/jest-setup-afterenv.js`
    ],   
    testEnvironment: `${configRoot}/jsdom-global.js`,
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