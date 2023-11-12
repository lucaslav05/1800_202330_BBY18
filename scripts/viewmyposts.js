function displayMyPost(){
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
            var docID = doc.data().id;

            document.getElementById("myPostTitle").innerHTML = postTitle;
            document.getElementById("myPostLocation").innerHTML = postLocation;
            document.getElementById("myPostEnd").innerHTML = postEnd;
            document.getElementById("myPostItemType").innerHTML = postType;
            document.getElementById("myPostDescription").innerHTML = postDescription;

        })
}

displayMyPost();

var collectionName = "posts";

    function updateStatusToInactive() {
      // Replace 'YOUR_DOCUMENT_ID' with the actual document ID you want to update
      let params = new URL(window.location.href);
      let postID = params.searchParams.get("docID");

      // Get a reference to the Firestore database
      var db = firebase.firestore();

      // Update the status from active to inactive
      db.collection(collectionName).doc(postID).update({
        status: "Inactive"
      })
      .then(function() {
        console.log("Status updated to Inactive.");
      })

      // Go to the confirm end event page
      .then(() =>{
        window.location.href = "confirm_end_event.html";
      })
      .catch(function(error) {
        console.error("Error updating status: ", error);
      });
    }

    document.querySelector("#endEvent").addEventListener("click", updateStatusToInactive);