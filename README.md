# backend-43340-final

## Run Project

To run project locally:

```bash
npm run dev
```

To check site up and running on PROD:

https://backend-43340.onrender.com/

## Documentation

You can check apis documentation and test them on:

https://backend-43340.onrender.com/apidocs/

To create a User go to https://backend-43340.onrender.com/api/auth/register

To set up a user with ADMIN role you must do that via mongoDB: users model > isAdmin = true.

You can set connect.sid cookie value, to test apis that requires spectif roles, going to 'Authorize' button (into documentation page) and filling connect.sid value. You can get that value after login to the app, going to browser Developer Tools > Application > Storage > Cookies.
