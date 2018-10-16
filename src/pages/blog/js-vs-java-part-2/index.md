---
title: "JS vs Java: Part 2 — Object creation, inheritance, encapsulation, and modules"
date: "2018-10-15T23:46:37.121Z"
---

![](./lila-de-lila.jpg)
<span class="figcaption_hack">Photo by [Photo by Lila de Lila on Unsplash](https://unsplash.com/)</span>

This is the second article from the "JS vs Java" series, where we discuss some important differences between both languages.
[In the first article we covered:](/blog/js-vs-java-part-1/)
- scope
- closures
- global context (execution context)
- this
- undefined
- comparison operators

Today we'll be diving into how objects are created in Javascript, and how it embraces OOP in a different way than Java. We'll cover concepts like encapsulation, inheritance, and object creation. Also, we'll see how we can achieve code modularity in both languages.

#### What is OOP?
Object Oriented Programming is a programming paradigm (a way of solving problems, thinking solutions and building software) that implements "objects".
Objects, which are representations of real-life entities (concrete or abstract), usually have data properties (sometimes named "attributes") and functions/procedures called "methods". In practice, multiple languages support OOP on different degrees. Notice that Java and JS are considered to be "multi-paradigm" because they also adopt concepts from functional, and imperative programming. Let's explore how they implement OOP.

#### Class-based vs Prototype-based
Class-based languages **like Java** define the object's structure from a class, which is essentially a blueprint. Objects are just instances of this class, meaning that they all have the same attributes and methods.

```java
// Java
public class Dog {
    private String name;
    private String breed;

    public void setBreed(String breed) {
        this.breed = breed;
    }

    private void bark() {
        System.out.println("WOOF WOOF!");
    }

    private boolean hasName() {
        return name != null && !name.isEmpty();
    }
}

class Main {
    public static void main(String[] args) {
        Dog molly = new Dog();
        molly.setBreed("puddle");
    }
}
```
<br />

Prototype-based languages **like Javascript** define the object's structure dynamically. Objects are not instances from a class, but they rather inherit their properties from another object called its **"prototype"**. The prototype itself is another object that usually has its own prototype, and so on. This multi-object linking creates what we call the **"prototype chain"**. Prototypes are linked in JS using the *"\_\_proto\_\_"* property.

```js
// Javascript
function Dog() {
  this.name = "";
  this.breed = "";
}

const molly = new Dog();
molly.breed = "poodle";

console.log(molly);

/* prints out:
Dog {name: "", breed: "poodle"}
breed: "poodle"
name: ""
__proto__:
constructor: ƒ Dog()
__proto__: Object
*/
```

#### Object creation

**In Java**, objects can be created from its class using the *new* operator. This will call a class constructor. Remember that constructor methods can be overloaded using different signatures (method name, and arguments types, count and order). If none is provided, Java uses a default object constructor.

**In Javascript**, there are multiple ways for creating an object:
1. **Object literals:** Using object literals we can easily create objects "on the fly", adding any properties we want without following a specific blueprint. It is a powerful feature that comes out of the box in JS.

```js
var movie = {
    title: 'The Lord of The Rings: The Fellowship of the Ring',
    genre: ['adventure', 'drama', 'fantasy']
};
```

2. **Constructor Function:** It is a special type of function that is used in conjunction with the *new* operator to create instances from a blueprint. Constructor functions implicitly return the created object (bound to the *this* object), so you only need to add properties to *this*. Do not call this function without the *new* keyword!

```js
function Movie(name, genre) {
    this.name = name;
    this.genre = genre;
    this.showInfo = function() {
      return this.name + ' ' + this.genre;
    };
}

const batman = new Movie('Batman', ['sci-fi', 'drama']);

console.log(batman.showInfo()); // Batman sci-fi,drama 
```

3. **Object.create():** It is useful when we want to define an object's prototype without actually creating a Constructor Function.

```js
var dolly = {
  type: 'mammal',
  color: 'white'
};

var clone1 = Object.create(dolly);
clone1.legCount = 5;

console.log(clone1);

/*
Prints out:
legCount: 5
__proto__:
   color: "white"
   type:"mammal"
   __proto__: Object

Despite having 5 legs instead of 4, its prototype is still a "dolly".
*/

```

4. **ES2015 Classes:** The *class* syntax in JS was introduced in the ES2015 specification. It is crucial to understand that classes in JS **are just syntactical sugar over the prototype-based model.** Behind the scenes, objects are still using prototypes to build their hierarchy.

```js
class Person {
  /* A class in JS can include a constructor function using the 'constructor' keyword */
  constructor(name, lastName) {
    /* Instance variables are declared inside the class methods */
    this.name = name;
    this.lastName = lastName;
  }

  /* instance methods */
  get fullName() {
    return `${this.name} ${this.lastName}`;
  }
}

class Musician extends Person {
  constructor(name, lastName, instrument) {
      /* Call the parent class constructor with 'super()' */
    super(name, lastName);
    this.instrument = instrument;
  }

  /* static methods can also be declared using the 'static' keyword */
  static printInfo(m) {
    console.log(m.fullName + ' ' + m.instrument);
  }
}

const angus = new Musician('angus', 'young', 'guitar');

console.log(angus.fullName);
Musician.printInfo(angus);
/*
Prints out

angus young 
angus young guitar 
*/

```

*Read more:*
* https://docs.oracle.com/javase/tutorial/java/javaOO/objectcreation.html
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes

#### Inheritance - The Prototype Chain

Let's say we have a hierarchy of classes / types of the following:

Animal <- Mammal <- Tiger

Meaning that Tiger inherits from Mammal, and Mammal inherits from Animal.

And let's assume that Animal has the property 'name'. What would happen if we wanted to access the 'name' property from the Tiger entity?

1. It will fail to find it in Tiger
2. It will go to its parent, in this case: Mammal
3. It will fail to find it in Mammal
4. It will go to its parent, in this case: Animal
5. It will find the property 'name' in the Animal entity

This is how it works for both JS and Java but of course, in different ways. In Javascript, this path is runned using the prototype chain, recursively accessing the object's \_\_proto\_\_ reference.

**In a way, we could say that class-based languages establish inheritance through classes and prototype-based languages through objects.**

*Read more:*
* https://docs.oracle.com/javase/tutorial/java/IandI/subclasses.html
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain

#### Encapsulation

Encapsulation is a fundamental characteristic of OOP. It allows objects to protect their internal data from external entities.
**In Java**, such feature can be achieved by using the access modifiers: private, public, protected and package-private (no explicit modifier).

Here's how access modifiers work:

| Modifier    |   Class   |   Package    |   Subclass   |   World   |
| ----------- | --------- | ------------ | ------------ | --------- |
| public      |     Y     |      Y       |       Y      |     Y     |
| protected   |     Y     |      Y       |       Y      |     N     |
| no modifier |     Y     |      Y       |       N      |     N     |
| private     |     Y     |      N       |       N      |     N     |

Let's create a dead simple example. We'll create a counter object that will protect its current count number, and only provide methods to increase it or reset it.
In Java, we can easily protect the "count" attribute by declaring it "private".

```java
class Counter {
    private int count = 0;

    public int increment() {
        count++;
        return count;
    }
    
    public void reset() {
        count = 0;
    }
}

public class Main {
    public static void main(String[] args) {
        Counter c = new Counter();
        System.out.println(c.increment()); // 1
        System.out.println(c.increment()); // 2
        System.out.println(c.increment()); // 3
        System.out.println(c.count); // Error:(16, 29) java: count has private access in Counter
    }
}
```

<br />

**In Javascript,** we don't have access modifiers. Instead, we take advantage of functional scope, closures, IIFE, and the module pattern [(covered in the last article)](/blog/js-vs-java-part-1/) to protect the "count" property.

```js

const counter = (function() {
  var count = 0;

  return {
    increment: function () {
      ++count;
      return count;
    },
    reset: function () {
      count = 0;
    }
  }
})();

console.log(counter.count); // undefined
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.increment()); // 3

```

*Read more:*
* https://en.wikipedia.org/wiki/Encapsulation_(computer_programming)
* https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html
* https://coryrylan.com/blog/javascript-module-pattern-basics

#### Modules

When we create software, we want it to be as modular as possible. Modularity allows us to divide our program in independent and interchangable units of code. Each module implements a specific functionality and interacts with other modules in our application.

**Java** calls them "packages". When you create a Java application, you're going to be creating different packages. A Java package will create different *namespaces* for each class inside of it, allowing you to reuse them in other modules by referencing their namespaces.

```java
package main; // Declaring a "main" package.

import java.io.BufferedInputStream; // Import a single class from another package

import java.util.*; // Import all classes from the java.util package

public class Main {
    public static void main (String[] args) {
        java.io.BufferedOutputStream bufferedOutputStream; // A less convenient way to use classes from other packages, without the 'import' statement
        
        List<Integer> integers; // Using a class from the java.util package
    }
}
```
<br />

**Javascript** doesn't have packages in the same way that Java does. When importing elements in a JS file from other files, we need a module loader. In JS, we have non-native alternatives as well as a native one (added in ES2015). When working on the browser, it is important to load the script files in the right order to avoid messing with the dependencies. This task can be confusing and hard to manage. As projects get bigger, dependency management gets more and more complex.


##### Non-native **specifications**:
- CommonJS: Defines a simple syntax to load modules using the *require* special function. This function loads elements from other modules into the current scope. Node.js implements a similar specification, where the *require(id)* function loads a specific module from the *node_modules* directory. To export a public element from a module, it uses the *exports* special object (*module.exports* in Node.js). CommonJS **does not support asynchronous module loading**.
Some implementations for the browser are: *Webpack* and *Browserify*.

```js
const myPublicFunc = function() {
  console.log('Hello world!');
}

module.exports = {
  myPublicFunc,
};
```

- AMD: "Asynchronous Module Definition" is another specification that allow asynchronous module loading. Its syntax is slightly more complex, and it guarantees that the module will be loaded after its dependencies do. This gives AMD a complete vision of the dependency tree, where it can optimize loading time for non-dependent modules. A well known implementation is Require.js

```js
define(['dependency1', 'dependency2'], function (d1, d2) {
    return function () {};
});
```

##### Natively:
- ES2015 Modules: It was added to the language specification in ES2015. Using the *import* keyword we can get other module's public elements (which are exported with the *export* statement). ES2015 browser support has been progressively adopted, and at this point, ES2015 modules are in fact supported by some browsers. Its syntax is fairly simple and it allows synchronous and async loading. At this moment also, this kind of modules are not supported on the stable Node.js release. However, just as any other ES2015+ feature, you can use a transpiler such as Babel to get the newest language features.

```js

// Importing modules
import someModule from 'someModule';

// Default export
export default {
    somePublicFunc: () => {},
}

// Named export
export const someObj = {};

```

*Read more:*
* https://docs.oracle.com/javase/tutorial/java/concepts/package.html
* https://auth0.com/blog/javascript-module-systems-showdown/
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
* https://developer.mozilla.org/en-US/docs/web/javascript/reference/statements/export
* https://nodejs.org/en/docs/es6/
* https://nodejs.org/dist/latest-v8.x/docs/api/modules.html

#### Awesome Resources

* [https://github.com/getify/You-Dont-Know-JS](https://github.com/getify/You-Dont-Know-JS)
* [https://github.com/denysdovhan/wtfjs](https://github.com/denysdovhan/wtfjs)
* [http://shop.oreilly.com/product/9780596517748.do](http://shop.oreilly.com/product/9780596517748.do)
* [https://www.udemy.com/understand-javascript/](https://www.udemy.com/understand-javascript/)

