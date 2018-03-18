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

# Algorithms

## Compressed Sparse Row (CSR)

[Compressed Sparse Row](https://en.wikipedia.org/wiki/Sparse_matrix#Compressed_sparse_row_(CSR,_CRS_or_Yale_format)) 

Related:

* [Sparse matrix](https://en.wikipedia.org/wiki/Sparse_matrix)


## Lanczos

[Lanczos algorithm](https://en.wikipedia.org/wiki/Lanczos_algorithm)

Related:

* [Generalized minimal residual method](https://en.wikipedia.org/wiki/Generalized_minimal_residual_method)
* [Matrix-free methods](https://en.wikipedia.org/wiki/Matrix-free_methods)
* [Arnoldi iteration](https://en.wikipedia.org/wiki/Arnoldi_iteration)
* [Householder transformation](https://en.wikipedia.org/wiki/Householder_transformation)
* [Singular-value decomposition](https://en.wikipedia.org/wiki/Singular-value_decomposition)


# Technical Implementation

...

## LAPACK and OpenBLAS

* [LAPACK](http://www.netlib.org/lapack/index.html)
* [OpenBLAS](https://en.wikipedia.org/wiki/OpenBLAS)

## JavaScript Libraries

* [math.js | an extensive math library for JavaScript and Node.js](http://mathjs.org/)
* [scijs/packages](http://scijs.net/packages/#scijs/ndarray)

# Analysis

...

## Input Matrices

* [The Matrix Market Top Ten](https://math.nist.gov/MatrixMarket/extreme.html)
* [UF Sparse Matrix Collection - sorted by id](https://www.cise.ufl.edu/research/sparse/matrices/list_by_id.html)

...

## Eigenvalue Comparison (for selected values of $m$)

...


## Conclusion

...
