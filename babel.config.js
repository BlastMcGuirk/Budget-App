module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      [
        '@babel/preset-env',
        {
          modules: 'commonjs',
          loose: true,
        },
      ],
    ]
  };
};
