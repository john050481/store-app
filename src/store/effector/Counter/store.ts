import { createEvent, createStore } from 'effector';

export const $counter = createStore(0);

export const incremented = createEvent();
export const decremented = createEvent();
export const reset = createEvent<number>();

$counter.on(incremented, (counter) => counter + 1);
$counter.on(decremented, (counter) => counter - 1);
$counter.on(reset, (_, payload) => payload);
