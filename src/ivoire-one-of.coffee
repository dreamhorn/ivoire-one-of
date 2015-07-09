"use strict"
Ivoire = require('ivoire')
md5 = require('MD5')


# TODO: Write methods!
Ivoire.prototype._get_one_of_cache = () ->
  if not @_one_of_cache
    @_one_of_cache = {}
  return @_one_of_cache


Ivoire.prototype.one_of = (items...) ->
  that = this;
  one_of_cache = @_get_one_of_cache()

  # If we've seen this sequence before, we want to use a cached version of our
  # iterators to maintain state in between uses.
  hash = md5(JSON.stringify(items))
  obj = one_of_cache[hash]

  if not obj
    # Here we build the `one_of` object with its iterator functions. Each
    # stores its state inside a closure.
    obj = one_of_cache[hash] =
      # Cycle through the sequence, returning each item in order and wrapping
      # back to the beginning.
      cycling: (() ->
        cycler = items.slice(0)
        i = -1
        return () ->
          i += 1
          if i >= cycler.length
            i = 0
          return cycler[i]
        )()

      # Cycle through the sequence, returning each item in order until we reach
      # the end of the sequence. Continue to return the last item forevermore
      # after.
      stopping: (() ->
        cycler = items.slice(0)
        i = -1
        return () ->
          i += 1
          if i >= cycler.length
            i = cycler.length - 1
          return cycler[i]
        )()

      # Return a random item from the sequence. Crucially, it won't return the
      # same item twice in a row.
      randomly: (() ->
        last_item = null
        return () ->
          item = last_item
          while item == last_item
            item = that.pick items
          last_item = item
          return item
        )()

      # Return a random item from the sequence. May return the same item twice
      # or more times in a row!
      truly_at_random: (() ->
        return () ->
          return that.pick items
        )()

      # Shuffle the sequence and iterate through, wrapping around to the
      # beginning of the shuffled sequence.
      in_random_order: (() ->
        cycler = that.shuffle items
        i = -1
        return () ->
          i += 1
          if i >= cycler.length
            i = cycler.length - 1
          return cycler[i]
        )()

  return obj


module.exports = Ivoire
