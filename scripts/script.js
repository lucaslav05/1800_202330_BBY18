//------------------------------------------------
// This function is called on login.html and index.html to ensure users are logged out.
//-------------------------------------------------
function logout() {
  firebase.auth().signOut().then(() => {
    // Sign-out successful.
    console.log("logging out user");
  }).catch((error) => {
    // An error happened.
  });
}