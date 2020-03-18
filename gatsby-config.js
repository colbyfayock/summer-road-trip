module.exports = {
  siteMetadata: {
    title: `Colbana's Summer Road Trip`,
    githubUrl: 'https://github.com/colbyfayock/summer-road-trip'
  },
  plugins: [
    'gatsby-plugin-resolve-src',
    'gatsby-plugin-sass',
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`
      }
    },
    'gatsby-plugin-react-leaflet'
  ]
};
