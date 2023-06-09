/*
 * @description: 
 * @RGX/RBX: 
 * @Authored: LiuJie
 * @Date: 2022-04-09 19:35:28
 * @LastEditors: LiuJie
 * @LastEditTime: 2022-06-04 17:36:34
 */
/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

/** gatsby-config.js 文件是 Gatsby 会自动识别的另一个特殊文件。 要在这里添加插件和网站配置。 */

module.exports = {
  siteMetadata: {
    siteTitle: `冰上飞熊`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}