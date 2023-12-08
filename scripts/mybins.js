//--------------------------------------------------------------
// Confirm user is logged in and get the current user's ID 
// and accesses the users post array and save it in variable postArray
//--------------------------------------------------------------
function getMyPosts() {

    
    firebase.auth().onAuthStateChanged(user => {
        let userID = user.uid;  //get the current user's ID
        console.log(userID);
        db.collection("users").doc(userID).get()  // access the user's document in firestore
                .then((userDoc) => {
                    
                    postArray = userDoc.data().myposts; // access the user's post array and save it in variable postArray
                    console.log(postArray);
                    let i = 0;
                    while (i < postArray.length){ //iterate through all the posts in myposts
                        console.log(postArray[i]);
                        displayMyPost(postArray[i]); // call on displayMyPost to display each post
                        i++;
                    }

                    // if the user has not made any posts
                    if (i == 0){
                        console.log("you have not made any posts");
                    }
                })

    });
}

//--------------------------------------------------------------
// Display posts will display all posts in the post collection.
// Info included is title, location, type, status, item type, description.
//  Function is called above to only display the current users.
//--------------------------------------------------------------

function displayMyPost(postID){
    let cardTemplate = document.getElementById("my-posts-template");
    
    db.collection("posts").doc(postID).get()  // access the post
    .then((postDoc) => {

        // get the title, location, and item type of the post
        var title = postDoc.data().title;
        var location = postDoc.data().location;
        var type = postDoc.data().type;
        var status = postDoc.data().status;
        var docID = postDoc.id;
        var image = postDoc.data().image; 

        // create a new card
        let newCard = cardTemplate.content.cloneNode(true);
        
        //put the title, location and item type in the card
        newCard.querySelector("#my-post-title").innerHTML = title;
        newCard.querySelector("#my-post-location").innerHTML = location;
        newCard.querySelector("#my-post-item").innerHTML = type;
        newCard.querySelector("#my-post-status").innerHTML = status;
        newCard.querySelector("#my-post-status").src = image;
        newCard.querySelector('#view-my-post-details').href = "mybinsinfo.html?docID="+postID;
        
        // display the card
        document.getElementById("my-posts-container").append(newCard);

    })
}

getMyPosts();