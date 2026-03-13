const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((likes, blog) => {
    return (likes += blog.likes);
  }, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((fav, blog) => {
    return fav ? (fav.likes > blog.likes ? fav : blog) : blog;
  }, undefined);
};

const mostBlogs = (blogs) => {
  if (!blogs || !blogs.length) return undefined;

  const authors = new Map();

  blogs.forEach((blog) => {
    const author = blog.author;
    if (authors.has(author)) {
      authors.set(author, authors.get(author) + 1);
    } else {
      authors.set(author, 1);
    }
  });

  const mostAuthor = [...authors.entries()].reduce((most, cur) => {
    return most ? (most[1] > cur[1] ? most : cur) : cur;
  }, undefined);

  return {
    author: mostAuthor[0],
    blogs: mostAuthor[1],
  };
};

const mostLikes = (blogs) => {
  if (!blogs || !blogs.length) return undefined;

  const authors = new Map();

  blogs.forEach((blog) => {
    const author = blog.author;
    const likes = blog.likes;
    if (authors.has(author)) {
      authors.set(author, authors.get(author) + likes);
    } else {
      authors.set(author, likes);
    }
  });

  const mostAuthor = [...authors.entries()].reduce((most, cur) => {
    return most ? (most[1] > cur[1] ? most : cur) : cur;
  }, undefined);

  return {
    author: mostAuthor[0],
    likes: mostAuthor[1],
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
