import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const BlogIndex = ({ data }) => (
  <Layout>
    <SEO title='Blog Home' />
    <h1>Blog</h1>
    {
      data.allMarkdownRemark.edges.map((node) => {
        const {node: {frontmatter: post}} = node

        return <BlogPostLink key={post.path} post={post} />
      })
    }


  </Layout>
)

const BlogPostLink = ({post}) => (
  <div>
    <span><Link to={post.path}>{post.title}</Link></span> - <span>{post.date}</span>
  </div>
)

export const pageQuery = graphql`
  query {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            title
            path
            date(formatString: "YYYY-MM-DD")
          }
        }
      }
    }
  }
`

export default BlogIndex
