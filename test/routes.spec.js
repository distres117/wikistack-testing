var chai = require('chai');
var expect = chai.expect;
var User = require('../models').User;
var Page = require('../models').Page;
var request = require('supertest-as-promised')(require('../app'));
var chalk = require('chalk');


describe('wiki routes', function(){
    before(function(){
        console.log(chalk.magenta("seeding..."));
        return Page.create({
           title: "Test page!",
           content: "Some test content!",
           tags: ['cats', 'world']
        })
        .then(function(){
            Page.create({
                title: "Another Test page!",
                content: "Some test content!",
                tags: ['cats']
            })
        })
    });
    after(function(){
        console.log(chalk.magenta('destroying...'));
       return Page.remove({content: "Some test content!"})
       .then(function(){
           return User.remove({name: 'Joe'});
       }); 
    });
   it('GET wiki/Test_page', function(){
      return request
        .get('/wiki/Test_page')
        .expect(200);
   });
   it('GET wiki/:title/similar - returns similar pages', function(){
       request
        .get('/wiki/Test_page/similar')
        .expect(200)
        .end(function(err,res){
           expect(res.text).to.include("Another Test page!");
        });
   });
   it('GET wiki/search', function(){
      return request
        .get('/wiki/search?search=cats')
        .expect(200)
        .end(function(res){
            expect(res.text).to.include("Another Test page!");
            expect(res.text).to.include("Test page!");
        })
   });
   it('POST to /wiki', function(){
      return request
        .post('/wiki')
        .send({
            name: 'Joe',
            email: 'joe@joe.com',
            title: "Yet another test page!",
            content: "Some test content!",
            tags: 'cats'
        })
        .expect(302)
        .then(function(){
            return request
                .get('/wiki/Yet_another_test_page')
                .expect(200);
        })
   });
});

describe('Users routes', function(){
    var user;
    before(function(){
        return User.create({
            name: 'Tom',
            email: 'tom@tom.com'
        })
        .then(function(_user){
            user = _user;
        });
    });
    after(function(){
       return User.remove({name: 'Tom'}); 
    });
    it('GET using user_id', function(){
        return request
            .get('/users/' + user._id)
            .expect(200);
    });
});
