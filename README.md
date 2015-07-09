ivoire-one-of
=============

Pick items out of a hat. A plugin for the
[Ivoire](https://www.npmjs.com/package/ivoire) random number generator
framework.


Installing
----------

To install, use `npm`:

```
npm install ivoire-one-of
```

Alternately, you can find the source [on Github](https://github.com/dreamhorn/ivoire-one-of).


Getting Started
---------------

`ivoire-one-of` extends the `ivoire` package. You can require it directly:

```
var Ivoire = require('ivoire-one-of');
```

Or you can require it alongside `ivoire`:

```
var Ivoire = require('ivoire');
require('ivoire-one-of');
```

Either way, instantiate and start rolling!

```
var ivoire = new Ivoire();
var one = ivoire.one_of('red', 'blue', 'orange', 'green');

// Cycle through the sequence, returning each item in order and wrapping
// back to the beginning:
one.cycling();

// Cycle through the sequence, returning each item in order until we reach
// the end of the sequence. Continue to return the last item forevermore
// after.
one.stopping();

// Return a random item from the sequence, never returning the
// same item twice in a row.
one.randomly();

// Return a random item from the sequence. May return the same item twice
// or more times in a row!
one.truly_at_random();

// Shuffle the sequence and iterate through, wrapping around to the
// beginning of the shuffled sequence.
one.in_random_order();
```


Reference
---------

`ivoire-one-of` adds some methods to the `Ivoire` prototype object, making them
available on all `Ivoire` instances.


### Ivoire.prototype.one_of(item1, item2, item3...)

Retun an object with wethods for picking items from the provided arguments. The
object is cached based on the stringification of the sequence of arguments.

```
var Ivoire = require('ivoire-one-of');
var ivoire = new Ivoire();

// The returned object will be cached:
var one = ivoire.one_of('red', 'blue', 'green', 'orange');
one.cycling() === 'red';

// When we need the same sequence again (from the same Ivoire instance), the
// same invocation retrieves the cached object and its state.
var another = ivoire.one_of('red', 'blue', 'green', 'orange');
another.cycling() === 'blue';

// If we work off of another Ivoire instance, we get a new cycle.
var ivoire_2 = new Ivoire();
var one_more = ivoire_2.one_of('red', 'blue', 'green', 'orange');
one_more.cycling() === 'red';
```

The object returned by `#one_of()` has the following interface:

#### one.cycling()

Cycle through the sequence, returning each item in order and wrapping back to
the beginning.

```
var ivoire = new require('ivoire-one-of');
var one = ivoire.one_of('red', 'blue', 'green', 'orange');
one.cycling();
```

#### one.stopping()

Cycle through the sequence, returning each item in order until we reach the end
of the sequence. Continue to return the last item forevermore after.

```
var ivoire = new require('ivoire-one-of');
var one = ivoire.one_of('red', 'blue', 'green', 'orange');
one.cycling();
```


#### one.randomly()

Return a random item from the sequence, never returning the same item twice in
a row.

```
var ivoire = new require('ivoire-one-of');
var one = ivoire.one_of('red', 'blue', 'green', 'orange');
one.randomly();
```


#### one.truly_at_random()

Return a random item from the sequence without filtering repeats. May return
the same item twice or more times in a row!

```
var ivoire = new require('ivoire-one-of');
var one = ivoire.one_of('red', 'blue', 'green', 'orange');
one.truly_at_random();
```


#### one.in_random_order()

Shuffle the sequence of items and iterate through it, one at a time, wrapping
around to the beginning of the shuffled sequence. The shuffled order is
maintained throughout.

```
var ivoire = new require('ivoire-one-of');
var one = ivoire.one_of('red', 'blue', 'green', 'orange');
one.in_random_order();
```


Acknowledgements
----------------

The `one-of` algorithm is based on the implementation in
[Undum](http://undum.com).
