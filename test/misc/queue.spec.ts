import {Queue} from '../../src/misc/queue.ts';

describe('misc/Queue', () => {
  it('dequeues items in the order they were enqueued', () => {
    const queue = new Queue<string>();
    queue.enqueue('a');
    queue.enqueue('b');

    expect(queue.size).toBe(2);
    expect(queue.dequeue()).toBe('a');
    expect(queue.dequeue()).toBe('b');
    expect(queue.dequeue()).toBeUndefined();
    expect(queue.size).toBe(0);
  });

  it('peeks at the front item without removing it', () => {
    const queue = new Queue<number>();

    expect(queue.peek()).toBeUndefined();

    queue.enqueue(1);
    queue.enqueue(2);

    expect(queue.peek()).toBe(1);
    expect(queue.size).toBe(2);
  });

  it('iterates over the items from front to back without removing them', () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    queue.enqueue(2);
    queue.enqueue(3);
    queue.dequeue();

    expect([...queue]).toStrictEqual([2, 3]);
    expect(queue.size).toBe(2);
  });

  it('removes all items with clear and keeps working after it', () => {
    const queue = new Queue<number>();
    queue.enqueue(1);
    queue.clear();

    expect(queue.size).toBe(0);
    expect(queue.dequeue()).toBeUndefined();

    queue.enqueue(2);

    expect([...queue]).toStrictEqual([2]);
  });

  it('stores undefined items', () => {
    const queue = new Queue<undefined>();
    queue.enqueue(undefined);

    expect(queue.size).toBe(1);
  });
});
