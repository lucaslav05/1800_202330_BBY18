var USERID;

//-----------------------------------------------------------------------
// This function displays all the bin info on the page, like title, location, 
// bin end date, accepted item type, bin description.
//-----------------------------------------------------------------------

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

//--------------------------------------------------------------------
// Listens to the file selection event when a user selects an image file through a file input element
// and retrieves the file input element. Event listener added to the file input 
// element, capturing the selected file which is stored in the global variable ImageFile
//--------------------------------------------------------------------

var ImageFile;
function listenFileSelect() {
    var fileInput = document.getElementById("mypic-input"); 
    const image = document.getElementById("mypic-goes-here"); 

    fileInput.addEventListener('change', function (e) {
        ImageFile = e.target.files[0];   
        var blob = URL.createObjectURL(ImageFile);
        image.src = blob; 
        console.log("This is the blob" + blob);


    })
}
listenFileSelect();

//----------------------------------------------------------------------
// Function is called when saving a post along with an associated image 
// Creates a storage reference for the image in Firebase Storage using the post document 
// ID and uploads the image file to Firebase Storage.
// Adds a new document to the "pictures" subcollection of the post has info like 
// owner's user ID and the timestamp.
//----------------------------------------------------------------------

function savePost(postDocID) {
    let params = new URL(window.location.href);
    let postID = params.searchParams.get("docID");
    var storageRef = storage.ref("images/" + postDocID + ".jpg");

    storageRef.put(ImageFile)
        .then(function () {



            alert("Image successfully saved!");
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
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
                    console.log("Error, no user signed in");
                }
            });
        });
};

//------------------------------------------------
// Stores the image associated with this post,
// such that the image name is the postid.
// This function is called after the post has been created, 
// and the post's document id is known.
//------------------------------------------------
function uploadPic(postDocID) {
    let params = new URL(window.location.href);
    let postID = params.searchParams.get("docID");
    console.log("inside uploadPic " + postDocID);
    var storageRef = storage.ref("images/" + postDocID + ".jpg");

    storageRef.put(ImageFile)  

 
        .then(function () {
            console.log('2. Uploaded to Cloud Storage.');
            storageRef.getDownloadURL()


                .then(function (url) { 
                    console.log("3. Got the download URL.");
                    console.log('4. Added pic URL to Firestore.');
                    location.reload();
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
        .limit(1)
        .get()
        .then(snap => {
            snap.forEach(doc => {
                let image = doc.data().image;
                let newcard = document.getElementById("pictureCardTemplate").content.cloneNode(true);

                console.log("the doc!!!" + doc + "image" + image);
                newcard.querySelector('.card-image').src = image;

                document.getElementById("Gallery").append(newcard);
            })
        })
}

//---------------------------------------------------------------------------------
// when view on map button is clicked user is redirected to map.html as well as
// passing the bins id using local storage.
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
