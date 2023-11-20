
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
// The function is called when a user clicks "End Event"
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
      window.location.href = "confirm_end_event.html";
    })
    .catch(function (error) {
      console.error("Error updating status: ", error);
    });
}

document.querySelector("#endEvent").addEventListener("click", updateStatusToInactive);

// This function displays an alert prompting the user to confirm that they want to delete their post
function displayConfirmDelete() {
  document.getElementById("confirmDelete").style.display = "block";  // Display the alert message
}

// This function hides the alert prompting the user to confirm they want to delete their post
function cancelDelete() {
  document.getElementById("confirmDelete").style.display = "none";  // Hide the alert message
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
        for (let i = 0; i < postArray.length; i++) {
          console.log("id: " + postArray[i]);
          if (postArray[i] != postID) {

            newPostArray.push(postArray[i]);
            console.log("new array: " + newPostArray)
          }
        }

        // Use the new array as the user's new myPosts array
        db.collection("users").doc(userID).set(
          { "myposts": newPostArray }, { merge: true }   // set myposts to postArray
        ).then(() => {

          // Delete the post from Firestore
          db.collection("posts").doc(postID).delete();
          console.log("post was deleted!");
        });
      });
  });

}