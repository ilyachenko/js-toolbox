# JSDoc 3

#### Namepaths in JSDoc 3
##### Documentation tags (describe your code)

```javascript
/** @constructor */
Person = function() {
    this.say = function() {
        return "I'm an instance.";
    }

    function say() {
        return "I'm inner.";
    }
}
Person.say = function() {
    return "I'm static.";
}

var p = new Person();
p.say();      // I'm an instance.
Person.say(); // I'm static.
```

```javascript
Person#say  // the instance method named "say."
Person.say  // the static method named "say."
Person~say  // the inner method named "say."
```

[Example](http://example.dyachen.com/JSDoc/out/Person.html)

#### Inline tags (for description)

{@link}: Link to a JSDoc namepath or an external URL.
{@linkcode}: Insert a link that should be rendered in a monospace font.
{@linkplain}: Insert a link that should not be rendered in a monospace font.
{@tutorial}: Link to a tutorial.

```javascript
/**
 * Link to {@link https://github.com GitHub} or [GitHub]{@link https://github.com}
 */
```

#### [@abstract](http://example.dyachen.com/JSDoc/out/DairyProduct.html) (synonyms: @virtual)

The @abstract tag identifies members that must be implemented (or overridden) by objects that inherit the member.

#### <a href="http://example.dyachen.com/JSDoc/out/Animal.html" target="_blank">@augments</a> (synonyms: @extends) <namepath>

The @augments or @extends tag marks a symbol as augmenting another symbol.

#### @author <name> [<emailAddress>]

```javascript
/**
 * @author Jane Smith 
 */
function MyClass() {}
```

#### [@borrows](http://example.dyachen.com/JSDoc/out/util.html)
The @borrows tag allows you to add documentation for another symbol to your documentation.

This tag would be useful if you had more than one way to reference a function, but you didn't want to duplicate the same documentation in two places.

In this example there exists documentation for the "trstr" function, but "util.trim" is just a reference to that same function by a different name.

#### @callback

The @callback tag provides information about a callback function that can be passed to other functions, including the callback's parameters and return value. You can include any of the tags that you can provide for a @method.

Once you define a callback, you can use it in the same way as a custom type defined with the @typedef tag. In particular, you can use the callback's name as a type name. This allows you to indicate that a function parameter should contain a certain type of callback.

If you want a callback to be displayed with the type definitions for a specific class, you can give the callback a namepath indicating that it is an inner function of that class. You can also define a global callback type that is referenced from multiple classes.

[Class-specific callback](http://example.dyachen.com/JSDoc/out/Requester1.html)

[Global callback](http://example.dyachen.com/JSDoc/out/Requester2.html)

#### [@class, @classdesc](http://example.dyachen.com/JSDoc/out/MyClass.html)

#### [@constant](http://example.dyachen.com/JSDoc/out/constant.js.html) (synonyms: @const)

The @class tag marks a function as being a constructor, meant to be called with the new keyword to return an instance.

#### [@protected](http://example.dyachen.com/JSDoc/out/Thingy.html) or **@access protected**

#### [@private](http://example.dyachen.com/JSDoc/out/Documents.html) or **@access private**

#### [@public](http://example.dyachen.com/JSDoc/out/global.html#sum) or **@access public**
