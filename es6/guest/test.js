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

const generator_prototype_throw_test = function () {
    let g = function* () {
        try {
            yield;
        } catch (e) {
            console.log('内部捕获1', e);
        }
    };

    let i = g();
    i.next();

    try {
        i.throw('a');
        i.throw('b');
    } catch (e) {
        console.log('外部捕获', e);
    }
}

const generator_aync_test_01 = function () {
    let fetch = require('node-fetch');

    function* gen() {
        var url = 'https://api.github.com/users/github';
        var result = yield fetch(url);
        console.log(result.bio);
    }
    let g = gen();
    let result = g.next();

    result.value.then(function (data) {
        return data.json();
    }).then(function (data) {
        console.log(data);
        g.next(data);
    });
}

async function* createAsyncIterable(syncIterable) {
    for (const elem of syncIterable) {
        yield elem;
    }
}

const async_func_asyncIterator_01 = function () {
    async function f() {
        const asyncIterable = createAsyncIterable(['a', 'b']);
        const asyncIterator = asyncIterable[Symbol.asyncIterator]();
        console.log(await asyncIterator.next());
        // { value: 'a', done: false }
        console.log(await asyncIterator.next());
        // { value: 'b', done: false }
        console.log(await asyncIterator.next());
        // { value: undefined, done: true }
    }
    f().then(resolve => console.log(resolve))
}

const async_func_asyncIterator_02 = function () {
    let fetch = require('node-fetch');
    // Note the * after "function"
    async function* asyncRandomNumbers() {
        // This is a web service that returns a random number
        const url = 'https://www.random.org/decimal-fractions/?num=1&dec=10&col=1&format=plain&rnd=new';
        while (true) {
            const response = await fetch(url);
            const text = await response.text();
            yield Number(text);
        }
    }
    async function example() {
        for await (const number of asyncRandomNumbers()) {
            console.log(number);
            if (number > 0.95) break;
        }
    }
    example().then(r => { });
}

const async_func_asyncIterator_03 = function () {
    async function inner_func() {
        const asyncIterable = createAsyncIterable(['a', 'b']);
        const asyncIterator = asyncIterable[Symbol.asyncIterator]();
        const [{ value: v1 }, { value: v2 }] = await Promise.all([
            asyncIterator.next(), asyncIterator.next()
        ]);
        console.log(v1, v2);
    }
    inner_func().then(r => { });
}

const async_func_asyncIterator_04 = function () {
    async function f() {
        for await (const x of createAsyncIterable(['a', 'b'])) {
            console.log(x);
        }
    }
    f().then(r => { });
}

const async_func_yield_01 = function () {
    async function* gen1() {
        yield 'a';
        yield 'b';
        return 2;
    }

    async function* gen2() {
        // result 最终会等于 2
        const result = yield* gen1();
    }
    // let g2 = gen2();
    // g2.next().then(r => console.log(r));
    // g2.next().then(r => console.log(r));
    // g2.next().then(r => console.log(r));

    (async function () {
        for await (const x of gen2()) {
            console.log(x);
        }
    })();
}


const class_intro_01 = function () {
    class Point {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }

        toString() {
            return '(' + this.x + ', ' + this.y + ')';
        }
    }

    console.log(typeof Point)
    console.log(Point === Point.prototype.constructor)
}

const class_express_01 = function () {
    const MyClass = class Me {
        getClassName() {
            return Me.name;
        }
    };
    let inst = new MyClass();
    console.log(inst.getClassName());
    console.log(Me.name);
}

const class_express_02 = function () {
    let person = new class {
        constructor(name) {
            this.name = name;
        }
        sayName() {
            console.log(this.name);
        }
    }('张三');
    person.sayName();
}

const class_this_01 = function () {
    class Logger {
        printName(name = 'there') {
            this.print(`Hello ${name}`);
        }
        print(text) {
            console.log(text);
        }
    }
    const logger = new Logger();
    const { printName } = logger;
    printName();
}

const class_this_02 = function () {
    class Logger {
        constructor() {
            this.printName = (name = 'there') => {
                this.print(`Hello ${name}`);
            };
        }
        print(text) {
            console.log(text);
        }
    }
    const logger = new Logger();
    const { printName } = logger;
    printName();
    printName('ZhangSan');
}


const class_this_03 = function () {
    class Logger {
        constructor() {
            this.printName = this.printName.bind(this);
        }
        printName(name = 'there') {
            this.print(`Hello ${name}`);
        }
        print(text) {
            console.log(text);
        }
    }
    const logger = new Logger();
    const { printName } = logger;
    printName();
    printName('WangWu');
}
const class_getset_01 = function () {
    class MyClass {
        prop;
        constructor() {
            this.prop = 0
        }
        get prop() {
            console.log('getter: ' + Object.getPrototypeOf(this)['prop']);
            return 'getter';
        }
        set prop(value) {
            console.log('setter: ' + value);
        }
    }

    let inst = new MyClass();
    inst.prop = 123;
    // setter: 123
    console.log('get: ' + inst.prop);
}

const class_extends_01 = function () {
    class A {
        constructor() {
            this.x = 1;
        }
        static print() {
            console.log(this.x);
        }
    }
    class B extends A {
        constructor() {
            super();
            this.x = 2;
        }
        static m() {
            super.print();
        }
    }
    // B.x = 3;
    B.m() // 3
}

const class_extends_02 = function () {
    function MyArray() {
        Array.apply(this, arguments);
    }

    MyArray.prototype = Object.create(Array.prototype, {
        constructor: {
            value: MyArray,
            writable: true,
            configurable: true,
            enumerable: true
        }
    });
    var colors = new MyArray();
    colors[0] = "red";
    // 0
    console.log(colors.length)

    colors.length = 0;
    // "red"
    console.log(colors[0])
}

const class_extends_03 = function () {
    class MyArray extends Array {
        constructor(...args) {
            super(...args);
        }
    }

    var colors = new MyArray();
    colors[0] = "red";
    // 0
    console.log(colors.length)

    colors.length = 0;
    // "red"
    console.log(colors[0])
}


const decorator_test_01 = function () {
    function testable(target) {
        target.isTestable = true;
    }

    @testable
    class MyTestableClass {
        // ...
    }
    MyTestableClass = testable(MyTestableClass)||MyTestableClass;
    console.log(MyTestableClass.isTestable)
}

const decorator_test_02 = function () {
    function testable(target) {
        target.isTestable = true;
    }
    class MyTestableClass {
        // ...
    }
    MyTestableClass = testable(MyTestableClass)||MyTestableClass;
    console.log(MyTestableClass.isTestable)
}

const decorator_test_03 = function () {
    function testable(isTestable) {
        return function(target) {
          target.isTestable = isTestable;
        }
      }
      
      @testable(true)
      class MyTestableClass {}
      MyTestableClass.isTestable // true
      
      @testable(false)
      class MyClass {}
      MyClass.isTestable // false
    console.log(MyClass.isTestable)
}

decorator_test_03();


