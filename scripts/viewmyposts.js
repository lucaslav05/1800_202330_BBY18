
// Displays the information for the post that the user selected from mybins.html
function displayMyPost() {

  // Get the post ID
  let params = new URL(window.location.href);
  let ID = params.searchParams.get("docID");
  db.collection("posts")
    .doc(ID)
    .get()
    .then(doc => {
      myPost = doc.data();

      // Get the attributes of the post
      postTitle = doc.data().title;
      postLocation = doc.data().location;
      postEnd = doc.data().enddate;
      postType = doc.data().type;
      postDescription = doc.data().description;
      postStatus = doc.data().status;
      var docID = doc.data().id;

      // Display the attributes of the post in the correct place
      document.getElementById("myPostTitle").innerHTML = postTitle;
      document.getElementById("myPostLocation").innerHTML = postLocation;
      document.getElementById("myPostEnd").innerHTML = postEnd;
      document.getElementById("myPostItemType").innerHTML = postType;
      document.getElementById("myPostDescription").innerHTML = postDescription;
      document.getElementById("myPostStatus").innerHTML = postStatus;

    })
}

displayMyPost();

var collectionName = "posts";

// This function updates the status of a post to "Inactive"
// The function is called when a user clicks "Confirm End"
function updateStatusToInactive() {

  // Get the post ID
  let params = new URL(window.location.href);
  let postID = params.searchParams.get("docID");

  var db = firebase.firestore();

  // Update the status from active to inactive
  db.collection(collectionName).doc(postID).update({
    status: "Inactive"
  })
    .then(function () {
      console.log("Status updated to Inactive.");
    })

    // Go to the confirm end event page
    .then(() => {
      window.location.reload();
    })
    .catch(function (error) {
      console.error("Error updating status: ", error);
    });
}

document.querySelector("#confirmEndButton").addEventListener("click", updateStatusToInactive);

// This function displays an alert prompting the user to confirm that they want to delete their post
function displayConfirmDelete() {
  document.getElementById("confirmDelete").style.display = "block";  // Display the alert message
}

// This function hides the alert prompting the user to confirm they want to delete their post
function cancelDelete() {
  document.getElementById("confirmDelete").style.display = "none";  // Hide the alert message
}

function cancelEnd() {
  document.getElementById("confirmEnd").style.display = "none";  // Hide the alert message
}

function displayConfirmEnd() {
  document.getElementById("confirmEnd").style.display = "block";  // Display the alert message
}


// This function deletes a post from firestore and removes the post id from the users myPosts array in firestore
// It is called when the "confirm delete" button is clicked
// !!! Still need to remove the bin from the favourites array for all users who have favourited the post!!!
function confirmDelete() {

  // Get the postID
  let params = new URL(window.location.href);
  let postID = params.searchParams.get("docID");
  console.log("post to be deleted: " + postID)

  // Get the userID
  firebase.auth().onAuthStateChanged(user => {
    let userID = user.uid;
    db.collection("users").doc(userID).get()
      .then((userDoc) => {
        let postArray = userDoc.data().myposts;
        console.log(postArray);

        // Create a new array that does not contain the deleted post's id
        let newPostArray = [];
        for (let k = 0; k < postArray.length; k++) {
          console.log("id: " + postArray[k]);
          if (postArray[k] != postID) {

            newPostArray.push(postArray[k]);
            console.log("new array: " + newPostArray)
          }
        }

        

        // Use the new array as the user's new myPosts array
        db.collection("users").doc(userID).set(
          { "myposts": newPostArray }, { merge: true }   // set myposts to postArray
        )
      }).then(() => {
        
        // removeFromFavourites();
          // Delete the post from Firestore
        db.collection("posts").doc(postID).delete()
        .then(() => {
          window.location.href = "confirm_end_event.html";
        })
        console.log("post was deleted!");
        
      })
      // }).then(() => {
      //   window.location.href = "confirm_end_event.html";
      // });  this one won't delete the post
    })
    // .then(() =>{
    //   window.location.href = "confirm_end_event.html";
    // }) this one won't go to a new page
    
  }

// Removes the specified postId from from all the favourite arrays of users who have favourited the post
function removeFromFavourites(){
  console.log("remove favourites accessed");

  let params = new URL(window.location.href);
  let postID = params.searchParams.get("docID");
  console.log("post to be deleted: " + postID);

  // Get the post
  db.collection("posts").doc(postID).get()
  .then((postDoc) => {
    console.log(postDoc);

    // Get the array "favedByUser"
    let users = postDoc.data().favedByUser;
    console.log("users array: " + users);

    // For each user
    var i = 0;
    while(i < users.length){
      console.log("i is equal to" + i);
      let currentUser = users[i];
      db.collection("users").doc(users[i]).get()
      .then((userDoc) => {

        // Get that users favourites
        let currentFaves = userDoc.data().favourites;
        let newFaves = [];

        // Make a new array that is all the favourites except the one being deleted
        for (let j = 0; j < currentFaves.length; j++) {
          console.log("id: " + currentFaves[j]);
          if (currentFaves[j] != postID) {

            newFaves.push(currentFaves[j]);
            console.log("new array: " + newFaves)
          }
        }

        console.log("current user" + currentUser);

        // Set favourites to be newFaves
        db.collection("users").doc(currentUser).set(
          
          { "favourites": newFaves }, { merge: true }
        )
        
      })
      
      i += 1;
      
    }
    
      confirmDelete();
    
  })
}

//THOUGHTS IN MY BRAIN: have the confirm delete button call the remove from favourites and then, put a .then at the end of remove from favourites
// and call the confirm delete function --> this way you can ensure that the post has been removed from favourites before deleting