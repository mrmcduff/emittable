"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventEmitter_1 = require("./eventEmitter");
console.log('hello world');
const cee = new eventEmitter_1.CustomEventEmitter();
function foo(x) {
    console.log(`Foo was called with ${x}`);
}
function bar(x, y) {
    console.log(`Bar was called and the sum was ${x + y}`);
}
// cee.on('foo', foo);
// cee.on('foo', foo);
// cee.on('bar', bar);
// cee.on('bar', bar);
// cee.emit('foo', 3);
// cee.emit('bar', 1, 2);
// cee.off('bar', bar);
// cee.emit('bar', 1, 3);
const onMessage1 = body => {
    console.log('message 1: ', body);
    cee.off('message', onMessage1);
};
const onMessage2 = body => console.log('message 2: ', body);
const onMessage3 = body => console.log('message 3: ', body);
cee.shout('message', onMessage1);
cee.once('message', onMessage2);
cee.on('message', onMessage3);
cee.emit('message', 'foo');
cee.emit('message', 'foo');
//# sourceMappingURL=index.js.map