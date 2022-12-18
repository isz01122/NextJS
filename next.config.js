const isProduction = process.env.NODE_ENV === 'production';

const NEXT_CONFIG = {
  distDir: './.next',
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    styledComponents: true,
    removeConsole: isProduction,
  },

  webpack: (config) => {
    config.output = config.output || {};
    config.output.devtoolModuleFilenameTemplate = function (info) {
      return 'file://' + encodeURI(info.absoluteResourcePath);
    };
    config.resolve.modules.push(__dirname);

    return config;
  },

  async rewrites() {
    const dev = !isProduction;
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
