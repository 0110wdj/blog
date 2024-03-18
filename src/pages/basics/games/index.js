import React from "react"
import Layout from "../../../components/layout"
import G2048 from './2048'

export default function Home() {
  return (
    <Layout>
      <div>
        <G2048 />
      </div>
    </Layout >
  )
}