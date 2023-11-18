function processForm() {
    document.getElementById("postButton").addEventListener("click", () => {

        var postRef = db.collection("posts");
        var ImageFile;

        let title = document.getElementById("title").value;
        let location = document.getElementById("address").value;
        let enddate = document.getElementById("endDate").value;
        let description = document.getElementById("description").value;

        //Get the radio button that was pressed
        let type = "n/a";
        if (document.getElementById("bottles").checked) {
            type = document.getElementById("bottles").value;
        } else if (document.getElementById("cardboard").checked) {
            type = document.getElementById("cardboard").value;
        } else if (document.getElementById("electronics").checked) {
            type = document.getElementById("electronics").value;
        } else if (document.getElementById("metal").checked) {
            type = document.getElementById("metal").value;
        } else if (document.getElementById("styrofoam").checked) {
            type = document.getElementById("styrofoam").value;
        }

        postRef.add({
            title: title,
            location: location,
            enddate: enddate,
            type: type,
            description: description,
            status: "Active",
            favedByUser: [],
            last_updated: firebase.firestore.FieldValue.serverTimestamp(),  //current system time
            image: null

        }).then((docRef) => {
            console.log("post id" + docRef.id);
            var postID = docRef.id;    //get the postID

            firebase.auth().onAuthStateChanged(user => {
                console.log("UserId " + user.uid);
                let userID = user.uid;  //get the userID
                db.collection("users").doc(userID).get()
                    .then((userDoc) => {
                        console.log("the post id" + postID)
                        postArray = userDoc.data().myposts; //create an array that is the same as user's myposts array
                        postArray.push(postID);  // add the postId to postArray
                        console.log("array " + postArray)
                        db.collection("users").doc(userID).set(
                            { "myposts": postArray }, { merge: true }   // set myposts to postArray
                        ).then(() => {
                            window.location.href = "thankyou.html";
                        });

                    });

            });

            // Call the function to handle image upload
            handleImageUpload(postID);
        });

    });

}

// Function to handle image upload
function handleImageUpload(postID) {
    var storageRef = storage.ref("images/" + postID + ".jpg");
    var fileInput = document.getElementById("mypic-input");
    var image = document.getElementById("mypic-goes-here");

    if (fileInput.files.length > 0) {
        var ImageFile = fileInput.files[0];

        storageRef.put(ImageFile)
            .then(function () {
                console.log('Image uploaded to Cloud Storage.');
                storageRef.getDownloadURL()
                    .then(function (url) {
                        console.log("Got the download URL.");

                        // Update the post document with the image URL
                        db.collection("posts").doc(postID).update({
                            "image": url
                        }).then(function () {
                            console.log("Added pic URL to Firestore post doc " + postID);
                        }).catch((error) => {
                            console.log("Error adding pic URL to Firestore: ", error);
                        });
                    })
                    .catch((error) => {
                        console.log("Error getting download URL: ", error);
                    });
            })
            .catch((error) => {
                console.log("Error uploading to Cloud Storage: ", error);
            });
    }
}
processForm();


