// counter.js
import { createEvent, createStore } from 'effector';

export const $counter = createStore(0);

export const incremented = createEvent();
export const decremented = createEvent();
export const reset = createEvent<number>();

$counter.on(incremented, (counter) => counter + 1);
$counter.on(decremented, (counter) => counter - 1);
$counter.on(reset, (_, payload) => payload);

// // и вызовите событие в вашем приложении
// incremented();
// // counter увеличиться на 1
// decremented();
// // counter уменьшится на -1
// decremented();
// // counter уменьшится на -1
