let testBoolean = function () {
    // boolean
    let isDone: boolean = false;
    console.log(isDone);
}
let testNumber = function () {
    // number
    let decLiteral: number = 6;
    let hexLiteral: number = 0xf00d;
    let binaryLiteral: number = 0b1010;
    let octalLiteral: number = 0o744;

    console.log(octalLiteral);
}

let testString = function () {
    //string
    let username: string = 'bob';
    username = 'smith';
    console.log(username);
    //let username: string = `Gene`;
    let age: number = 37;
    let sentence: string = `Hello, my name is ${username}.

    I'll be ${ age + 1} years old next month.`;
    console.log(sentence);
}

let testArray = function () {
    let list1: number[] = [1, 2, 3];
    let list2: Array<number> = [1, 2, 3];
    console.log(list1);
    console.log(list2);
}

let testTuple = function () {
    // Declare a tuple type
    let x: [string, number];
    // Initialize it
    x = ['hello', 10]; // OK
    // Initialize it incorrectly
    //x = [10, 'hello']; // Error
    console.log(x);
}

let testEnum1 = function () {
    enum Color { Red, Green, Blue }
    let c: Color = Color.Green;
    console.log(c);
}
let testEnum2 = function () {
    enum Color { Red = 1, Green, Blue }
    let colorName: string = Color[2];
    // 显示'Green'因为上面代码里它的值是2
    console.log(colorName);
}

let testAny = function () {
    let notSure: any = 4;
    notSure = "maybe a string instead";
    console.log(notSure);
    notSure = false; // okay, definitely a boolean
    console.log(notSure);
}
let testAny1 = function () {
    let notSure: any = 4;
    notSure.ifItExists(); // okay, ifItExists might exist at runtime
    notSure.toFixed(); // okay, toFixed exists (but the compiler doesn't check)

    let prettySure: Object = 4;
    // prettySure.toFixed(); // Error: Property 'toFixed' doesn't exist on type 'Object'.
}

let testVoid = function () {
    function warnUser(): void {
        console.log("This is my warning message");
    }
    console.log(warnUser());
}

let testNever = function () {
    // 返回never的函数必须存在无法达到的终点
    function error(message: string): never {
        throw new Error(message);
    }

    // 推断的返回值类型为never
    function fail() {
        return error("Something failed");
    }

    // 返回never的函数必须存在无法达到的终点
    function infiniteLoop(): never {
        while (true) {
        }
    }
}
testNever();
let testObject = function () {
    let someValue: any = "this is a string";
    let strLength: number = (someValue as string).length;
    //  strLength = strLength.length; //error
}
