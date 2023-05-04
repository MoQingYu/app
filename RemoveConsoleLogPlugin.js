class RemoveConsoleLogPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap('RemoveConsoleLogPlugin', compilation => {
      const { assets } = compilation
      Object.keys(assets).forEach(filename => {
        let content = assets[filename].source()
        content = content.replace(/console\.log\([^\\)]*\);\n?/g, '')
        assets[filename] = {
          source: () => content,
          size: () => content.length
        }
      })
    })
  }
}

module.exports = RemoveConsoleLogPlugin
