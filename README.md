### Instruction

Please ensure that you have postgres database installed

In order to run application please:

Open .env file and configure ‘DATABASE_URL’ variable by fallowing rules:
postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA

(if DATABASE does not exist it will be created automatically)

Please run migration:
npm run migrate

Please initialize database with:
npm run init

Application is ready to use, you can start it with:
Npm start

### Authorization:

there are 4 employees, each of them has login: 'userX' and password: 'pX' (user1 - p1, user2 - p2...)
user 1 and 3 are 'workers', users 2 and 4 are 'managers'

example login request:

post: /auth/login
{
"login": "user1",
"password": "p1"
}

jwt token is sent back, it needs to be attached (by "token" key in header) to all fallowing REST requests

steps for testing the app:

1. login
2. create some new vacation requests (line 52 of this file)
3. feel free to test all the endpoints, both as worker and manager

### Example routes:

### routes for all employees

-see my requests:
get: /request

-see my pending requests:
get: /request/?status=pending

-create new request:
post: /request
{
"vacation_start_date": "1970-01-01T00:00:00.000Z",
"vacation_end_date": "1970-01-20T00:00:00.000Z"
}

-see my days left:
get: /days-left

### routes only for managers

-see all requests:
get: /request/all

-see all pending requests:
get: /request/all/?status=pending

-see all author's requests:
get: /request/all/?author=1

-see all pending author's requests:
get: /request/all/?author=1&status=pending

-see all overlapping request:
get: /request/all/overlapping

-approve request:
post: /request/approve/:id

-reject request:
post: /request/reject/:id
