# Overall Review
This is a review of the overall project. It is a rapid assesment of the project's quality regarding good practices, architecture and code quality.

## Architecture
The project is a monorepo, it contains two applications: a web application and an api. The api is a node/express application and the web application is a react application, leveraging material ui for design.
It also contains an asset folder which contains the images used in the web application. This is good practice in mono-repo projects, since it makes it easy to share assets between applications.
To me it feels nicely structured, easy to understand and easy to navigate. The api is in the `api` folder and the web application is in the `web` folder.
The project uses typescript which is a good choice in my opinion, since it helps with code quality and maintainability.
It is also contained in a docker-compose file which is a good practice to make the project easy to run.
The arborescence of the project is kept simple and clean, with a clear README.md file explaining how to run the project and what commands are available.


### API
Having a logs folder in the api folder is a good practice, it makes it easy to find the logs of the api.
The api is structured in a clean way, with a `src` folder containing the source code and a `test` folder containing the tests.
The folder `migration` should probably be renamed to `Migrations` to be consistent with the rest of the project.

### Web
The web application is also structured in a clean way, with a `src` folder containing the source code and a `test` folder containing the tests.
In the `src` folder, I see a `components` folder which contains the components of the application, a `pages` folder which contains the pages of the application and a `services` folder which contains the services of the application. However, `Forms` and `Tables` could be kept inside the `components` folder, since they are components.
Also, `Mutation` and `Query` folder should be renamed to `Mutations` and `Queries` to be consistent with the rest of the project.

## Code Quality
### API
The `package.json` file is clean, with only necessary packages and scripts. The `tsconfig.json` file is also clean, with only necessary configurations.
The code quality of the api is good and the functions are well named. However, there are few imports that unecessary, and should be removed.
For example, in the `app.ts` file, `IncomingMessage` and `ServerResponse`; or in the `server.ts` file, `IngredientController`. 
The codebase is in strict typescript mode, which is a good practice. 

### Web
The `package.json` file is clean, with only necessary packages and scripts. The `tsconfig.json` file is also clean, with only necessary configurations. However, the target is "es5" while the project uses typescript and the backend uses "es6", so it should be "es6" instead.
The codebase is in strict typescript mode, which is a good practice. 
The router definition should be removed from `index.tsx` file and instead declared in a `router.tsx` file. The `index.tsx` file should only contain the `App` component. There is also a typo in the jsx, with a `{" "}` forgotten.
In the `Components/` folder, the components are defined with their parameters types inline, which is overall not a great practice; it would be simple to just defined the types in the same file, declaratively.
Also, the styles are defined in a `index.css` file at the root of the project, which might become difficult to maintain; instead, we could use either the `sx` props of material ui, use styled-components, or have a `styles` folder with a file for each component.
Also, a lot of `onClick` handlers are defined inline, which is not a great practice; [it would be better to define them in the component itself](https://stackoverflow.com/questions/50350202/when-to-use-inline-function-on-button-onclick-event-javascript-react-js).
Concerning queries and mutations, they are not typed, even though we have full access to their types. It would be better to type them, to avoid errors.
But it is good to leverage axios and react-query, which are great libraries to handle api calls.
