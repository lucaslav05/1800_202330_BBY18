// Updates the status of posts whose end date has passed to Inactive
function binExpiry(){
    console.log("binExpiry loaded");

    // Get the current date
    const currentDate = new Date();

    db.collection("posts").where("status", "==", "Active")
        .get()
        .then(allBins => {

            // Iterate through all of the posts
            allBins.forEach(doc => {
                let binDate = new Date(doc.data().enddate);

                // If the bin end date has passed, update the status to Inactive
                if (currentDate > binDate){
                    db.collection("posts").doc(doc.id).update({status: "Inactive"});
                }
            });
        });
}