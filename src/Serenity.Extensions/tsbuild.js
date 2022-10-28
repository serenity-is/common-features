import { checkIfTrigger, build } from "@serenity-is/tsbuild";

checkIfTrigger();

const buildOpt = {
    entryPoints: ['./Serenity.Extensions/index.js'],
    external: [
        '@serenity-is/*'
    ],
    format: 'esm',
    outdir: 'dist/',
    outbase: './Serenity.Extensions/',
    splitting: false,
    plugins: []
}

await build(buildOpt);

await build(Object.assign({}, buildOpt, {
    format: 'iife',
    globalName: 'Serenity._',
    outdir: 'wwwroot/',
    footer: {
        js: 'Serenity.Extensions = Serenity.Extensions || {}; Object.assign(Serenity.Extensions, Serenity._); delete Serenity._;'
    }
}));