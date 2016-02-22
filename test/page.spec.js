var chai = require('chai');
var expect = chai.expect;
var spies = require('chai-spies');
var User = require('../models').User;
var Page = require('../models').Page;
chai.use(spies);

describe('Page model', function() {
    var page;
    describe('Validations', function() {
      beforeEach(function(){
        page = new Page();
      });
        it('errors without title', function() {
          page.validate()
          .then(function(){

          }, function(err){
            //console.log(err.errors);
            expect(err.errors).to.have.property('email');
          });
        });
        xit('errors without content', function() {});
    });

    describe('Statics', function() {
        describe('findByTag', function() {
          beforeEach(function(done){
            Page.create({
              title: 'foo',
              content: 'bar',
              tags: ['foo', 'bar']
            }, done);
          });
            it('gets pages with the search tag', function() {
              Page.findByTag('foo')
              .then(function(pages){
                expect(pages.length > 0).to.equal(true);
              });
            });
            it('does not get pages without the search tag', function() {
              Page.findByTag('test')
              .then(function(pages){
                expect(pages.length).to.equal(0);
              });
            });
        });
    });

    describe('Methods', function() {
        describe('findSimilar', function() {
            it('never gets itself', function() {

            });
            xit('gets other pages with any common tags', function() {});
            xit('does not get other pages without any common tags', function() {});
        });
    });

    describe('Virtuals', function() {
        describe('route', function() {
            xit('returns the url_name prepended by "/wiki/"', function() {});
        });
    });

    describe('Hooks', function() {
        xit('it sets urlTitle based on title before validating', function() {});
    });

});
