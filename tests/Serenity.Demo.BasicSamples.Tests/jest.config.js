export default {
    testEnvironment: './build/jsdom-global.js',
    testMatch: ['<rootDir>/**/*.spec.ts*', '<rootDir>/**/*.spec.ts*'],
    moduleNameMapper: {
        "^@serenity-is/(corelib|sleekgrid)": "<rootDir>/../../node_modules/@serenity-is/$1/dist/index",
        "^@serenity-is/(.*)": "<rootDir>/../../src/Serenity.Demo.BasicSamples/node_modules/@serenity-is/$1/dist/index",
        "^@/(.*)": "<rootDir>/../../src/Serenity.Demo.BasicSamples/Modules/$1",
        "^\\$/(.*)": "<rootDir>/$1"
    },
    "coveragePathIgnorePatterns": [
        "<rootDir>/node_modules/",
        "/src/Serenity.Assets/"
    ],
    setupFilesAfterEnv: [
        "<rootDir>/build/jsdom-setup.js"
    ],
    extensionsToTreatAsEsm: ['.ts', '.tsx'],
    transformIgnorePatterns: [],
    transform: {
        "\\.(t|j)sx?$": ["@swc/jest", {
            jsc: {
                parser: {
                    syntax: "typescript",
                    decorators: true,
                    tsx: true
                },
                keepClassNames: true,
                experimental: {
                    plugins: [["swc_mut_cjs_exports", {}]]
                },
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
    }
};