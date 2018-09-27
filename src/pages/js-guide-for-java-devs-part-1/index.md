---
title: "JS guide for Java developers: Part 1 — scope, closures, global context, this, and undefined"
date: "2018-09-17T23:46:37.121Z"
---

![](https://cdn-images-1.medium.com/max/1000/1*7aJPlxn8gwhI7JjcBFr-tQ.jpeg)
<span class="figcaption_hack">Photo by [Caspar
Rubin](https://unsplash.com/photos/fPkvU7RDmCo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
on
[Unsplash](https://unsplash.com/search/photos/javascript?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)</span>

This post series is aimed at Java developers wanting to learn Javascript. It is
an attempt to **summarize** a set of core language concepts and best practices
while comparing those concepts to analogous Java.

#### Scope

A scope (or lexical scope) is the region in the source code where entities are
reachable by their names. In other words, it is the code section where variables
“live” and can be referenced. Most of C-based languages are block-scoped,
meaning that a variable’s lifespan is set to the containing block of code (a
function body, an if-statement body, a for loop body, etc.).

```java
// Java
public class Main {

    public static void main(String args[]) {

        String name = "Michael";

        if (name.equals("Michael")) {
            String lastName = "Jackson";
        }

        System.out.println(lastName); // Compiler throws an error: Cannot resolve symbole 'lastName'
    }
    
}
```

In JS, this is very different because the scope of the variable depends on how
you declare it. If the variable is declared using the `var` keyword, its scope is
set to the containing **function**. This means that no matter which containing
block surrounds it, the variable will be available for reference everywhere
inside of the enclosing function. ES6 introduced two new keywords for variable
declaration: `let` and `const`. They both create **block-scoped** variables, but
`const` makes it a constant, meaning that it cannot be reassigned or re-declared
(in a way, this is like declaring `final` attributes in Java). Notice that
**declaring a variable with `const` does not prevent you from mutating the
variable (modifying internal properties).**

```javascript
// Javascript
(function() {
    const name = 'Michael';

    if (name == 'Michael') {
        const lastName = 'Jackson'; // Since lastName was defined with 'const' it is block-scoped. (The same happens with 'let).
        var abilities = ['singning', 'dancing']; // abilities on the other hand is declared with 'var', so it is function-scoped.
    }

    console.log(abilities);  // [ 'singning', 'dancing' ]
    console.log(lastName); // ReferenceError: lastName is not defined.
}());
```

It is advisable to declare the variables right at the beginning of the function
where they’ll be used, instead of declaring them at the latest possible moment
as you would do in Java. This will make the code much easier for you and other
developers to understand.

*Read more*:

* [https://en.wikipedia.org/wiki/Scope_(computer_science)](https://en.wikipedia.org/wiki/Scope_(computer_science))
* [https://www.digitalocean.com/community/tutorials/understanding-variables-scope-hoisting-in-javascript](https://www.digitalocean.com/community/tutorials/understanding-variables-scope-hoisting-in-javascript)
* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)

#### Closures

Although they exist in Java 8 (using lambdas) and can be simulated with
anonymous classes, some developers are not aware of them. Closures consist in a
function and the lexical scope within which that function was declared. The
function gets access to the enclosing scope’s variables and arguments, even if
it was already returned. Remember that in Javascript, **functions are
first-class citizens**, so a function can be assigned to a variable, passed as
an argument or returned from another function (this is called “higher-order
functions”), so it is important to understand the accessible variables from any
function.

```java
// Java
import java.util.concurrent.atomic.AtomicInteger;
import java.util.function.Function;

public class Main {

    public static void main(String args[]) {

        // Closure
        Function<Boolean, Function> getSayHiFunc = (upperCase) -> {
            AtomicInteger called = new AtomicInteger();

            Function<String, String> sayHi = (name) -> {
                called.getAndIncrement();
                String greeting = String.format("Hi %s! This has been called %s times.", name, called);
                return upperCase ? greeting.toUpperCase() : greeting;
            };

            return sayHi;
        };

        Function f = getSayHiFunc.apply(false);

        System.out.println(f.apply("Paul")); // Hi Paul! This has been called 1 times.
        System.out.println(f.apply("John")); // Hi John! This has been called 2 times.
        System.out.println(f.apply("Peter")); // Hi Peter! This has been called 3 times.
        System.out.println(f.apply("Mark")); // Hi Mark! This has been called 4 times.

    }
}
```
<br />

```javascript
// Javascript
function getSayHiFunc(upperCase) {
  var called = 0;
  
  return function sayHi(name) {
    called ++;
    var greeting = `Hi ${name}! This has been called ${called} times.`;
    return upperCase ? greeting.toUpperCase() : greeting;
  }
}

var f = getSayHiFunc(false);

console.log(f('Paul')); // Hi Paul! This has been called 1 times.
console.log(f('John')); // Hi John! This has been called 2 times.
console.log(f('Peter')); // Hi Peter! This has been called 3 times.
console.log(f('Mark')); // Hi Mark! This has been called 4 times.
```

This concept is important to understand the visibility of variables inside
nested functions and objects. In both implementations we can verify that even
though the function “getSayHiFunc” has returned, “sayHi” still has visibility on
`called` and `upperCase` .

*Read more*:

* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

#### Global Context

In Java, every single variable or function is contained inside a `class` . By
using classes as basic building blocks of the language, it enforces it’s own
vision of Object Oriented Programming. This means there’s no global space where
unwanted collisions occur in an unpredictable manner.

In JS you’re allowed to declare functions and variables outside of every single
function in your program. **This is considered a bad practice because it
pollutes the global context. **To understand what the “global context” is, let’s
first discuss what an “execution context” means.

An execution context refers to the *environment* in which the current code is
running. It will create the lexical scope, link it to enclosing scopes (this is
called the “scope chain”) and provide a value for the keyword `this` . When your
JS application runs, the first execution context created is called “global
context”. Then, every time a function gets called, it will create a new
execution context for it and push it to the “call stack” or “execution context
stack”. When a function ends its execution, its execution context will be popped
from the stack.

The big problem with the global context is that your entire application shares
it, and its variables can be modified anywhere including your project’s
dependencies. This means that if multiple scripts are loaded in the same page,
any execution context will be able to reference, mutate or re-declare global
variables. A solution to avoid declaring variables in the global context, is to
use an “Immediately-Invoked Function Expression”. IIFE syntax is used to declare
a function and execute it right after creation. This will create a brand new
execution context where we can safely declare our variables.

```javascript
/* Example of IIFE in Javascript */
(function() {
    var a = 'Safely declared variable'; // Not accessible from the global context
    /**
     * More code here!
     */
}());
```

*Read more*:

* [https://hackernoon.com/execution-context-in-javascript-319dd72e8e2c](https://hackernoon.com/execution-context-in-javascript-319dd72e8e2c)
* [https://www.valentinog.com/blog/js-execution-context-call-stack/](https://www.valentinog.com/blog/js-execution-context-call-stack/)
* [https://codeburst.io/js-demystified-04-execution-context-97dea52c8ac6](https://codeburst.io/js-demystified-04-execution-context-97dea52c8ac6)
* [https://codeburst.io/javascript-what-the-heck-is-an-immediately-invoked-function-expression-a0ed32b66c18](https://codeburst.io/javascript-what-the-heck-is-an-immediately-invoked-function-expression-a0ed32b66c18)

#### The “this” keyword

This is a topic that confuses newcomers a lot and has been well explained in
multiple articles on the web. In Java, the `this` keyword is always pointing to
the current object instance. It can be used to access properties (avoiding
shadows on methods or constructors) or to call another constructor in the same
class.

```java
// Java
public class Main {

    public static void main(String args[]) {
        Person john = new Person("John", "Smith");

        System.out.println(john.toString()); // Name: John ; Last Name: Smith ; Age: 32
        john.increaseAge(5);
        System.out.println(john.toString()); // Name: John ; Last Name: Smith ; Age: 37
    }

}

class TimeMachine {
    public static void increaseAge(Person person, int years) {
        person.setAge(person.getAge() + years);
    }
}

class Person {
    private String name;
    private String lastName;
    private int age;

    public Person(String name, String lastName) {
        // "this" references another class constructor
        this(name, lastName, 32);
    }

    private Person(String name, String lastName, int age) {
        // "this" references the current object instance
        // and it's used to avoid shadows
        this.name = name;
        this.lastName = lastName;
        this.age = age;
    }

    public void increaseAge(int years) {
        // "this" references the current object instance
        TimeMachine.increaseAge(this, years);
    }

    public String toString() {
        // "this" references the current object instance
        return String.format("Name: %s ; Last Name: %s ; Age: %s", this.name, this.lastName, this.age);
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }
}
```

In Javascript, the `this` keyword is bound on execution time to a value
depending on its execution context. Remembering the following rules should be
enough to avoid catastrophic mistakes:

1.  When used in an object method, `this` will be bound to the method’s owner
object.
1.  When used in a Constructor Function, `this` will be bound to the constructed
object (which is implicitly returned).
1.  When used in the Global Context (out of any function scope), `this` will be
bound to the global object. The global object will be `window` in the browser,
or `undefined`when using strict mode.
1.  When used inside a “simple function” (meaning that it’s not a constructor
function nor an object method) `this` will be bound to the global object.
1.  Arrow functions are a completely different way to declare functions since
ES6/ES2015. When using `this` inside of an arrow function, it will be bound to
the enclosing lexical context’s “this” value. That is to say, it will take the
`this` value from the enclosing context where the arrow function was created.

```javascript
// Javascript
/* Constructor functions */
const Animal = function(name, legsCount, barks) {
    /* 'this' references the instantiated object */
    this.name = name;
    this.barks = barks;
    this.legsCount = legsCount;
};

const dog = new Animal('dog', 4, true);
const cat = new Animal('cat', 4, false);
const snake = new Animal('snake', 0, false);

console.log(dog, cat, snake); // Animal { name: 'dog', barks: true, legsCount: 4 } Animal { name: 'cat', barks: false, legsCount: 4 } Animal { name: 'snake', barks: false, legsCount: 0 }

/* Classes */
class Language {
    constructor(type, name) {
        /* 'this' references the instantiated object */
        this.type = type;
        this.name = name;
    }
}

const german = new Language('natural', 'german');
const spanish = new Language('natural', 'spanish');
const javascript = new Language('formal', 'javascript');

console.log(german, javascript, spanish); // Language { type: 'natural', name: 'german' } Language { type: 'formal', name: 'javascript' } Language { type: 'natural', name: 'spanish' }

/* Object methods */
var counter = {
    count: 0,
    increase: function() {
        /* 'this' references the counter object */
        this.count += 1;
        return this.count;
    }
};

console.log(counter.increase()); // 1
console.log(counter.increase()); // 2

/* Simple functions */

var simple1 = function() {
    /* 'this' references the global object */
    return this;
};

console.log(simple1()); // global object (window, when running in browser)

var simple2 = function() {
    /* 'this' is set to undefined because of strict mode */
    'use strict';
    return this;
};

console.log(simple2()); // undefined

/* In global context */

// 'this' is referencing the global object because we're not in strict mode.
console.log(this); // global object

/* Arrow functions */
var arrowCounter = {
    count: 0,
    increase: function() {
        var printCount = () => {
            /* Arrow functions inherit the enclosing scope's 'this' binding.
               In this case, 'this' was bound to the arrowCounter object in the upper scope */
            console.log(this.count);
        };

        this.count += 1;
        printCount();
        return this.count;
    }
};

arrowCounter.increase(); // 1
arrowCounter.increase(); // 2
```

You can also manually bind whatever object you want to `this` for simple
functions, by using one of the following:

* `Function.prototype.call()`
* `Function.prototype.apply()`
* `Function.prototype.bind()`

*Read more*:

* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function)

#### Equality operators

Another thing that differs a lot between the two languages is how you compare
entities. In Java, you can use the `== `operator to compare primitives such as
*integers* or *floats* or to compare object references. You can also implement
the “*Comparable*” interface or override `equals()`from Object in a predictive
and safe way.

```java
// Java
public class Main {
    public static void main(String args[]) {
        System.out.println(4 == 4); // true
        System.out.println('c' != 'd'); // true
        System.out.println(5.0 == 5); // true (with automatic type conversion).

        Temperature t1 = new Temperature(30);
        Temperature t2 = new Temperature(35);

        System.out.println(t1.equals(t2)); // false

        t1.increase(5);
        System.out.println(t1.equals(t2)); // true

        Temperature t3 = t1; // A new pointer to the same object

        System.out.println(t1 == t2); // false (comparing different object references)
        System.out.println(t1 == t3); // true! it is in fact the same object in memory
    }
}

class Temperature {

    private int value;

    public Temperature(int value) {
        this.value = value;
    }

    public void increase(int amount) {
        this.value += amount;
    }

    @Override
    public boolean equals(Object obj) {
        // We can override equals() behavior to our needs.
        return obj instanceof Temperature &&
                ((Temperature) obj).value == value;
    }

}
```

JS has a more flexible way of comparing entities, allowing both strict and
non-strict operators. A strict comparison verifies that both objects are the
same type before comparing values. In contrast, non-strict comparisons try to
enforce a type conversion when they don’t match before actually checking the
values. The problem with non-strict operators is that the type conversion
process is somehow hard to infer. [Here’s a table that exposes the complexity of
using the non-strict
operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#Loose_equality_using).
Therefore,** it is usually recommended to stick with the strict operators**,
which are `===`for equality and `!==` for inequality.

```javascript
// Javascript
var obj1 = {
    a: '1'
}

var obj2 = {
    a: '1'
}

var obj1Copy = obj1;

/* Strict operators */

console.log(1 === 1); // true
console.log(1 === '1'); // false
console.log(obj1 === obj2); // false (diferent object references)
console.log(obj1Copy === obj1); // true (same object in memory)
console.log(undefined === undefined); // true
console.log(null === undefined); // false
console.log(false === 'false'); // false
console.log(false === 0); // false


/* Non-strict operators */


console.log(1 == 1); // true
console.log(1 == '1'); // true ('1' is converted to a number type)
console.log(obj1 == obj2); // false (diferent object references)
console.log(obj1Copy == obj1); // true (same object in memory)
console.log(undefined == undefined); // true
console.log(null == undefined); // true
console.log(false == 'false'); // false
console.log(false == 0); // true



/* Some JS madness */


// NaN is not NaN
console.log(NaN === NaN); // false

// [] is equal to ![]
console.log([] == ![]); // true

// true is false
console.log(!!"false" == !!"true"); // true
```

*Read more*:

* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)

#### Undefined and null

Most languages have a keyword to represent the emptiness of a value. Java
has`null` , which is used exactly for that. It can also be used to remove an
object from memory by assigning `null` to its reference and waiting for the
garbage collector to clear it.

Unfortunately, in Javascript we can use two keywords for that purpose: `null`and
`undefined` . To make it short,`null` is a special type of object that
represents “nothing” and needs to be manually set to a variable. On the other
hand, `undefined` is a special value that JS’s engine automatically sets to
declared (but unassigned) variables. `undefined` can also be manually set to a
variable (just like `null`).

Because of this, an extremely common task such as checking if a value is defined
becomes confusing. I’ve seen many times developers understandably trying to
translate Java’s `if (a != null)` into something like this:

    // won't work if 'a' is null
    if (a === undefined) {
     ...
    }

    // won't work if 'a' is undefined
    if (a === null) {
     ...
    }

As you can see, there’s some trouble using this approach so it should be avoided
when possible.

*Read more*:

* [https://codeburst.io/javascript-null-vs-undefined-20f955215a2](https://codeburst.io/javascript-null-vs-undefined-20f955215a2)
* [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)

#### Checking if a value is defined

So, if it’s not advisable to strictly compare values to `null` or `undefined`,
how can we know if an element is defined in a reliable way? One approach could
be using the non-strict equality operator `==` . However, this approach doesn’t
contemplate empty strings or zeroes.

A better way to check if a value is defined is looking for “falsy” or “truthy”
values inside a condition check. Unlike Java, in JS you can evaluate elements
that are not of boolean type inside a “Boolean context”. This means you can put
numbers, strings, objects or arrays inside of “if” conditions, ternary
expressions, “for” loop conditions, etc. Javascript will convert the given type
to `true` or `false` under the hood, depending on the truthiness its value.

```javascript
// Javascript
const printIfTruthy = arg => {
    /* By putting the argument in a Boolean context, JS evaluates if it has a truthy or falsy value */
    if (arg) {
        console.log(arg);
    } else {
        console.log('The argument has a falsy value!');
    }
};

printIfTruthy('bread'); // bread
printIfTruthy(); // The argument has a falsy value!
printIfTruthy(null); // The argument has a falsy value!
printIfTruthy(undefined); // The argument has a falsy value!
printIfTruthy(2); // 2
printIfTruthy(0); // The argument has a falsy value!
printIfTruthy({}); // {} (it is a defined object)
printIfTruthy([]); // [] (it is a defined array)
printIfTruthy([].length); // The argument has a falsy value!
printIfTruthy(true); // true
```

*Read more*:

* [https://developer.mozilla.org/en-US/docs/Glossary/Truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy)
* [https://developer.mozilla.org/en-US/docs/Glossary/Falsy](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)

#### Awesome Resources

* [https://github.com/getify/You-Dont-Know-JS](https://github.com/getify/You-Dont-Know-JS)
* [https://github.com/denysdovhan/wtfjs](https://github.com/denysdovhan/wtfjs)
* [http://shop.oreilly.com/product/9780596517748.do](http://shop.oreilly.com/product/9780596517748.do)
* [https://www.udemy.com/understand-javascript/](https://www.udemy.com/understand-javascript/)

