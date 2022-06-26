const NEXT_CONFIG = {
  distDir: './.next',

  webpack: (config) => {
    config.output = config.output || {};
    config.output.devtoolModuleFilenameTemplate = function (info) {
      return 'file://' + encodeURI(info.absoluteResourcePath);
    };
    config.resolve.modules.push(__dirname);

    return config;
  },

  async rewrites() {
    const dev = process.env.NODE_ENV !== 'production';
    return [
      {
        source: '/api/:path*',
        destination: dev
          ? 'http://localhost:3000/api/:path*'
          : 'https://front-dori.herokuapp.com/api/:path*',
      },
    ];
  },
};

module.exports = NEXT_CONFIG;
