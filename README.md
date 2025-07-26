# Anglr Backoffice FE

Frontend of backoffice for fictional company Anglr.

## Prerequisite

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.1.1.
To install them on your local machine, you can refer to Angular guide [here](https://angular.dev/tools/cli/setup-local).

To note, this project is using [Angular Zoneless](https://angular.dev/guide/zoneless), which not yet production ready as of version 20.1.1.

For package manager, this project are using Bun. Installation guide can be found on [Bun official websites](https://bun.sh/package-manager).

If you want to know about style guide used, please refer to the [Angular style guides](https://angular.dev/style-guide) page.

### Library Used

- [PrimeNG](https://primeng.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Dexie.js](https://dexie.org/)

## Development server

To start a local development server, you can run the command below.

```bash
# Using Angular CLI
ng serve

# Using Bun
bun start
```

## Building

To build the project, use the command below.

```bash
# Using Angular CLI
ng build

# Using Bun
bun build
```

This will compile your project and store the build artifacts in the `dist/` directory. For more information about deployment, you can check them on Angular's [documentation](https://angular.dev/tools/cli/deployment).
