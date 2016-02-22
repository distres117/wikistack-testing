var chai = require('chai');
var expect = chai.expect;
var spies = require('chai-spies');
chai.use(spies);

describe('Simple tests', function(){
  it('2+2=4', function(){
    expect(2+ 2).to.equal(4);
  });
  it('async test', function(done){
    var start = new Date();
    setTimeout(function(){
      var duration = new Date() - start;
      expect(duration).to.be.closeTo(1000,50);
      done();
    },1000);
  });
  it('Testing spies', function(){
    var testItems = [1,2,3,4,5];
    function testFn(val){
      console.log("logging", val);
    }
    var spy = chai.spy(testFn);
    testItems.forEach(spy);
    expect(spy).to.have.been.called.exactly(5);
  });
});
