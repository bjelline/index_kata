The Reference Kata
------------------

![Index Example][index_example]

This is a greatly simplyfied version of Marco Emrichs
[index kata](https://github.com/marcoemrich/index_kata).
This version was prepared by [Brigitte Jellinek](https://github.com/bjelline).


Here's his introduction to the problem:


## About

State is the devil. All programmers know it. However, getting rid of state is hard. This kata is designed to have various needs for keeping state. Can you get rid of it?

## Description
Imagine to write part of a service that generates book indexes. There is a contract, that your function *pageReferenceText* gets called (by the book production system) everytime there is a reference found for a specific word. Let's say you want to index the term *functional programming*. 

If the term  *functional programming* is found on the pages 53, 57, twice on 58 and finally on 59,
then your function will be called like this:

    pageReferenceText(1, "53")   
    pageReferenceText(2, "57")   
    pageReferenceText(3, "58")   
    pageReferenceText(4, "58")   
    pageReferenceText(5, "59")   

this is the first pass.  then there will be a second, identical pass:

    pageReferenceText(1, "53")   
    pageReferenceText(2, "57")   
    pageReferenceText(3, "58")   
    pageReferenceText(4, "58")   
    pageReferenceText(5, "59")   


The expected output is different in the first and the second pass.
first pass:

    pageReferenceText(1, "53") gives output: "53 "
    pageReferenceText(2, "57") gives output: "57 "
    pageReferenceText(3, "58") gives output: "58 "
    pageReferenceText(4, "58") gives output: ""
    pageReferenceText(5, "59") gives output: "59 "

second pass:

    pageReferenceText(1, "53") gives output: "53 "
    pageReferenceText(2, "57") gives output: "57-59 "
    pageReferenceText(3, "58") gives output: ""
    pageReferenceText(4, "58") gives output: ""
    pageReferenceText(5, "59") gives output: ""


## Getting Started

```bash
npm install
npm test
```

## Specs

See specs/index.spec.js

Run the specs with: *npm test*

## Avoid/Contain/Encapsulate/Immutalize/Freeze and Banish the State

* avoid let, use const
* use immutable data
1. just dont change them
2. use freeze
3. use an immutable library
  * minimize side effects
  * minimize scope (localize state!)
* contain state, ie. keep the core pure (use pure functions only)
  * use state wrapping, ie. world-state as an in-param and an additional return value
  * maybe use a Monad, or an Observable, or ...
  * other ideas?

## Assisting Libraries

  There are libs you can try out:

  * Immuteable http://facebook.github.io/immutable-js/
  Provides immuteable data types

  * Ramda http://ramdajs.com/
  A functional library which features non-mutating, side effect free functions

## Other Considerations

  * Use proper data structures (e.g. Map, Set instead of {}, []).
  * Assume the inputs as valid. Error-handling is not part of the kata.
  * You can also safely assume, that all passes yield the same page results, 
  e.g. if you get *(#index_oop_1, 10) -> "10"*, than there is no  *(#index_oop_1, 10) -> p* with *p != 10* in a later pass
  * You ARE allowed to modify the acceptance spec as long as the business logic stays intact.
  Actually this might even be required in order to deal with global state in the specs.

  [index_example]: ./img/index.png
