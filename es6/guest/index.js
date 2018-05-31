const f = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(123);
        }, 2000);
    });
};

const testAsync = async () => {
    const t = await f();
    console.log(t);
};

// testAsync();

let foo;
({ foo } = { foo: 1 });
console.log(foo);
let baz;
({ bar: baz } = { bar: 1 });
console.log(baz);

let obj = {};
let arr = [];
({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
console.log(obj);

var { x = 3 } = { x: undefined };
console.log(x);
var { x = 3 } = { x: null };
console.log(x);

let { log, sin, cos } = Math;
console.log(log(5));

console.log([[1, 2], [3, 4]].map(([a, b]) => a + b));

function fn() {
    return "Hello World";
}
let aaa = `foo ${fn()} bar`;
console.log(aaa);
// foo Hello World bar

const tmpl = addrs => `
<table>
${addrs.map(addr => `
    <tr><td>${addr.first}</td></tr>
    <tr><td>${addr.last}</td></tr>
`).join('')}
</table>`

const data = [
    { first: '<Jane>', last: 'Bond' },
    { first: 'Lars', last: '<Croft>' },
];
console.log(tmpl(data));

let str = 'return ' + '`Hello ${name}!`';
let func = new Function('name', str);
console.log(func('Jack'));

var total = 30;
var msg = passthru`The total is ${total} (${total * 1.05} with tax)`;
function passthru(literals) {
    console.log(literals);
    console.log(arguments);
    var result = '';
    var i = 0;
    while (i < literals.length) {
        result += literals[i++];
        if (i < arguments.length) {
            result += arguments[i];
        }
    }
    return result;
}

console.log(msg);