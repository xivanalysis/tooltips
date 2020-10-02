module.exports = api => ({
  presets: [
    '@babel/preset-env',
    ['@babel/preset-typescript', {
      allowDeclareFields: true,
      onlyRemoveTypeImports: true,
    }],
    ['@babel/preset-react', {
      development: api.env('development'),
    }],
  ]
})