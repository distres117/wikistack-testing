var User = require('../models').User,
    expect = require('chai').expect;
    
describe('Testing user model', function(){
    var userInfo = {
        name: 'Joe McTest',
        email: 'joe@joe.com'
    };
    before(function(){
       return User.create(userInfo);
    });
    after(function(){
       return User.remove({name: 'Joe McTest'}); 
    });
    it('Gets user if he already exists', function(){
        return User.findOrCreate(userInfo)
                .then(function(user){
                    expect(user.email).to.equal('joe@joe.com');
                    return User.find()
                })
                .then(function(users){
                   expect(users.length).to.equal(1); 
                });
    });
    
    it('Create new user if doesent exist', function(){
        userInfo.email = 'dopey@joe.com';
        return User.findOrCreate(userInfo)
                .then(function(user){
                    return User.find();
                })
                .then(function(users){
                    expect(users.length).to.equal(2);
                });
    });
})