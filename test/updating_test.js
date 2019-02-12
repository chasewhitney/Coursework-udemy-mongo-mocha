const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({name:'Joe', postCount: 0});
    joe.save()
    .then(() => { done();});
  });

  function assertName(operation, done){
    operation
    .then(() => User.find({}))
    .then((users) => {
      assert(users.length === 1);
      assert(users[0].name === 'Alex');
      done();
    })
  }

  it('instance type using set and save', (done) => {
    joe.set('name', 'Alex');
    assertName(joe.save(), done);
  });

  it('instance type update', (done) => {
    assertName(joe.updateOne({name: 'Alex'}), done);
  });

  it('class instance can update One', (done) => {
    assertName(User.updateOne({name: 'Joe'}, { name: 'Alex'}), done);
  });

  it('class instance can update Many', (done) => {
    assertName(User.updateMany({name: 'Joe'}, { name: 'Alex'}), done);
  });

  it('a user can have their postCount incremented by 1', (done) => {
    User.updateMany({ name: 'Joe'}, { $inc: { postCount: 1}})
    .then(() => User.findOne({name:'Joe'}))
    .then((user) => {
      assert(user.postCount === 1);
      done();
    })
  });

});
