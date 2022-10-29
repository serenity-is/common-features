import { build } from "@serenity-is/tsbuild";

const buildOpt = {
    entryPoints: ['./Serenity.Demo.Northwind/index.ts'],
    outbase: './Serenity.Demo.Northwind/',
    splitting: false,
    clean: false,
    minify:false
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
        js: 'Serenity.Demo = Serenity.Demo || {}; Serenity.Demo.Northwind = Serenity.Demo.Northwind || {}; Object.assign(Serenity.Demo.Northwind, Serenity._); delete Serenity._;'
    },
    globalName: 'Serenity._',
    outdir: 'wwwroot/'
}));