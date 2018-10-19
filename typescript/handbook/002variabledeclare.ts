let testFor = function () {
    for (var i = 0; i < 10; i++) {
        setTimeout(function () { console.log(i); }, 100 * i);
        console.log('itr=' + i);
    }
}
let testFor1 = function () {
    for (let i = 0; i < 10; i++) {
        setTimeout(function () { console.log(i); }, 100 * i);
        console.log('itr=' + i);
    }
}
let testFor2 = function () {
    for (var i = 0; i < 10; i++) {
        setTimeout(() => console.log(i), 100 * i);
        console.log('itr=' + i);
    }
}

let testDeconstruction = function () {
    let o = {
        a: "foo",
        b: 12,
        c: "bar"
    };
    // let { a, b } = o;
    // let a, b;
    // ({ a, b } = { a: "baz", b: 101 });
    let { a: newName1, b: newName2 } = o;
    console.log(newName1, newName2);
}
testDeconstruction();


