# DevTinder Api




## AuthRouter
- POST/signup
-POST/login
-POST/logout

## profileRouter
-GET/Profile/view
-PATCH/Profile/edit
-PATCH/Profile/password


## connectionRequestRouter
-POST/request/send/intrested/:userId
-POST/request/send/ignored/:userId
                                                              // Status:ignore,intrested,accepted,rejected
-POST/request/review/accepted/:requestId
-POST/request/review/rejected/:requestId

## userRouter
-GET/user/connections
-GET/user/request
-GET/user/feed                               //gets you the profile of other users on platform



