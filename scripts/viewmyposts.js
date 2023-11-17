
// Displays the information for the post that the user selected
function displayMyPost() {
  let params = new URL(window.location.href);
  let ID = params.searchParams.get("docID");
  db.collection("posts")
    .doc(ID)
    .get()
    .then(doc => {
      myPost = doc.data();

      postTitle = doc.data().title;
      postLocation = doc.data().location;
      postEnd = doc.data().enddate;
      postType = doc.data().type;
      postDescription = doc.data().description;
      postStatus = doc.data().status;
      var docID = doc.data().id;

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

// This fucntion deletes the post from firestore
// Still need to add functionality so that it removes the postID from the user's myPosts array and from other users' favourites arrays
function confirmDelete() {

  // Get the postID
  let params = new URL(window.location.href);
  let postID = params.searchParams.get("docID");
  console.log("post to be deleted" + postID)

  // Delete the post from Firestore
  db.collection("posts").doc(postID).delete();
  console.log("post was deleted!")
}