
signInSuccessWithAuthResult: function (authResult, redirectUrl) {
    // User successfully signed in.
    // Return type determines whether we continue the redirect automatically
    // or whether we leave that to developer to handle.
    //------------------------------------------------------------------------------------------
    // The code below is modified from default snippet provided by the FB documentation.
    //
    // If the user is a "brand new" user, then create a new "user" in your own database.
    // Assign this user with the name and email provided.
    // Before this works, you must enable "Firestore" from the firebase console.
    // The Firestore rules must allow the user to write. 
    //------------------------------------------------------------------------------------------
    var user = authResult.user;                            // get the user object from the Firebase authentication database
    if (authResult.additionalUserInfo.isNewUser) {         //if new user
        db.collection("users").doc(user.uid).set({         //write to firestore. We are using the UID for the ID in users collection
               name: user.displayName,                    //"users" collection
            //    email: user.email,                         //with authenticated user's ID (user.uid)
            //    country: "Canada",                      //optional default profile info      
                                   school: "BCIT"                          //optional default profile info
        }).then(function () {
               console.log("New user added to firestore");
               window.location.assign("main.html");       //re-direct to main.html after signup
        }).catch(function (error) {
               console.log("Error adding new user: " + error);
        });
    } else {
        return true;
    }
        return false;
    },