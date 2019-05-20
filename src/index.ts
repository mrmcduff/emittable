import {CustomEventEmitter} from './eventEmitter';

const cee = new CustomEventEmitter();

const onMessage1 = body => {
  console.log('message 1: ', body)
  cee.off('message', onMessage1)
};
const onMessage2 = body => console.log('message 2: ', body);
const onMessage3 = body => console.log('message 3: ', body);

cee.shout('message', onMessage1);
cee.once('message', onMessage2);
cee.on('message', onMessage3);
cee.emit('message', 'foo');
cee.emit('message', 'foo');