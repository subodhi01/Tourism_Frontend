# Discover Galle Frontend – Angular Application for Smart Tourism System

This repository contains the **Angular frontend** for the Discover Galle Smart Tourism System. It allows users to browse and book hotels, restaurants, and tourist attractions, and integrates seamlessly with the .NET C# backend API.

---

## Getting Started with Angular

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.1.

To work with this project, ensure you have the following installed:

- Node.js (LTS version)
- Angular CLI  
- A modern browser (e.g., Chrome)

**Clone the repository:**
```
git clone https://github.com/your-repo-name/smart-tourism-frontend.git
cd smart-tourism-frontend
```

---

## Development Server

To start a local development server, run:
```
ng serve
```

Then open your browser and navigate to:
```
http://localhost:4200/
```

The application will automatically reload when changes are made to source files.

---

## Code Scaffolding

To generate a new component using Angular CLI:
```
ng generate component component-name
```

For other schematics (like directives or pipes), run:
```
ng generate --help
```

---

## Building the Project

To build the project for production:
```
ng build
```

Build output will be stored in the `dist/` directory, optimized for performance.

---

## Running Unit Tests

To execute unit tests using [Karma](https://karma-runner.github.io):
```
ng test
```

---

## Running End-to-End (E2E) Tests

To run end-to-end tests:
```
ng e2e
```

Note: Angular CLI does not come with an E2E testing framework by default. You may configure tools like Cypress or Protractor.

---

## Project Structure

- `src/app/components/` – Angular components such as login, booking, listings  
- `src/app/services/` – Services for API communication  
- `src/app/models/` – TypeScript interfaces for data models  
- `src/app/guards/` – Route guards for authentication/authorization  
- `src/environments/` – Configuration files for dev and production

---

## Advanced Features

### Routing

The app uses Angular Router for navigating between pages (e.g., `/home`, `/bookings`, `/hotels/:id`).

### Forms

Uses Reactive Forms for input validation and user data entry.

### Authentication

Handles user and admin login using JWT stored in local storage. Access control is managed through route guards.

### API Integration

Communicates with the .NET backend via HTTP services. All endpoints are consumed using Angular's `HttpClient`.

---

## Deployment

To deploy the Angular app:

1. Build the project:
    ```
    ng build --configuration production
    ```
2. Deploy the `dist/` folder to:
    - Firebase Hosting  
    - GitHub Pages  
    - Netlify  
    - AWS S3  
    - Azure Static Web Apps  
    - Or serve through your backend (e.g., with IIS or Nginx)

---

## Additional Resources

- [Angular Official Docs](https://angular.dev/start)
- [Angular CLI Reference](https://angular.dev/tools/cli)
- [RxJS Documentation](https://rxjs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
