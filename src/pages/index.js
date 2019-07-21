import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"


const IndexPage = () => (
  <Layout>
    <SEO title='Home' />
    <h1>Welcome</h1>
    <Link to='/blog/'>Go to blog</Link>
  </Layout>
)

export default IndexPage
