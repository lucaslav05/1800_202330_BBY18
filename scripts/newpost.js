function processForm(){
    document.getElementById("postButton").addEventListener( "click", () => {

        var postRef = db.collection("posts");

        let title = document.getElementById("title").value;
        let enddate = document.getElementById("endDate").value;
        let description = document.getElementById("description").value;
        let placeCoord = localStorage.getItem("place_coord");
        let [longitude, latitude] = placeCoord.split(",").map(coord => parseFloat(coord.trim()));
        let coordinates = new firebase.firestore.GeoPoint(latitude, longitude);


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
            coordinates: coordinates,
            enddate: enddate,
            type: type,
            description: description,
            status: "Active",
            last_updated: firebase.firestore.FieldValue.serverTimestamp(),  //current system time

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

function placeGeocoder() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbWNoZW4zIiwiYSI6ImNsMGZyNWRtZzB2angzanBjcHVkNTQ2YncifQ.fTdfEXaQ70WoIFLZ2QaRmQ';
    const geocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        types: 'place,postcode,locality,neighborhood,address',
        placeholder: 'Enter address',
        minLength: 3, // Minimum number of characters before a search is performed
    });

    geocoder.addTo('#geocoder');

    const results = document.getElementById('result');

    geocoder.on('result', (e) => {
        var jsondata = JSON.stringify(e.result, null, 2);
        var data = JSON.parse(jsondata);
        console.log(data);
        var place_name = data["place_name"];
        var place_coord = data["geometry"]["coordinates"];
        results.innerText = place_name + " " + place_coord;

        // Save geocoded coordinates to local storage
        localStorage.setItem("place_name", place_name);
        localStorage.setItem("place_coord", place_coord);
    });

    geocoder.on('clear', () => {
        results.innerText = '';
    });
}

placeGeocoder();





