// function displayMyPosts(collection) {
//     let cardTemplate = document.getElementById("my-posts-template")

//     db.collection(collection).where("location, "==", "1234 Bcit Lane")
//         .get()
//         .then(allBins=> {
//             allBins.forEach(doc => {
//                 var title = doc.data().title;
//                 var location = doc.data().location;
//                 var type = doc.data().type;
//                 var docID = doc.id;
                

//                 let newCard = cardTemplate.content.cloneNode(true);

//                 newCard.querySelector("#my-post-title").innerHTML = title;
//                 newCard.querySelector("#my-post-location").innerHTML = location;
//                 newCard.querySelector("#my-post-item").innerHTML = type;
//                 newCard.querySelector('#view-my-post-details').href = "mybinsinfo.html?docID="+docID;
//                 document.getElementById("my-post-container").append(newCard);

//             })
//         })
// }

// displayMyPosts("posts");

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

function displayMyPost(postID){
    let cardTemplate = document.getElementById("my-posts-template");
    
    db.collection("posts").doc(postID).get()  // access the post
    .then((postDoc) => {

        // get the title, location, and item type of the post
        var title = postDoc.data().title;
        var location = postDoc.data().location;
        var type = postDoc.data().type;

        // create a new card
        let newCard = cardTemplate.content.cloneNode(true);
        
        //put the title, location and item type in the card
        newCard.querySelector("#my-post-title").innerHTML = title;
        newCard.querySelector("#my-post-location").innerHTML = location;
        newCard.querySelector("#my-post-item").innerHTML = type;
        newCard.querySelector('#view-my-post-details').href = "mybininfo.html?docID="+postID;
        
        // display the card
        document.getElementById("my-posts-container").append(newCard);

    })
}

getMyPosts();



