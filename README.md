# Github app

We use Github api rest to make small Pull Request Github app

## What's inside?

This repository uses :

- [pnpm](https://pnpm.io) as a package manager.
- [Vite](https://vitejs.dev/) as build tool.
- [React.js](https://react.dev/) as users interface library
- [TypeScript](https://www.typescriptlang.org/) for static type checking.
- [ESLint](https://eslint.org/) for code linting.
- [Prettier](https://prettier.io) for code formatting.
- [TanStack Query](https://tanstack.com/query/latest) as data-fetching library.
- [Vanilla Extract](https://vanilla-extract.style/) for style
- [Vitest](https://vitest.dev/) for unit tests & as tests runner
- [Testing Library](https://testing-library.com/) for ui tests

### Usage

First, you must install dependencies, so run :

```
pnpm install
```

Second, you must create `.env.development.local` file which contain an access token :

```
VITE_ACCESS_TOKEN=your_access_token_here
```

Finally, you can run project on [localhost](http://localhost:3000/) with :

```
pnpm dev
```

### Can be improved

- More unit test
- Better error management to notify user
- use power of vanilla extract (variables, etc...)
- etc..
