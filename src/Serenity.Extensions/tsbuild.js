import { checkIfTrigger, build } from "@serenity-is/tsbuild";

checkIfTrigger();

await build({
    entryPoints: ['./Serenity.Extensions/index.js'],
    external: [
        '@serenity-is/*'
    ],
    format: 'esm',
    minify: false,
    outdir: 'dist/',
    outbase: './Serenity.Extensions/',
    splitting: false,
    plugins: []
});
