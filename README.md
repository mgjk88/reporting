# Report
A simple report handling system using nextjs, shadcn, prisma.
## Features:
- allows for users to submit reports
- allows for admins to resolve reports
- admin report filtering, pagination & sorting
- a simple login & logout system using JWT to manage sessions statelessly (role-based access)
- toasts for user feedback
- dark/light mode toggle 

## Room for improvement:
- add user credentials, OAuth authentication
- add user sign-up

## Setup guide: 
### Local / self-hosted
1. Fork and clone this repository.
2. migrate an exisitng database in prisma: [migration guide](https://www.prisma.io/docs/orm/prisma-migrate/getting-started#adding-prisma-migrate-to-an-existing-project)
3. create a .env file in the top level of your repo with the variables:
```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
SECRET="YOUR_SECRET_KEY_HERE"
```
- [prisma connection url guide](https://www.prisma.io/docs/orm/overview/databases/postgresql#connection-details)
4. run the following commands:
```console
npm run build
npm run start
```
### Managed
1. Fork and clone this repository.
2. Setup with one of the following service providers:
- Vercel: [setup guide](https://vercel.com/docs/git#deploying-a-git-repository)
3. Connect database using database url
4. add the environment variables:
```
SECRET="YOUR_SECRET_KEY_HERE"
DATABASE_URL="YOUR_POSTGRESQL_DATABASE_URL_HERE"
```
