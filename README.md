# Password storage

<p align="center"> 
  <img src='https://github.com/Effanuel/MERN/blob/master/assets/interface.png'>
</p>

## Table of Contents

- [Current Features](#current-features)
- [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Roadmap](#roadmap)

## Password Storage using MERN

This is a minimal password storage application.

### Current Features

- Keep your passwords safe with a help of an encrypting algorithm;
- Built with **TypeScript** *(yes, its a feature these days)*;
- Clicking on one of the cards will copy the password to the clipboard;

### Built With

The Backend was built using **Node + Express** and the Frontend, **React + Redux**. Styled components were taken from **React Bootstrap**. Mongo database is managed with a help of **Mongoose**

- [Node](https://nodejs.org/en/) + [Express](https://expressjs.com/)
- [React](https://reactjs.org/) + [Redux](https://redux.js.org/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Mongoose](https://github.com/Automattic/mongoose)

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- [Nodejs](https://nodejs.org/en/download/)
- [Mongo](https://docs.mongodb.com/manual/installation/)

### Installation

1. **Clone the repo or [download zip](https://github.com/Effanuel/MERN/archive/v1.3.zip):**

```sh
git clone https://github.com/Effanuel/MERN.git
cd MERN/backend
```

2. **Install NPM packages for client and server:**

```sh
npm run init:packages
```

3. **Build the application:**

```sh
npm run build
```

<!-- USAGE EXAMPLES -->

4. **To start development mode:**

```sh
npm run dev
```

#### TLDR setup:

```sh
git clone https://github.com/Effanuel/MERN.git
cd MERN/backend
npm run init:packages
npm run build
npm run prod
```

## Usage

##### Run application:

```sh
cd MERN/backend
npm run prod
```

## Roadmap

- Proper tests;
- Fix types *(currently around ~150 any types)*;
