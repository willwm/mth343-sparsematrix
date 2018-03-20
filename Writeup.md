---
title:          MTH343 Final Project - Lanczos Algorithm
author:         Will Wolff-Myren (<willw@pdx.edu>)
date:           2018-03-19
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

* Implement the [Lanczos algorithm](https://en.wikipedia.org/wiki/Lanczos_algorithm), to generate the [tridiagonal](https://en.wikipedia.org/wiki/Tridiagonal_matrix) matrix $T=Q^TAQ$, with the option to stop at any step $m\ge1$, where $Q = [q_1, q_2, ..., q_m]$ will consist of only the first $m$ [orthonormal](https://en.wikipedia.org/wiki/Orthonormality) vectors copmuted by the Lanczos algorithm.
* Compute the [eigenvalues](https://en.wikipedia.org/wiki/Eigenvalues_and_eigenvectors) of the tridiagonal matrix $T$, for selected values of $m$.

In the subsequent sections of this report, I will briefly explain the [algorithms](#algorithms) used, as well as [technical implementation](#technical-implementation) details, and an [analysis](#analysis) of the behavior of the eigenvalues of $T$ for increasing values of $m$.


# Technical Implementation

I decided to base my implementation around the Angular application framework, as a chance to utilize some of the experience that I already have with Angular and with TypeScript in general. I wanted to implement this assignment in such a way that it could be easily demonstrated without needing to be compiled/installed, and I thought it would be easier to visualize within a web browser.

In addition to the benefit of the inherent portability of constructing an application in a format that can be statically hosted (in other words, it does not require a server to run; all of the processing happens on the client, which in this case is the browser, or node), JavaScript and TypeScript have somewhat unique properties that I wanted to utilize in my matrix construction.

There are a variety of well-established numerical libraries available, including BLAS, EISPACK, LAPACK, and SciPy, but relatively few (that I am aware of) at the moment which are available for JavaScript, and even fewer available for TypeScript. 


# Analysis

I must admit, this was significantly more challenging than I had originally expected. I was hoping that my choice of programming language (TypeScript) would not be a significant roadblock, but I may have inadvertantly given myself a much harder problem to solve than I had planned.

I evaluated a number of available mathematics libraries for JavaScript, but settled on math.js early on, as it had *most* of the functions that I was looking for, it appeared to be well maintained, and it had existing type definitions for TypeScript. This is where my issues began.

The type definitions for mathjs (@types/mathjs) do not match the current API for the corresponding npm package (mathjs), so many of the new and particularly useful functions available from the mathjs library did pass type checks in my TypeScript applicaton. Rather than select a different library, I attempted to write a 'shim' class around the functionality that I was aware of, with the hopes of eventually swapping the underlying implementation of mathjs while keeping my interface intact.

For the most part, the 'shim' class approach actually led me to a nice implementation that is (now) well unit-tested, but took me a significantly longer amount of time than I had expected. Nonetheless, I pushed on, and not only fully implemented (as far as my needs were concerned) a Matrix class, but also implemented a functional Arnoldi algorithm in the corresponding Arnoldi class.

Again, I shot myself in the foot a bit here, as the end goal of the assignment is to implement and test a _Lanczos_ algorithm implementation. I chose to approach the problem by constructing the comparatively 'complex' Arnoldi algorithm with the intention of extending it to implement the Lanczos algorithm, which is a simplified version of Arnoldi that requires a symmetric matrix instead of just an n x n matrix regardless of symmetry.

Despite all of this, I successfully implemented a Matrix class, and an Arnoldi class, but realized the fault in my choice of libraries when I finally came to the validation task of the assignment:

> ...Use existing software to compute the eigenvalues of the tridiagonal matrix $T$... 


## Eigenvalue Comparison (for selected values of $m$)

Math.js does not (currently) have a method to calculate the eigenvalues of a matrix. While I can attempt to write (yet another) helper class atop its existing functionality, I am unfortunately out of time, and need to choose an alternate route to determine and compare the eigenvalues of the current tridiagonal matrix results that I am able to obtain from Arnoldi.getTridiagonal().


## Conclusion

* TODO: Review libraries that I chose for this implementation
  * Bluemath
  * Math.js
  * scijs

* TODO: Compare/contrast matrix implementations in the libraries above
  * Bluemath and scijs both use NDArray
  * Math.js uses DenseMatrix and SparseMatrix

* TODO: Describe performance of each of the implementation approaches
  * Discuss the performance analysis provided by <https://github.com/mikolalysenko/ndarray-experiments>


----

# References

## Algorithms

### Compressed Sparse Row (CSR)

[Compressed Sparse Row](https://en.wikipedia.org/wiki/Sparse_matrix#Compressed_sparse_row_(CSR,_CRS_or_Yale_format)) 

Related:

* [Sparse matrix](https://en.wikipedia.org/wiki/Sparse_matrix)

### Lanczos

[Lanczos algorithm](https://en.wikipedia.org/wiki/Lanczos_algorithm)

Related:

* [Generalized minimal residual method](https://en.wikipedia.org/wiki/Generalized_minimal_residual_method)
* [Matrix-free methods](https://en.wikipedia.org/wiki/Matrix-free_methods)
* [Arnoldi iteration](https://en.wikipedia.org/wiki/Arnoldi_iteration)
* [Householder transformation](https://en.wikipedia.org/wiki/Householder_transformation)
* [Singular-value decomposition](https://en.wikipedia.org/wiki/Singular-value_decomposition)

## Application Libraries

### LAPACK and OpenBLAS

* [LAPACK](http://www.netlib.org/lapack/index.html)
* [OpenBLAS](https://en.wikipedia.org/wiki/OpenBLAS)

### JavaScript Libraries

* [math.js | an extensive math library for JavaScript and Node.js](http://mathjs.org/)
* [scijs/packages](http://scijs.net/packages/#scijs/ndarray)

## Data Sets

* [The Matrix Market Top Ten](https://math.nist.gov/MatrixMarket/extreme.html)
* [UF Sparse Matrix Collection - sorted by id](https://www.cise.ufl.edu/research/sparse/matrices/list_by_id.html)
