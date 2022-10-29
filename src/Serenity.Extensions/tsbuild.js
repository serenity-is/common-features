import { build } from "@serenity-is/tsbuild";

const buildOpt = {
    entryPoints: ['./Serenity.Extensions/index.js'],
    outbase: './Serenity.Extensions/',
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
        js: 'Serenity.Extensions = Serenity.Extensions || {}; Object.assign(Serenity.Extensions, Serenity._); delete Serenity._;'
    },
    globalName: 'Serenity._',
    outdir: 'wwwroot/'
}));