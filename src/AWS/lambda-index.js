'use strict';

console.log('Loading function');

exports.handler = (event, context, callback) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    var response = {'message': 'Hello, world!'};
    
    callback(null, {
        statusCode: false ? '400' : '200',
        body: false ? 'Oopsie!' : JSON.stringify(event),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    
};