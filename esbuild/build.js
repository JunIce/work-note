// const esbuild = require("esbuild")


const plugin = {
    name: 'env',
    setup(build) {
        build.onResolve()
    }
}

(async () => {
    let esbuild = require('esbuild')
  
    let result = await esbuild.build({
      entryPoints: ['./src/index.js'],
      outdir: 'dist',
      minify: true,
      metafile: true,
    //   assetNames: 'assets/[name]-[hash]',
      loader: {
        '.jpeg': 'file'
      },
      banner: {
        js: `/*****123*****/`
      },
      splitting: true,
      format: 'esm',
      chunkNames: 'chunks/[name]-[hash]',
      color: true,
      plugins: [plugin]
    })
  
    let text = await esbuild.analyzeMetafile(result.metafile)
    console.log(text)
  })()
// const txt = esbuild.analyzeMetafile(result.metafile)

// console.log(txt);

