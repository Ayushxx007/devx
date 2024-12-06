# DevTinder Api




## AuthRouter
- POST/signup
-POST/login
-POST/logout

## profileRouter
-GET/Profile/view   
-PATCH/Profile/edit
-PATCH/Profile/password    // todo


## connectionRequestRouter
-POST/request/send/interested/:userId  
                                      -POST/request/send/:status/:userId      //interested,ignored
-POST/request/send/ignored/:userId
                                                                                                  // Status:ignore,intrested,accepted,rejected
-POST/request/review/accepted/:requestId
                                            -POST/request/review/:status/:requestId    //Accepted,Rejected
-POST/request/review/rejected/:requestId

## userRouter
-GET/user/connections
-GET/user/request/recieved
-GET/user/feed                               //gets you the profile of other users on platform



