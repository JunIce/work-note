const { parse, compileTemplate, compileScript, compileStyle } = require("@vue/compiler-sfc")
const fs = require("fs")
fs.readFile("./foo.vue", (err, data) => {

    let parsed = parse(data.toString(), {
        filename: 'foo.vue'
    })

    let compileredTemplate = compileTemplate({
        id: '123',
        filename: 'foo.vue',
        source: parsed.descriptor.template.content
    })

    let compileredScript = compileScript(parsed.descriptor, {
        id: '123'
    })

    let compileredStyle = compileStyle({
        source: parsed.descriptor.styles[0].content,
        scoped: true,
        id: 'data-v-123'
    })
    // console.log('parsed', parsed.descriptor.styles);

})

