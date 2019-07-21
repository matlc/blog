---
path: "/blog/gatsby-shared-graphql-fragments"
date: "2019-07-21"
title: "How to export GraphQL fragments in GatsbyJS"
---

GraphQL fragments can help organize and encourage reuse within our GatsbyJS page queries. However, how do you share fragments across pages and templates? Let's see with a GatsbyJS blog example.

*This walkthrough assumes knowledge of GatsbyJS and its use of GraphQL for data querying. For more information on Gatsby and GraphQL fragments, visit Gatsby's [GraphQL reference](https://www.gatsbyjs.org/docs/graphql/) and GraphQL's Query [docs about fragments](https://graphql.org/learn/queries/#fragments).*

In this example, our blog uses template files to build pages for posts and authors: `blog-post.js` and `blog-author.js` respectively. The `blog-post.js` and `blog-author.js` are very similar, requesting the same fields from PostsJson and AuthorsJson.

```javascript
// src/templates/blog-post.js query
export const query = graphql`
  query ($id: String!) {
    post: postsJson(id: {eq: $id}) {
      title
      slug
      content
      publishDate(formatString: "MMMM DD, YYYY")
      tags
      author {
        slug
        name
        biography
      }
    }
  }
`

// src/templates/blog-author.js query
export const query = graphql`
  query ($id: String!) {
    post: authorsJson(id: {eq: $id}) {
      slug
      name
      biography
      posts {
        title
        slug
        content
        publishDate(formatString: "MMMM DD, YYYY")
        tags
      }
    }
  }
`
```

Seeing the similarity, we could abstract the post and author fields into GraphQL fragments that both queries could reference. The fragments would look like this:

```graphql
fragment postFields on PostsJson {
  slug
  title
  content
  publishDate(formatString: "MMMM DD, YYYY")
  tags
}

fragment authorFields on AuthorsJson {
  slug
  name
  biography
}
```

Now that we know what fragments we want, how do we share fragments in Gatsby?

### Exporting fragments in Gatsby

The Gatsby documentation talks about fragments in their GraphQL Reference:

> “Fragments are a way to save frequently used queries for re-use. To create a fragment, define it in a query and export it as a named export from any file Gatsby is aware of. A fragment is available for use in any other GraphQL query, regardless of location in the project. Fragments defined in a Gatsby project are global, so names must be unique.”

Great! So what does that look like?

These exported fragments could be anywhere in our project, so we could co-locate them in one file or have them in files where they're first needed. It would be up to your team and project.

In our example, we have a central place for our fragments, a file called `fragments.js` in our project’s `src` directory.

In `fragments.js`, we can copy our fragments then turn them into Javascript named exports. As the quoted documentation mentioned, our fragment names are unique.

```javascript
import { graphql } from 'gatsby'

export const postFields = graphql`
  fragment postFields on PostsJson {
    slug
    title
    content
    publishDate(formatString: "MMMM DD, YYYY")
    tags
  }
`

export const authorFields = graphql`
  fragment authorFields on AuthorsJson {
    slug
    name
    biography
  }
`
```

Gatsby exports those queries to the global scope, so those fragments are now available in any other GraphQL query in the project.

Back in our `blog-post.js` and `blog-author.js` queries, we can replace the fields with our newly shared fragments.

```javascript
// blog-post.js query
export const query = graphql`
  query ($id: String!) {
    post: postsJson(id: {eq: $id}) {
      ...postFields

      author {
        ...authorFields
      }
    }
  }
`

// blog-author.js query
export const query = graphql`
  query ($id: String!) {
    author: authorsJson(id: {eq: $id}) {
      ...authorFields

      posts {
        ...postFields
      }
    }
  }
`
```

For the full example, see this code on [Github](https://github.com/cryic/fragment-blog-example).
