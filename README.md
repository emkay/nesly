nesly
=====

A programming language that compiles down to 6502 NES assembler

[![Build Status](https://travis-ci.org/emkay/nesly.png?branch=master)](https://travis-ci.org/emkay/nesly)

## Install
`npm i -g nesly`

## Examples
Take a look at the `mario-demo.js` file. There is a lot of stuff hardcoded in asm to get the example working. It's not really ready to use for creating anything useful.

To get the example running you need [nesasm](http://www.nespowerpak.com/nesasm/) and a [nes emulator](https://duckduckgo.com/?q=nes+emulator).

```
nesly mario-demo.js mario-test.s;
nesasm mario-test.s;
open mario-test.nes;
```

![nesly demo](https://dl.dropboxusercontent.com/u/476602/nesly-demo.png)
