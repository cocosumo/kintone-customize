module.exports = function(api) {
  api.cache(true);
  const presets = [
    '@babel/env',
    '@babel/react',
    '@babel/preset-typescript'
  ];
  const plugins = [
    [
      '@babel/proposal-class-properties',
      '@babel/plugin-proposal-optional-chaining'
    ],
  ];
  return {
    presets,
    plugins,
  };
};
