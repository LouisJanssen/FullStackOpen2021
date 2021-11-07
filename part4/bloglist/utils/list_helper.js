const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (prev, next) => {
    return prev + next.likes
  }

  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0){
    return 'No blogs'
  }
  else{
    let favorite = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog)
    const result = {
      'title': favorite.title,
      'author': favorite.author,
      'likes': favorite.likes
    }
    return result  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return 'No blogs'
  }
  else {
    let count = _.reduce(blogs, (authorCount, blog) => {
      authorCount[blog.author] = (authorCount[blog.author] || 0) + 1
      return authorCount
    }, {})
    let maxCount = Math.max(...Object.values(count))
    let mostFrequent = Object.keys(count).filter(author => count[author] === maxCount)
    return {
      author: mostFrequent[0],
      blogs: maxCount
    }
  }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return 'No blogs'
  } else {
    let likesCount = _.reduce(blogs, (count, blog) => {
      count[blog.author] = (count[blog.author] || 0) + blog.likes
      return count
    }, {})
    let maxCount = Math.max(...Object.values(likesCount))
    let mostLiked = Object.keys(likesCount).filter(author => likesCount[author] === maxCount)
    return {
      author: mostLiked[0],
      likes: maxCount
    }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}