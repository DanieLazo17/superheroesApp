# Objetivo

* Desarrollar una aplicación para crear un equipo de superhéroes que consumirá una API externa y mostrará diferentes atributos a nivel individual de cada miembro y del equipo consolidado.

* Consumir los endpoints de la siguiente API [Superheroapi](https://superheroapi.com/) para realizar las distintas operaciones. Deberás autenticarte con Facebook para realizar peticiones a la misma.

* Adicionalmente, las diferentes secciones que tendrá la app deberán protegerse verificando que el usuario autenticado disponga de un token que se almacenará en localStorage. El mismo, se obtendrá de la [API](http://challenge-react.alkemy.org/) con datos de muestra. Si un usuario intenta ingresar a cualquier ruta sin estar autenticado, deberá ser redirigido al login.

* Para el manejo de peticiones HTTP deberá utilizarse la librería Axios.

* El sitio deberá ser responsive, y utilizar Bootstrap como punto de partida para aprovechar las características de la librería.

## Los datos válidos para obtener un token son:

* Email: challenge@alkemy.org
* Password: react

# SuperheroesAlkemy

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
