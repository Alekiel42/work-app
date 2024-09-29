# Work App

This is a full-stack application consisting of a backend and frontend. The backend is located in the `backend` folder, while the frontend is in the `frontend` folder.

## Context

This project was carried out as part of a technical test that involves developing the backend and frontend of an application that retrieves a list of job offers using the Jobijoba API within a given timeframe.

## Requirements

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or higher)
- [Yarn](https://yarnpkg.com/) (v1.22 or higher)

## Getting Started

### Building the Project
If this is your first time running the project, you need to build it before starting. This step compiles the TypeScript code and generates necessary documentation.

Run the following command:

```bash
yarn install && yarn run init-project
```

Create a `.env` file in `backend` folder with value :

```bash
PORT=3001
TOKEN_SECRET=<your jobijoba secret>
TOKEN_ID=<your jobijoba token id>
```

### Command to start the project

To start the project, you can run the backend and frontend sequentially using the following command from the root directory (parent directory of `backend` and `frontend`):

```bash
yarn run start
```
