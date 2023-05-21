module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
  globals: {
    'vue-jest': {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith('font-awesome-icon'),
        isCustomElement: (tag) => tag.startsWith('router-link'),
      },
    },
  },
}

