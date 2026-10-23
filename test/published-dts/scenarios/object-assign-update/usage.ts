import {objectAssign, objectUpdate} from 'unutils/object';

// Resolving the published types must pull the bundled `ts-extras` + `type-fest`
// type graph in cleanly (a bare re-export can ship an unresolvable import)
const merged = objectAssign({a: 1}, {b: 2});
void merged.a;
void merged.b;

const user = {name: 'Ada', age: 41};
const updated = objectUpdate(user, {age: 42});
void updated.name;

// @ts-expect-error - objectUpdate rejects a key absent from the target
objectUpdate(user, {email: 'ada@example.com'});
