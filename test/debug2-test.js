var expect = require('chai').expect;
require('../');

var time = function(){
    var now = new Date();
    return now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
};

suite("DEBUG2", function() {

    test("version", function() {
        expect(DEBUG2.VERSION).to.equal("0.1");
    });

    test("_rules", function() {
        // reset
        DEBUG2.allow('*');
        DEBUG2.deny('*');
        //config
        DEBUG2.denyAll();  // true
        //set rules
        DEBUG2.allow(function(group){
            return group === 'print';
        });
        DEBUG2.deny(function(group){
            return group === 'hidden';
        });

        expect(DEBUG2._runRules('print')).to.equal(true);
        expect(DEBUG2._runRules('hidden')).to.equal(false);
        expect(DEBUG2._runRules('print2')).to.equal(false);
        expect(DEBUG2._runRules('hidden')).to.equal(false);

        // reset
        DEBUG2.allow('*');
        DEBUG2.deny('*');
        DEBUG2.denyAll();  // false
    });
    
    test("allow", function() {
        DEBUG2.allow('*');
        DEBUG2.deny('*');
        //config
        DEBUG2.denyAll();

        DEBUG2.allow(function(group){
            return group === 'print';
        });

        DEBUG2.log('print', 'message');
        expect(DEBUG2.getLastMessage().message).to.equal(time() + " - print: message");
        expect(DEBUG2.getMessage(0).message).to.equal(time() + " - print: message");
        
        DEBUG2.allow('print');
        DEBUG2.log('print', 'message 2');
        expect(DEBUG2.getLastMessage().message).to.equal(time() + " - print: message");
        
        // reset
        DEBUG2.allow('*');
        DEBUG2.deny('*');
        DEBUG2.denyAll();  // false
    });

    test("deny", function() {
        DEBUG2.allow('*');
        DEBUG2.deny('*');

        DEBUG2.deny(function(group){
            return group === 'hidden';
        });

        DEBUG2.log('print', 'message');
        expect(DEBUG2.getLastMessage().message).to.equal(time() + " - print: message");
        expect(DEBUG2.getMessage(0).message).to.equal(time() + " - print: message");

        DEBUG2.log('hidden', 'message 2');
        expect(DEBUG2.getLastMessage().message).to.equal(time() + " - print: message");
        
        DEBUG2.allow('*');
        DEBUG2.deny('*');
    });

    test("format", function() {
        DEBUG2.allow('*');
        DEBUG2.deny('*');

        DEBUG2.format('{{time}} >> {{group}} >> {{message}}');
        DEBUG2.log('print', 'message');
        expect(DEBUG2.getLastMessage().message).to.equal(time() + " >> print >> message");
        
        DEBUG2.allow('*');
        DEBUG2.deny('*');
    });

    test("message", function() {
        DEBUG2.allow('*');
        DEBUG2.deny('*');

        DEBUG2.format('{{time}} >> {{group}} >> {{message}}');
        
        DEBUG2.error('print', 'message');
        expect(DEBUG2.getLastMessage().message).to.equal(time() + " >> print >> message");
        expect(DEBUG2.getLastMessage().type).to.equal("error");

        DEBUG2.warn('print', 'message');
        expect(DEBUG2.getLastMessage().message).to.equal(time() + " >> print >> message");
        expect(DEBUG2.getLastMessage().type).to.equal("warn");

        DEBUG2.info('print', 'message');
        expect(DEBUG2.getLastMessage().message).to.equal(time() + " >> print >> message");
        expect(DEBUG2.getLastMessage().type).to.equal("info");

        DEBUG2.allow('*');
        DEBUG2.deny('*');
    });

    /**
    test("time", function() {
        
    });
    */
});