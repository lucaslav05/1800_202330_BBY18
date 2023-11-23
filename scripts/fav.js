
// const myArrayRemove = firebase.firestore.FieldValue.arrayRemove("east_coast")
// const auth = firebase.auth();
// let params = new URL(window.location.href);
// let binID = params.searchParams.get("docID");
// let userID;
// let userEmail;

// auth.onAuthStateChanged(user => {
//     if (user) {
//         userID = user.uid;
//         userEmail = user.email;
//         const userDocRef = db.collection("users").doc(user.uid);
//         userDocRef
//             .get()
//             .then((doc) => {
//                 if (doc.exists) {
//                     const userData = doc.data();
//                     try {
//                         if (userData && userData.favourites && userData.favourites.includes(binID)) {
//                             const favouritesWrap = document.getElementById("favouritesWrap");
//                             favouritesWrap.innerHTML = "<button type=\"button\" class=\"btn btn-primary btn-sm\" id=\"favouritesBtn\" onclick=\"removeFromFavorites()\">Remove from favourites</button>";
//                         } else {
//                             console.log("binID not found in user's favourites");
//                             favouritesWrap.innerHTML = "<button type=\"button\" class=\"btn btn-primary btn-sm\" id=\"favouritesBtn\" onclick=\"addToFavorites()\">Add to favourites</button>";
//                         }
//                     } catch (error) {
//                     }
                    
//                 } else {
//                     console.log("User document not found");
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error getting user document:", error);
//             });
//     } else {
//         window.location.assign("login.html");
//     }
// });

// function addToFavorites() {
//     const favouritesUnion = firebase.firestore.FieldValue.arrayUnion(binID)
//     db.collection("users").doc(userID).update({
//         favourites: favouritesUnion
//     }).then(function () {
//         console.log("New favorite bin to user document in firestore");
//     }).catch(function (error) {
//         console.log("Error adding new user: " + error);
//     });
//     const favedByUserUnion = firebase.firestore.FieldValue.arrayUnion(userID)
//     db.collection("posts").doc(binID).update({
//         favedByUser: favedByUserUnion
//     }).then(function () {
//         console.log("New user added to bin document firestore");
//         window.location.assign("favourites.html");
//     }).catch(function (error) {
//         console.log("Error adding new user: " + error);
//     });
// }
// function removeFromFavorites() {
//     const favouritesUnion = firebase.firestore.FieldValue.arrayRemove(binID)
//     db.collection("users").doc(userID).update({
//         favourites: favouritesUnion
//     }).then(function () {
//         console.log("New favorite bin to user document in firestore");
//     }).catch(function (error) {
//         console.log("Error adding new user: " + error);
//     });
//     const favedByUserUnion = firebase.firestore.FieldValue.arrayRemove(userEmail + " ID: " + userID)
//     db.collection("posts").doc(binID).update({
//         favedByUser: favedByUserUnion
//     }).then(function () {
//         console.log("New user added to bin document firestore");
//         window.location.assign("favourites.html");
//     }).catch(function (error) {
//         console.log("Error adding new user: " + error);
//     });
// }



function getMyFavourites() {

    
    firebase.auth().onAuthStateChanged(user => {
        let userID = user.uid;  //get the current user's ID
        console.log(userID);
        db.collection("users").doc(userID).get()  // access the user's document in firestore
                .then((userDoc) => {
                    
                    postArray = userDoc.data().favourites; // access the user's post array and save it in variable postArray
                    console.log(postArray);
                    let i = 0;
                    while (i < postArray.length){ //iterate through all the posts in myposts
                        console.log(postArray[i]);
                        displayFavourites(postArray[i]); // call on displayMyPost to display each post
                        i++;
                    }

                    // if the user has not made any posts
                    if (i == 0){
                        console.log("you have not made any posts");
                    }
                })

    });
}

function displayFavourites(postID){
    let cardTemplate = document.getElementById("my-favourites-template");
    
    db.collection("posts").doc(postID).get()  // access the post
    .then((postDoc) => {

        // get the title, location, and item type of the post
        var title = postDoc.data().title;
        var location = postDoc.data().location;
        var type = postDoc.data().type;
        var docID = postDoc.id; 

        // create a new card
        let newCard = cardTemplate.content.cloneNode(true);
        
        //put the title, location and item type in the card
        newCard.querySelector("#my-favourites-title").innerHTML = title;
        newCard.querySelector("#my-favourites-location").innerHTML = location;
        newCard.querySelector("#my-favourites-item").innerHTML = type;
        newCard.querySelector('#view-my-favourites-details').href = "bininfo.html?docID="+postID;
        
        // display the card
        document.getElementById("my-favourites-container").append(newCard);

    })
}

getMyFavourites();

