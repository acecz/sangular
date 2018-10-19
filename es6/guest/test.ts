
const decorator_test_01 = function () {
    function testable(target) {
        target.isTestable = true;
        return target;
    }

    @testable
    class MyTestableClass {
        // ...
    }
    let myTestableClass = testable(MyTestableClass) || MyTestableClass;
    console.log(myTestableClass.isTestable)
}

const decorator_test_02 = function () {
    function testable(target) {
        target.isTestable = true;
        return target;
    }
    class MyTestableClass {
        // ...
    }
    let myTestableClass = testable(MyTestableClass) || MyTestableClass;
    console.log(myTestableClass.isTestable)
}

const decorator_test_03 = function () {
    
}

decorator_test_03();