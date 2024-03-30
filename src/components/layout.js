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
        target="_blank"
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
            <ListLink to="/basics/talk/talk">互动区</ListLink>
            <ListLink to="/basics/kits/kits">小工具</ListLink>
            <ListLink to="http://www.snofly.cn:8081/">基础资料</ListLink>
            <ListLink to="https://github.com/0110wdj">
                <svg height="32" aria-hidden="true" viewBox="0 0 16 16" version="1.1" width="32" data-view-component="true" class="octicon octicon-mark-github v-align-middle color-fg-default">
                    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                </svg>
            </ListLink>
            {/* <ListLink to="/basics/games">2048</ListLink> */}
            {/* <ListLink to="http://www.snofly.cn:8080/">NPS</ListLink> */}
        </header>
    )
}

/** 页脚 */
const Footer = (data) => {
    return (
        <footer >
            <a href="http://www.snofly.cn">{data.site.siteMetadata.siteTitle}</a>
            &nbsp;&nbsp; © 2022 - 2024 &nbsp;| &nbsp;&nbsp;
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
