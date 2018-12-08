const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const { createFilePath } = require('gatsby-source-filesystem')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js')
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
              edges {
                node {
                  fields {
                    slug
                    type
                  }
                  frontmatter {
                    title
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        const createPostPages = posts => {
          _.each(posts, (post, index) => {
            const previous = index === posts.length - 1 ? null : posts[index + 1].node;
            const next = index === 0 ? null : posts[index - 1].node;
  
            createPage({
              path: post.node.fields.slug,
              component: blogPost,
              context: {
                slug: post.node.fields.slug,
                previous,
                next,
              },
            })
          })
        };

        // Create blog posts pages.
        const posts = result.data.allMarkdownRemark.edges;

        const blogPosts = posts.filter(({ node: { fields: { type } } }) => type === 'blog');
        const projectsPosts = posts.filter(({ node: { fields: { type } } }) => type === 'projects');
        const otherPosts = posts.filter(({ node: { fields: { type } } }) => type !== 'blog' && type !== 'projects');

        createPostPages(blogPosts);
        createPostPages(projectsPosts);
        createPostPages(otherPosts);
      })
    )
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })

    if (value.split('/').length > 3) {
      createNodeField({
        name: `type`,
        node,
        value: value.split('/')[1],
      })
    }
  }
}
