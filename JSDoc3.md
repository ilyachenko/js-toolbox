# JSDoc 3

[Namepaths in JSDoc 3](#namepaths)

[Inline tags](#inlineTags)

[@abstract (synonyms: @virtual)](#abstract)



<a name="namepaths"></a>
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

<a name="inlineTags"></a>
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

<a name="abstract"></a>
#### @abstract (synonyms: @virtual)

The @abstract tag identifies members that must be implemented (or overridden) by objects that inherit the member.

```javascript
/**
 * Generic dairy product.
 * @constructor
 */
function DairyProduct() {}

/**
 * Check whether the dairy product is solid at room temperature.
 * @abstract
 * @return {boolean}
 */
DairyProduct.prototype.isSolid = function() {
    throw new Error('must be implemented by subclass!');
};

/**
 * Cool, refreshing milk.
 * @constructor
 * @augments DairyProduct
 */
function Milk() {}

/**
 * Check whether milk is solid at room temperature.
 * @return {boolean} Always returns false.
 */
Milk.prototype.isSolid = function() {
    return false;
};
```

