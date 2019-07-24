import camelCase from 'lodash/camelCase'

const requireModule = require.context('.', false, /\.js$/)
const modules = {}

requireModule.keys().forEach(fileName => {
  if (fileName === './index.js') return
    // Module files must have 'module' appended to
    // name to be automically registered
    const moduleName = camelCase(
        fileName.replace(/(\.\/|.module\.js)/g, '')
    )
    modules[moduleName] = {
      namespaced: true,
      ...requireModule(fileName).default
    }
})

export default modules