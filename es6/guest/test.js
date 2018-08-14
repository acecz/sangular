const proxy_1 = function () {
    var obj = new Proxy({}, {
        get: function (target, key, receiver) {
            console.log(`get method invoked of key ${key} with value ${target[key]}`);
            return Reflect.get(target, key, receiver);
        },
        set: function (target, key, value, receiver) {
            console.log(`set method invoked of key ${key} with value ${value}`);
            return Reflect.set(target, key, value, receiver);
        }
    });

    obj.count = 1;
    ++obj.count;
}

const promise_someAsyncThing = function () {
    let someAsyncThing = function () {
        return new Promise(function (resolve, reject) {
            resolve(x);
        });
    };
    someAsyncThing().catch(function (error) {
        console.log('oh no', error);
    }).then(function () {
        console.log('carry on');
    });
}

const promise_all_test_1 = function () {
    let p1 = new Promise(function (resolve, reject) {
        resolve('hello');
    }).then(result => result).catch(e => e);
    // p2 handle with the error by itself if it has `catch` block
    let p2 = new Promise(function (resolve, reject) {
        throw new Error('something wrong!');
    }).then(result => result).catch(e => e);
    Promise.all([p1, p2]).then(result => console.log(result)).catch(e => console.log(e));
}

const promise_all_test_2 = function () {
    let p1 = new Promise(function (resolve, reject) {
        resolve('hello');
    }).then(result => result);
    let p2 = new Promise(function (resolve, reject) {
        throw new Error('something wrong!');
    }).then(result => result);
    // Promise.all handle with the error if the sub promise has no `catch` block
    Promise.all([p1, p2]).then(result => console.log(result)).catch(e => console.log(e));
}

const promise_preloadImage = function () {
    const preloadImage = function (path) {
        return new Promise(function (resolve, reject) {
            // wrong!! (node:1890) UnhandledPromiseRejectionWarning: ReferenceError: Image is not defined
            let image = new Image();
            image.onload = resolve;
            image.onerror = reject;
            image.src = path;
        })
    }
    let path = 'https://www.baidu.com/img/bd_logo1.png';
    let image = preloadImage(path);
    image.then(resolve => console.log(resolve));
}

const promise_generator_test = function () {
    function getFoo() {
        return new Promise(function (resolve, reject) {
            console.log('promise invoked');
            resolve('foo');
        })
    }
    let g = function* () {
        try {
            var foo = yield getFoo();
            console.log(foo);
        } catch (e) {
            console.log(e);
        }
    }
    function run(generator) {
        let it = generator();
        function go(result) {
            if (result.done) {
                console.log('done foo', result.value);
                return result.value;
            }
            return result.value.then(function (value) {
                console.log('then foo', value);
                return go(it.next(value));
            }).catch(function name(error) {
                return go(it.throw(error));
            });
        }
        go(it.next());
    }
    run(g);
}

const iterator_array_test_1 = function () {
    let arr = ['a', 'b', 'c'];
    let iter = arr[Symbol.iterator]();
    for (let i = 0; i < 4; i++) {
        let it = iter.next();
        console.log('value=' + it.value + ', done=' + it.done);
    }
}

const iterator_class_test_1 = function () {
    class RangeIterator {
        constructor(start, stop) {
            this.value = start;
            this.stop = stop;
        }

        [Symbol.iterator]() { return this; }

        next() {
            var value = this.value;
            if (value < this.stop) {
                this.value++;
                return { done: false, value: value };
            }
            return { done: true, value: undefined };
        }
    }

    function range(start, stop) {
        return new RangeIterator(start, stop);
    }

    for (let value of range(0, 3)) {
        console.log(value); // 0, 1, 2
    }
}

const forof_array_test_1 = function () {
    let arr = ['a', 'b', 'c', 'd'];
    for (let a in arr) {
        console.log(a); // 0 1 2 3
    }
    for (let a of arr) {
        console.log(a); // a b c d
    }
}

const forof_entries_test_1 = function () {
    let aArr = ['a1', 'a2', 'a3'];
    for (let pair of aArr.entries()) {
        console.log(pair);
    }
    for (let k of aArr.keys()) {
        console.log(k);
    }
    for (let v of aArr.values()) {
        console.log(v);
    }

    let aSet = new Set(["s1", "s2", "s3"]);
    for (let pair of aSet.entries()) {
        console.log(pair);
    }
    for (let k of aSet.keys()) {
        console.log(k);
    }
    for (let v of aSet.values()) {
        console.log(v);
    }

    var aMap = new Map();
    aMap.set('mk1', 'mv1');
    aMap.set('mk2', 'mv2');
    aMap.set('mk3', 'mv3');
    for (let pair of aMap.entries()) {
        console.log(pair);
    }
    for (let k of aMap.keys()) {
        console.log(k);
    }
    for (let v of aMap.values()) {
        console.log(v);
    }
}

const forof_object_generator_1 = function () {
    function* entries(obj) {
        for (let key of Object.keys(obj)) {
            yield [key, obj[key]];
        }
    }

    let obj = { a: 1, b: 2, c: 3 }
    for (let [key, value] of entries(obj)) {
        console.log(key, '->', value);
    }
}

const generator_next_test_1 = function () {
    function* f() {
        for (let i = 0; true; i++) {
            console.log('p-1');
            let reset = yield i;
            console.log('p-2');
            if (reset) { i = -1; console.log('p-3'); }
            console.log('p-4');
        }
    }

    let g = f();
    console.log(g.next());
    console.log(g.next());
    console.log(g.next());
    console.log(g.next(true));
}


const generator_next_test_2 = function () {
    function* foo(x) {
        let y = 2 * (yield (x + 1));
        console.log('y=' + y);
        let z = yield (y / 3);
        return (x + y + z);
    }

    let a = foo(5);
    console.log(a.next());
    console.log(a.next());
    console.log(a.next());

    let b = foo(5);
    console.log(b.next());
    console.log(b.next(12));
    console.log(b.next(13));
}

const generator_forof_test_3 = function () {
    function* foo() {
        yield 1;
        yield 2;
        return 3; // { value: 3, done: true }
    }
    let f1 = foo();
    for (let v of f1) {
        console.log(v);
    }
    let f2 = foo();
    for (let i = 0; i < 5; i++) {
        console.log(f2.next());
    }
}

const generator_forof_fibonacci_3 = function () {
    function* fibonacci() {
        let [prev, curr] = [0, 1];
        for (; ;) {
            yield curr;
            [prev, curr] = [curr, prev + curr];
        }
    }

    for (let n of fibonacci()) {
        if (n > 1000) break;
        console.log(n);
    }
}


generator_forof_fibonacci_3();