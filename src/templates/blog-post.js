/*
 * @description: 
 * @RGX/RBX: 
 * @Authored: LiuJie
 * @Date: 2022-06-17 22:19:29
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-12-25 18:15:04
 */
import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark.css'

export default function Home({ data: { markdownRemark: post } }) {
  /** 配置 md2html 转换的参数 */
  const md = new MarkdownIt({
    html: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return '<pre class="hljs"><code>' +
            hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
            '</code></pre>';
        } catch (__) { }
      }
      return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
  });
  /** 转换后的 HTML 文件 */
  const result = md.render(post.rawMarkdownBody);

  return (
    <Layout>
      <div className="blog-post-html">
        <h1 style={{ textAlign: 'center' }}>{post.frontmatter.title}</h1>
        <div
          className="blog-post"
          dangerouslySetInnerHTML={{ __html: result }}
          style={{ textAlign: 'left' }}
        />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      rawMarkdownBody
      frontmatter {
        title
      }
    }
  }
`