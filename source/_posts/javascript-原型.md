---
title: javascript 原型
date: 2017-05-14 07:44:14
tags: [javascript]
---


参考

* <http://www.cnblogs.com/wilber2013/p/4924309.html>

先来张图

{% asset_img "prototype.jpg" "" %}

<!--more-->

抄一些重点

* 原型是一个对象
* 对象有 `__proto__` 属性
* 函数对象有 prototype 属性
* 原型对象有 constructor 属性
* 当一个函数被用作构造函数来创建实例时，该函数的 prototype 属性值将被作为原型赋值给所有对象实例，也就是设置实例的 `__proto__` 属性
* 在 JavaScript 中有个 Function 对象（类似Object），这个对象本身是个函数；所有的函数（包括 Function，Object）的原型`__proto__` 都是 Function.prototype
* hasOwnProperty 是 Object.prototype 的一个方法，该方法能判断一个对象是否包含自定义属性而不是原型链上的属性，因为 hasOwnProperty 是 JavaScript 中唯一一个处理属性但是不查找原型链的函数
* Function instanceof Object：instanceof 运算符可以用来判断 Object 的 prototype 属性 是否存在 Function 的原型链上



函数对象

```
// 函数声明
function add(i, j) {
  return i + j;
}

// 函数表达式
// const add = function (i, j) {
//   return i + j;
// }

// 函数实例化
// const add = new Function('i', 'j', 'return (i+j)');

console.log(add(1, 2))
```

测试

```
function Person(name, age) {
  this.name = name;
  this.age = age;

  this.getInfo = function () {
    console.log(this.name + " is " + this.age + " years old");
  };
}

var will = new Person("Will", 28);

console.log( ' >> will.__proto__ >>                                  ' , will.__proto__);
console.log( ' >> will.constructor >>                                ' , will.constructor);
console.log( ' >> will.prototype >>                                  ' , will.prototype);


console.log( ' >> Person.__proto__ >>                                ' , Person.__proto__);
console.log( ' >> Person.constructor >>                              ' , Person.constructor);
console.log( ' >> Person.prototype >>                                ' , Person.prototype);


console.log( ' >> will.__proto__ === Person.prototype >>             ' , will.__proto__ === Person.prototype);
console.log( ' >> Person.prototype.__proto__ >>                      ' , Person.prototype.__proto__);
console.log( ' >> Person.prototype.constructor >>                    ' , Person.prototype.constructor);
console.log( ' >> Person.prototype.constructor === Person >>         ' , Person.prototype.constructor === Person);


console.log( ' >> Person.prototype.__proto__ === Object.prototype >> ' , Person.prototype.__proto__ === Object.prototype);
console.log( ' >> typeof Object >>                                   ' , typeof Object);
console.log( ' >> Object >>                                          ' , Object);
console.log( ' >> Object.prototype >>                                ' , Object.prototype);
console.log( ' >> Object.prototype.__proto__ >>                      ' , Object.prototype.__proto__);
console.log( ' >> Object.prototype.constructor >>                    ' , Object.prototype.constructor);
```

结果


```
 >> will.__proto__ >>                                   Person {}
 >> will.constructor >>                                 function Person(name, age) {
  this.name = name;
  this.age = age;

  this.getInfo = function () {
    console.log(this.name + " is " + this.age + " years old");
  };
}
 >> will.prototype >>                                   undefined
 >> Person.__proto__ >>                                 function () {}
 >> Person.constructor >>                               function Function() { [native code] }
 >> Person.prototype >>                                 Person {}
 >> will.__proto__ === Person.prototype >>              true
 >> Person.prototype.__proto__ >>                       {}
 >> Person.prototype.constructor >>                     function Person(name, age) {
  this.name = name;
  this.age = age;

  this.getInfo = function () {
    console.log(this.name + " is " + this.age + " years old");
  };
}
 >> Person.prototype.constructor === Person >>          true
 >> Person.prototype.__proto__ === Object.prototype >>  true
 >> typeof Object >>                                    function
 >> Object >>                                           function Object() { [native code] }
 >> Object.prototype >>                                 {}
 >> Object.prototype.__proto__ >>                       null
 >> Object.prototype.constructor >>                     function Object() { [native code] }
```






