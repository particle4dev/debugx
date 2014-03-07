var expect = require('chai').expect;
require('../');

var time = function(){
    var now = new Date();
    return now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
};

suite("DEBUGX", function() {

    test("version", function() {
        expect(DEBUGX.VERSION).to.equal("0.1");
    });

    test("_rules", function() {
        // reset
        DEBUGX.allow('*');
        DEBUGX.deny('*');
        //config
        DEBUGX.denyAll();  // true
        //set rules
        DEBUGX.allow(function(group){
            return group === 'print';
        });
        DEBUGX.deny(function(group){
            return group === 'hidden';
        });

        expect(DEBUGX._runRules('print')).to.equal(true);
        expect(DEBUGX._runRules('hidden')).to.equal(false);
        expect(DEBUGX._runRules('print2')).to.equal(false);
        expect(DEBUGX._runRules('hidden')).to.equal(false);

        // reset
        DEBUGX.allow('*');
        DEBUGX.deny('*');
        DEBUGX.denyAll();  // false
    });
    
    test("allow", function() {
        DEBUGX.allow('*');
        DEBUGX.deny('*');
        //config
        DEBUGX.denyAll();

        DEBUGX.allow(function(group){
            return group === 'print';
        });

        DEBUGX.log('print', 'message');
        expect(DEBUGX.getLastMessage().message).to.equal(time() + " - print: message");
        expect(DEBUGX.getMessage(0).message).to.equal(time() + " - print: message");
        
        DEBUGX.allow('print');
        DEBUGX.log('print', 'message 2');
        expect(DEBUGX.getLastMessage().message).to.equal(time() + " - print: message");
        
        // reset
        DEBUGX.allow('*');
        DEBUGX.deny('*');
        DEBUGX.denyAll();  // false
    });

    test("deny", function() {
        DEBUGX.allow('*');
        DEBUGX.deny('*');

        DEBUGX.deny(function(group){
            return group === 'hidden';
        });

        DEBUGX.log('print', 'message');
        expect(DEBUGX.getLastMessage().message).to.equal(time() + " - print: message");
        expect(DEBUGX.getMessage(0).message).to.equal(time() + " - print: message");

        DEBUGX.log('hidden', 'message 2');
        expect(DEBUGX.getLastMessage().message).to.equal(time() + " - print: message");
        
        DEBUGX.allow('*');
        DEBUGX.deny('*');
    });

    test("format", function() {
        DEBUGX.allow('*');
        DEBUGX.deny('*');

        DEBUGX.format('{{time}} >> {{group}} >> {{message}}');
        DEBUGX.log('print', 'message');
        expect(DEBUGX.getLastMessage().message).to.equal(time() + " >> print >> message");
        
        DEBUGX.allow('*');
        DEBUGX.deny('*');
    });

    test("message", function() {
        DEBUGX.allow('*');
        DEBUGX.deny('*');

        DEBUGX.format('{{time}} >> {{group}} >> {{message}}');
        
        DEBUGX.error('print', 'message');
        expect(DEBUGX.getLastMessage().message).to.equal(time() + " >> print >> message");
        expect(DEBUGX.getLastMessage().type).to.equal("error");

        DEBUGX.warn('print', 'message');
        expect(DEBUGX.getLastMessage().message).to.equal(time() + " >> print >> message");
        expect(DEBUGX.getLastMessage().type).to.equal("warn");

        DEBUGX.info('print', 'message');
        expect(DEBUGX.getLastMessage().message).to.equal(time() + " >> print >> message");
        expect(DEBUGX.getLastMessage().type).to.equal("info");

        DEBUGX.allow('*');
        DEBUGX.deny('*');
    });

    /**
    test("time", function() {
        
    });
    */
});