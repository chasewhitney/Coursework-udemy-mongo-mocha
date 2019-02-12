const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({name:'Joe'});
    joe.save()
      .then(() => { done();})
  });

  it('model instance remove', (done) => {
    joe.remove()
      .then((user) => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method deleteMany', (done) => {
    User.deleteMany({name: 'Joe'})
      .then((user) => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method deleteOne', (done) => {
    User.deleteOne({name: 'Joe'})
      .then((user) => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

  it('class method findOneAndDelete', (done) => {
    User.findOneAndDelete({name: 'Joe'})
      .then((user) => User.findOne({name: 'Joe'}))
      .then((user) => {
        assert(user === null);
        done();
      });
  });

});
