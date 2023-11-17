function processForm(){
    document.getElementById("postButton").addEventListener( "click", () => {

        var postRef = db.collection("posts");

        let title = document.getElementById("title").value;
        let location = document.getElementById("address").value;
        let enddate = document.getElementById("endDate").value;
        let description = document.getElementById("description").value;

        //Get the radio button that was pressed
        let type = "n/a";
        if (document.getElementById("bottles").checked){
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
            title:  title,
            location: location,  
            enddate: enddate,
            type: type,
            description: description,
            status: "Active",
            favedByUser: [],
            last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time

        }) .then((docRef) => {
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
                        {"myposts": postArray}, {merge: true}   // set myposts to postArray
                    ).then(() => {
                        window.location.href="thankyou.html";
                    });
                    
                });
             
            });
 
        }) ;

} ); 

}
processForm();


