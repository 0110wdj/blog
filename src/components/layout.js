/*
 * @description: 
 * @RGX/RBX: 
 * @Authored: LiuJie
 * @Date: 2022-04-09 19:35:28
 * @LastEditors: LiuJie 626796235@qq.com
 * @LastEditTime: 2023-08-08 10:19:45
 */
import React from "react"
import { useStaticQuery, Link, graphql } from "gatsby"

/** <Link /> 这个 Gatsby 组件的作用，是在你的**网站里**连接不同页面。 */

/** 整行的链接 */
const ListLink = props => (
    <Link
        to={props.to}
        style={{
            textShadow: `none`,
            backgroundImage: `none`,
            color: '#7f6f67',
            marginRight: `1rem`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...props.style,
        }}
    >
        {props.children}
    </Link >
)

/** 页眉设置 */
const Header = (data) => {
    return (
        <header>
            <ListLink to="/" >
                <img src='/favicon.ico'
                    style={{
                        maxWidth: `3rem`,
                        margin: 0,
                    }}
                    alt="head"
                />
            </ListLink>
            <ListLink to="/" style={{ fontSize: '1.4rem' }}>{data.site.siteMetadata.siteTitle}</ListLink>
            {/* <ListLink to="/basics/contact/contact">留言板</ListLink> */}
            <ListLink to="/basics/kits/kits">小工具</ListLink>
            <ListLink to="http://www.snofly.cn:8081/">智慧树</ListLink>
            <ListLink to="http://www.snofly.cn:8080/">NPS</ListLink>
        </header>
    )
}

/** 页脚 */
const Footer = (data) => {
    return (
        <footer >
            <a href="http://www.snofly.cn">{data.site.siteMetadata.siteTitle}</a>
            &nbsp;&nbsp; © 2022 - 2023 &nbsp;| &nbsp;&nbsp;
            <a href="https://beian.miit.gov.cn" target="_blank" rel="noreferrer">渝ICP备2022005435号-1</a>
        </footer>
    )
}

export default function Home({ children }) {

    /** 取得页面的数据 */
    const data = useStaticQuery(
        graphql`
          query {
            site {
              siteMetadata {
                siteTitle
              }
            }
          }
        `
    )

    return (
        <div
            style={{
                textAlign: 'center',
                display: 'flex',
                flexFlow: 'column',
                minHeight: '100vh',
                width: 'auto',
                color: '#fffc'
            }}
        >
            {Header(data)}
            < div style={{
                flex: 1,
                padding: '0 2rem',
                margin: 'auto',
                color: '#c1c1c1'
            }}
            >
                {children}
            </div >
            {Footer(data)}
        </div >
    )
}
