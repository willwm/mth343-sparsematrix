---
title:          MTH343 Final Project - Lanczos Algorithm
author:         Will Wolff-Myren (<willw@pdx.edu>)
date:           2018-03-13
papersize:      letter
documentclass:  article
geometry:       margin=0.75in
---

# Overview

In this programming assignment, I will create a library of functions for operating on matrices stored in a [Compressed Sparse Row](https://en.wikipedia.org/wiki/Sparse_matrix#Compressed_sparse_row_(CSR,_CRS_or_Yale_format)) format, as well as a presentation layer (web application), using [Angular](https://angular.io/) and [TypeScript](http://www.typescriptlang.org).

More specifically, this library will be able to:

* Read a matrix $A$ from a CSR-format file
* Produce $B = A^T$, and store $B$ in CSR format.
* Compute $C = AB$, check $C$ for symmetry, and store $C$ in CSR format.

This application will also:

* Implement the [Lanczos algorithm](https://en.wikipedia.org/wiki/Lanczos_algorithm), to generate the tridiagonal matrix $T=Q^TAQ$, with the option to stop at any step $m\ge1$, where $Q = [q_1, q_2, ..., q_m]$ will consist of only the first $m$ orthonormal vectors copmuted by the Lanczos algorithm.
* Compute the eigenvalues of the tridiagonal matrix $T$, for selected values of $m$.

In the subsequent sections of this report, I will briefly explain the [algorithms](#algorithms) used, as well as [technical implementation](#technical-implementation) details, and an [analysis](#analysis) of the behavior of the eigenvalues of $T$ for increasing values of $m$.

# Algorithms

## Compressed Sparse Row (CSR)

...

## Lanczos

...

# Technical Implementation

...

# Analysis

...

## Current Limitations

...

## Implementation with Existing JavaScript/TypeScript Libraries

### Benchmarks

http://mlweb.loria.fr/benchmark/

### bluemath

### math.js

### scijs

## Conclusion

...
