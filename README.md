Example:
    
    DEBUG2.allow('*');
    DEBUG2.deny('*');
    DEBUG2.allow(function(group){
        return group === 'print';
    });
    DEBUG2.deny(function(group){
        return group === 'hidden';
    });

    DEBUG2.format('{{time}} >> {{group}} >> {{message}}');
    DEBUG2.error('print', 'message');
    DEBUG2.warn('print', 'message');
    DEBUG2.info('print', 'message');
    
TODO:

    
