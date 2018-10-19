let testOptionBags = function () {
    interface SquareConfig {
        color?: string;
        width?: number;
    }

    function createSquare(config: SquareConfig): { color: string; area: number } {
        let newSquare = { color: "white", area: 100 };
        if (config.color) {
            newSquare.color = config.color;
        }
        if (config.width) {
            newSquare.area = config.width * config.width;
        }
        return newSquare;
    }
    let mySquare = createSquare({ color: "black" });
    console.log(mySquare);
}

let testOptionBagsFail = function () {
    interface SquareConfig {
        color?: string;
        width?: number;
        [propName: string]: any;
    }

    function createSquare(config: SquareConfig): { color: string; area: number } {
        let newSquare = { color: "white", area: 100 };
        if (config.color) {
            newSquare.color = config.color;
        }
        if (config.width) {
            newSquare.area = config.width * config.width;
        }
        return newSquare;
    }
    let mySquare1 = createSquare({ colour: "red", width: 100 });
    let mySquare = createSquare({ colour: "red", width: 100 } as SquareConfig);
}

let testFunctionInterface1 = function () {
    interface SearchFunc {
        (source: string, subString: string): boolean;
    }
    let mySearch: SearchFunc;
    mySearch = function (source: string, subString: string) {
        let result = source.search(subString);
        return result > -1;
    }
    console.log(mySearch("ababa", "bab"))
}

let testFunctionInterface2 = function () {
    interface SearchFunc {
        (source: string, subString: string): boolean;
    }
    let mySearch: SearchFunc = function (src: string, sub: string): boolean {
        let result = src.search(sub);
        return result > -1;
    }
    console.log(mySearch("ababa", "bab"));
}

let testIndexType = function () {
    interface StringArray {
        [index: number]: string;
    }
    let myArray: StringArray;
    myArray = ["Bob", "Fred"];
    let myStr: string = myArray[0];
    console.log(myStr);
}
let testIndexTypeWrong1 = function () {
    class Animal {
        name: string = 'Animal';
    }
    class Dog extends Animal {
        breed: string = 'Dog';
    }

    // 错误：使用数值型的字符串索引，有时会得到完全不同的Animal!
    interface NotOkay {
        // [x: number]: Animal;
        [x: string]: Dog;
    }
}
let testIndexTypeWrong2 = function () {
    interface NumberDictionary {
        [index: string]: number;
        length: number;    // 可以，length是number类型
        // name: string       // 错误，`name`的类型与索引类型返回值的类型不匹配
    }
}

let testIndexTypeReadonly = function () {
    interface ReadonlyStringArray {
        readonly [index: number]: string;
    }
    let myArray: ReadonlyStringArray = ["Alice", "Bob"];
    console.log(myArray[1])
    // myArray[1] = "Mallory"; // error!
}

let testClass1 = function () {
    interface ClockInterface {
        currentTime: Date;
        setTime(d: Date): void;
    }

    class Clock implements ClockInterface {
        currentTime: Date = new Date();
        setTime(d: Date) {
            this.currentTime = d;
        }
        constructor(h: number, m: number) { }
    }
}
let testClass2 = function () {
    interface ClockConstructor {
        new(hour: number, minute: number): any;
    }
    //这里因为当一个类实现了一个接口时，只对其实例部分进行类型检查。 constructor存在于类的静态部分，所以不在检查的范围内。
    // class Clock implements ClockConstructor {
    //     constructor(h: number, m: number) {
    //     }
    // }
}

let testClass3 = function () {
    interface ClockConstructor {
        new(hour: number, minute: number): ClockInterface;
    }
    interface ClockInterface {
        tick(): void;
    }

    function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
        return new ctor(hour, minute);
    }

    class DigitalClock implements ClockInterface {
        constructor(h: number, m: number) { }
        tick() {
            console.log("beep beep");
        }
    }
    class AnalogClock implements ClockInterface {
        constructor(h: number, m: number) { }
        tick() {
            console.log("tick tock");
        }
    }

    let digital = createClock(DigitalClock, 12, 17);
    let analog = createClock(AnalogClock, 7, 32);
}
testClass1();
