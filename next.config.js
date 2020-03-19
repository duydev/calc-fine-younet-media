module.exports = {
  exportPathMap: async function(
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/find-facebook-id': {
        page: '/find-facebook-id'
      },
      '/get-facebook-token': {
        page: '/get-facebook-token'
      }
    };
  }
};
