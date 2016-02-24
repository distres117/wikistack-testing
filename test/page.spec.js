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
            it('never gets itself', function(done) {
              var pageId;
                Page.findOne({title: 'foo'})
                .then(function(page){
                  pageId = page._id.toString();
                  //console.log(pageId);
                  return page.findSimilar();
                })
                .then(function(pages){
                  var pageIds = pages.map(function(item){
                    return item._id.toString();
                  });
                  //console.log(pageIds);
                  expect(pageIds.indexOf(pageId)).to.equal(-1);
                  done();
                });
            });
            it('gets other pages with any common tags', function(done) {
              var numPages, pageId;
                Page.findOne({title: 'foo'})
                .then(function(page){
                  pageId = page._id.toString();
                  //console.log(pageId);
                  return page.findSimilar();
                })
                .then(function(pages){
                  numPages = pages.length;
                  return Page.find({
                    tags: {$in : ['foo', 'bar']},
                    _id: { $ne: pageId}
                  });
                })
                .then(function(pages){
                  expect(numPages).to.equal(pages.length);
                  done();
                })
                .catch(function(err){
                  console.log(err);
                });
            });
            it('does not get other pages without any common tags', function() {
              var origTags;
                Page.findOne({title: 'foo'})
                .then(function(page){
                  origTags = page.tags;
                  //console.log(pageId);
                  return page.findSimilar();
                })
                .then(function(pages){
                  var numPages = pages.length;
                  var filteredPages = pages.filter(function(page){
                    return page.tags.some(function(tag){
                      return origTags.indexOf(tag) > -1;
                    });
                  });
                  //console.log(filteredPages);
                  expect(filteredPages.length).to.equal(numPages);
                  //console.log(pageIds);
                  done();
                });
            });
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
