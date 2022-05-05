require("dotenv").config({
  path: ".env",
});

module.exports = {
  siteMetadata: {
    title: ``,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-sharp",
    "gatsby-plugin-breadcrumb",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/assets/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/assets/brand/favicon.png",
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `6jqe8vb4wi8v`,
        accessToken: `XAyIkrlrr1xCeoBOICMMExIb26fR3P5V5Jn6gEPuMBs`,
      },
    },
  ],
};
