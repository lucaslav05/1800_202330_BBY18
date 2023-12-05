var USERID;


function displayBinInfo() {
    let params = new URL(window.location.href);
    ID = params.searchParams.get("docID");


    console.log(ID);
    db.collection("posts")
        .doc(ID)
        .get()
        .then(doc => {
            thisBin = doc.data();


            binTitle = doc.data().title;
            binLocation = doc.data().location;
            binStart = doc.data().startdate;
            binEnd = doc.data().enddate;
            binType = doc.data().type;
            binDescription = doc.data().description;

            document.getElementById("bintitle").innerHTML = binTitle;
            document.getElementById("binlocation").innerHTML = binLocation;
            document.getElementById("binend").innerHTML = binEnd;
            document.getElementById("binitemtype").innerHTML = binType;
            document.getElementById("bindetails").innerHTML = binDescription;



        });
}

displayBinInfo();

var ImageFile;
function listenFileSelect() {
    // listen for file selection
    var fileInput = document.getElementById("mypic-input"); // pointer #1
    const image = document.getElementById("mypic-goes-here"); // pointer #2



    // When a change happens to the File Chooser Input
    fileInput.addEventListener('change', function (e) {
        ImageFile = e.target.files[0];   //Global variable
        var blob = URL.createObjectURL(ImageFile);
        image.src = blob; // Display this image
        console.log("This is the blob" + blob);


    })
}
listenFileSelect();

function savePost(postDocID) {
    let params = new URL(window.location.href);
    let postID = params.searchParams.get("docID");
    var storageRef = storage.ref("images/" + postDocID + ".jpg");

    storageRef.put(ImageFile)
        .then(function () {



            alert("Image successfully saved!");
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    // User is signed in.
                    // Do something for the user here. 
                    console.log(user.uid);
                    USERID = user.uid;
                    storageRef.getDownloadURL()
                        .then(function (imageURL) {
                            var url = imageURL;

                            console.log("this is url" + url);
                            db.collection("posts").doc(postID).collection("pictures").add({
                                owner: user.uid,
                                last_updated: firebase.firestore.FieldValue.serverTimestamp(), //current system time
                                image: url

                            }).then(doc => {
                                console.log("1. Post document added!");
                                console.log(doc.id);
                                uploadPic(doc.id);
                            })
                        });
                } else {
                    // No user is signed in.
                    console.log("Error, no user signed in");
                }
            });
        });
};

//------------------------------------------------
// So, a new post document has just been added
// and it contains a bunch of fields.
// We want to store the image associated with this post,
// such that the image name is the postid (guaranteed unique).

// This function is called AFTER the post has been created, 
// and we know the post's document id.
//------------------------------------------------
function uploadPic(postDocID) {
    let params = new URL(window.location.href);
    let postID = params.searchParams.get("docID");
    console.log("inside uploadPic " + postDocID);
    var storageRef = storage.ref("images/" + postDocID + ".jpg");

    storageRef.put(ImageFile)   //global variable ImageFile

        // AFTER .put() is done
        .then(function () {
            console.log('2. Uploaded to Cloud Storage.');
            storageRef.getDownloadURL()

                // AFTER .getDownloadURL is done
                .then(function (url) { // Get URL of the uploaded file
                    console.log("3. Got the download URL.");

                    // Now that the image is on Storage, we can go back to the
                    // post document, and update it with an "image" field
                    // that contains the url of where the picture is stored.
                    // db.collection("posts").doc(postDocID).collection("pictures").add({
                    //         "image": url, // Save the URL into pictures storage
                    //         "owner": USERID
                    //     })
                    // AFTER .update is done
                    // .then(function () {
                    console.log('4. Added pic URL to Firestore.');
                    location.reload();
                    // One last thing to do:
                    // save this postID into an array for the OWNER
                    // so we can show "my posts" in the future
                    // savePostIDforUser(postDocID);
                })
        })
        // })
        .catch((error) => {
            console.log("error uploading to cloud storage");
        })
}

//-------------------------------------------------
// this function shows the last image posted from the 
// stand alone pictures subcollection
//------------------------------------------------
function showPictures() {
    document.getElementById("Gallery").innerHTML= "";
    console.log("show picture");
    let params = new URL(window.location.href);
    let postID = params.searchParams.get("docID");
    db.collection("posts").doc(postID).collection("pictures")
        //.orderBy(...)       //optional ordering
        //.limit(3)           //optional limit
        .limit(1)
        .get()
        .then(snap => {
            snap.forEach(doc => {
                let image = doc.data().image;
                let newcard = document.getElementById("pictureCardTemplate").content.cloneNode(true);

                console.log("the doc!!!" + doc + "image" + image);
                newcard.querySelector('.card-image').src = image;
                //append to the posts
                document.getElementById("Gallery").append(newcard);
                // displayPictures(doc);
            })
        })
}

//---------------------------------------------------------------------------------
// add a description 
//---------------------------------------------------------------------------------
document.getElementById('viewOnMap').addEventListener('click', function () {
    // set the ID in local storage
    localStorage.setItem('id', ID);

    // Check if ID is available
    if (ID) {
        // Redirect to the map.html page with the ID as a query parameter
        window.location.href = 'map.html?docID=' + ID;
    } else {
        console.error('No docID found.');
    }
});


//------------------------------------------------------------------------------------
// This function calls the remove from favourites and add to favourites functon. 
// Keeps track of the logged in user whether the post is already favourited or not and 
// will display the appropriate corresponding button.
//------------------------------------------------------------------------------------

const auth = firebase.auth();
let params = new URL(window.location.href);
let binID = params.searchParams.get("docID");
let userID;
let userEmail;


auth.onAuthStateChanged(user => {
    if (user) {
        userID = user.uid;
        userEmail = user.email;
        const userDocRef = db.collection("users").doc(user.uid);
        userDocRef
            .get()
            .then((doc) => {
                if (doc.exists) {
                    const userData = doc.data();
                    try {
                        if (userData && userData.favourites && userData.favourites.includes(binID)) {
                            const favouritesWrap = document.getElementById("favouritesWrap");
                            favouritesWrap.innerHTML = "<button type=\"button\" class=\"btn btn-primary btn-sm\" id=\"favouritesBtn\" onclick=\"removeFromFavorites()\">Remove from favourites</button>";
                        } else {
                            console.log("binID not found in user's favourites");
                            favouritesWrap.innerHTML = "<button type=\"button\" class=\"btn btn-primary btn-sm\" id=\"favouritesBtn\" onclick=\"addToFavorites()\">Add to favourites</button>";
                        }
                    } catch (error) {
                    }
                    
                } else {
                    console.log("User document not found");
                }
            })
            .catch((error) => {
                console.error("Error getting user document:", error);
            });
    } else {
        window.location.assign("login.html");
    }
});

//------------------------------------------------------------------------------------
// this function adds the binID to the user's favourites array in Firebase.
// and it adds the user id to the favedByUser array in the post doc in Firebase.
//------------------------------------------------------------------------------------
function addToFavorites() {
    const favouritesUnion = firebase.firestore.FieldValue.arrayUnion(binID)
    db.collection("users").doc(userID).update({
        favourites: favouritesUnion
    }).then(function () {
        console.log("New favorite bin to user document in firestore");
    }).catch(function (error) {
        console.log("Error adding new user: " + error);
    });
    const favedByUserUnion = firebase.firestore.FieldValue.arrayUnion(userID)
    db.collection("posts").doc(binID).update({
        favedByUser: favedByUserUnion
    }).then(function () {
        console.log("New user added to bin document firestore");
        window.location.assign("favourites.html");
    }).catch(function (error) {
        console.log("Error adding new user: " + error);
    });
}

//------------------------------------------------------------------------------------
// this function removes the binID from the user's favourites array in Firebase.
// and it removes the user id from the favedByUser array in the post doc in Firebase.
//------------------------------------------------------------------------------------
function removeFromFavorites() {
    const favouritesUnion = firebase.firestore.FieldValue.arrayRemove(binID)
    db.collection("users").doc(userID).update({
        favourites: favouritesUnion
    }).then(function () {
        console.log("New favorite bin to user document in firestore");
    }).catch(function (error) {
        console.log("Error adding new user: " + error);
    });
    const favedByUserUnion = firebase.firestore.FieldValue.arrayRemove(userEmail + " ID: " + userID)
    db.collection("posts").doc(binID).update({
        favedByUser: favedByUserUnion
    }).then(function () {
        console.log("New user added to bin document firestore");
        window.location.assign("favourites.html");
    }).catch(function (error) {
        console.log("Error adding new user: " + error);
    });
       
}
