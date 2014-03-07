Example:
    
    DEBUGX.allow('*');
    DEBUGX.deny('*');
    DEBUGX.allow(function(group){
        return group === 'print';
    });
    DEBUGX.deny(function(group){
        return group === 'hidden';
    });

    DEBUGX.format('{{time}} >> {{group}} >> {{message}}');
    DEBUGX.error('print', 'message');
    DEBUGX.warn('print', 'message');
    DEBUGX.info('print', 'message');
    
TODO:

    
