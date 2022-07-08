### example routes:

### Authorization:

post: /auth/login
{
"login": "user1",
"password": "p1"
}

jwt token is sended, it needs to be attached (by "token" key in header) to all fallowing requests:

there are 4 employees, each of them has login: 'userX' and password: 'pX'
user 1 and 3 are 'workers' and users 2 and 4 are 'managers'

### routes for all employees

see my requests:
get: /request

see my pending requests:
get: /request?status=pending

new request:
post: /request

days left:
get: /days-left

### routes for managers

see all requests:
get: /request/all

see all pending requests:
get: /request/all/?status=pending

see all employee's requests:
get: /request/all/?employee=1

see all pending employee's requests:
get: /request/all/?employee=1&status=pending

approve request:
post: /request/approve/:id

reject request:
post: /request/reject/:id

overlapping request:
get: /request/overlapping
