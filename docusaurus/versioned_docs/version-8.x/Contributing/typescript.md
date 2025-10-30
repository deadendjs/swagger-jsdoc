---
sidebar_position: 6
---

# Typescript

## Types

Package include basic (but incomplete) types to get started. Feel free to submit corrections/improvements.

## The library

It's currently written in Vanilla JavaScript compatible with Node.js 20 or higher. There are no compilation, transpilation or bundling steps. JSDoc comments and annotations have been maintained and published for intelligent editors.

## Re-using interfaces from source code

`swagger-jsdoc` is only taking into account JSDoc comments and pure YAML files. The library does not work with source code at all: no reading, no parsing, no modifications.

For scenarios in which you want the source code to be taken into account in your specification, use an alternative such as [`tsoa`](https://github.com/lukeautry/tsoa).
