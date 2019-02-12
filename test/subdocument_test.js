const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  let joe;

  it('can create a subdocument', (done) => {
    joe = new User({name: 'Joe', posts: [{title: 'Post Title'}]});

    joe.save()
      .then(() => User.findOne({}))
      .then((user) => {
        assert(user.posts[0].title === 'Post Title');
        done();
      })
  });

  it('can add subdocuments to existing record', (done) => {
    joe = new User({name: 'Joe', posts: []});
    joe.save()
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        user.posts.push({title: 'New Post'});
        return user.save();
      })
      .then(() => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user.posts[0].title === 'New Post');
        done();
      })
  });

  it('can remove subdocuments from existing record', (done) => {
    joe = new User({name: 'Joe', posts: [{title: 'New Title'}]});
    joe.save()
    .then(() => User.findOne({name: 'Joe'}))
    .then((user) => {
      user.posts[0].remove();
      return user.save()
    })
    .then(() => User.findOne({name: 'Joe'}))
    .then((user) => {
      assert(user.posts.length === 0);
      done();
    })
  })

});
