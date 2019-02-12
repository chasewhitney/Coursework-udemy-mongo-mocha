const assert = require('assert');
const mongoose = require('mongoose');
const User = require('../src/user')
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
  let joe, blogPost;

  beforeEach((done) => {
    joe = new User({name: 'Joe'});
    blogPost = new BlogPost({title: 'JS is great', content: 'Yep it really is'});

    joe.blogPosts.push(blogPost);

    Promise.all([joe.save(), blogPost.save()])
      .then(() => done());
  });

  it('users clean up dangling blogPosts on deleteOne', (done) => {
    joe.remove({_id: joe._id})
      .then(() => BlogPost.countDocuments())
      .then((count) => {
        assert(count === 0);
        done();
      })
  })




})
