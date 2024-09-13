# Book-Management-System

## Routes and Endpoints

# /users
POST: Create a new user
GET: Get all the user info here

# /users/{id}
GET: Get a user by id
PUT: Update a user by their ID
DELETE: Delete a user by id (chk if he/she have an issued book) && (is there any fine to paid) 10


# /users/subscription-details/{id}
GET: Get user subscription details
    >> Date of Subscription
    >>> Valid till
    >> Is there any fine

# /books
GET: Get all the books
POST: Create/Add a new book