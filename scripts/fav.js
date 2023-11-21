
// const myArrayRemove = firebase.firestore.FieldValue.arrayRemove("east_coast")
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
                    if (userData && userData.favourites && userData.favourites.includes(binID)) {
                        const favouritesWrap = document.getElementById("favouritesWrap");
                        favouritesWrap.innerHTML = "<button type=\"button\" class=\"btn btn-primary btn-sm\" id=\"favouritesBtn\" onclick=\"removeFromFavorites()\">Remove from favourites</button>";
                    } else {
                        console.log("binID not found in user's favourites");
                        favouritesWrap.innerHTML = "<button type=\"button\" class=\"btn btn-primary btn-sm\" id=\"favouritesBtn\" onclick=\"addToFavorites()\">Add to favourites</button>";
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

function addToFavorites() {
    const favouritesUnion = firebase.firestore.FieldValue.arrayUnion(binID)
    db.collection("users").doc(userID).update({
        favourites: favouritesUnion
    }).then(function () {
        console.log("New favorite bin to user document in firestore");
    }).catch(function (error) {
        console.log("Error adding new user: " + error);
    });
    const favedByUserUnion = firebase.firestore.FieldValue.arrayUnion(userEmail + " ID: " + userID)
    db.collection("posts").doc(binID).update({
        favedByUser: favedByUserUnion
    }).then(function () {
        console.log("New user added to bin document firestore");
        window.location.assign("favourites.html");
    }).catch(function (error) {
        console.log("Error adding new user: " + error);
    });
}
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