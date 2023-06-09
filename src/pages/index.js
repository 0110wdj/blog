/*
 * @description: 
 * @RGX/RBX: 
 * @Authored: LiuJie
 * @Date: 2022-04-09 19:35:28
 * @LastEditors: LiuJie 626796235@qq.com
 * @LastEditTime: 2023-05-01 14:55:01
 */
import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"

/** 文章标题行样式 */
const PostTitle = (node) => {
  /** 标题、时间、路径 */
  const { frontmatter: { title = "未命名", date }, fields: { slug } } = node;
  if(date === 'hidden'){
    return <></>
  }
  return (
    <div key={node.id}>
      <Link
        to={slug}
      >
        <h3 style={{ textAlign: 'left' }} className='index-title'>
          {title}
          <span style={{ float: 'right', marginLeft: '20px' }}>
            &nbsp;
            {date}
          </span>
        </h3>
      </Link>
    </div>
  )
}

/** 目录生成 */
const Directory = (data) => {
  /** 记录已经收录的年份 */
  const allDate = [];
  /** 当前文章的年份 */
  let date;
  return (
    <div>
      <h1>
        文章列表
      </h1>
      {
        data.allMarkdownRemark.edges.map(({ node }) => {
          date = new Date(node.frontmatter.date).getFullYear()
          if (date && !allDate.includes(date)) {
            allDate.push(date);
            return (
              <div key={node.id}>
                <h3 style={{ textAlign: 'left' }}>
                  {date}
                </h3>
                {PostTitle(node)}
              </div>
            )
          } else {
            return (
              <>
                {PostTitle(node)}
              </>
            )
          }
        })
      }
    </div>
  )
}

export default function Home({ data }) {
  return (
    <Layout>
      {Directory(data)}
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
`