import { build, cleanPlugin } from "@serenity-is/tsbuild";

const buildOpt = {
    entryPoints: ['./Modules/index.ts'],
    outbase: './Modules/',
    splitting: false,
    clean: false
}

await build(Object.assign({}, buildOpt, {
    external: [
        '@serenity-is/*'
    ],
    outdir: 'dist/',
    plugins: []
}));

await build(Object.assign({}, buildOpt, {
    format: 'iife',
    footer: {
        js: 'Serenity.Demo = Serenity.Demo || {}; Serenity.Demo.BasicSamples = Serenity.Demo.BasicSamples || {}; Object.assign(Serenity.Demo.BasicSamples, Serenity._); delete Serenity._;'
    },
    globalName: 'Serenity._',
    outdir: 'wwwroot/'
}));