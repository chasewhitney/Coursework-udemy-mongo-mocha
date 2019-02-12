const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// before running tests
before((done) => {
  mongoose.connect('mongodb://localhost/users_test', { useNewUrlParser: true });
  mongoose.connection
    .once('open', () => { done();})
    .on('error', (error) => { console.warn('Error: ', error);
    });
});

// before each test
beforeEach((done) => {
  const {users, blogposts, comments } = mongoose.connection.collections
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
