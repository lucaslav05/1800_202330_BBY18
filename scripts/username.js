
// This function is used to display the user's name on pages to create a personalized experience
// for the user.
function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {

            //print the uid and user name in the browser console
            console.log(user.uid);
            console.log(user.displayName);

            // Get the user's display name
            userName = user.displayName;

            // Put the user's display name on the page
            document.getElementById("name-goes-here").innerText = userName;

        } else {
            // No user is signed in.
        }
    });
}
getNameFromAuth()