const assert = require('assert');
const User = require('../src/user');

describe('virtual test types', () => {
  let joe;

  it('postCount returns number of posts', (done) => {
    joe = new User({name: 'Joe', posts:[{title: 'PostTitle'}]});
    joe.save()
    .then(() => User.findOne({name: 'Joe'}))
    .then((user) => {
      assert(user.postCount === 1);
      done();
    })
  });
});
