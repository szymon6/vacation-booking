### example routes:

### Authorization:

post: /auth/login
{
"login": "user1",
"password": "p1"
}

jwt token is sended, it needs to be attached (by "token" key in header) to all fallowing requests:

### routes for everyone

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
