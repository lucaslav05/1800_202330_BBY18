function binExpiry(){
    console.log("binExpiry loaded");
    const currentDate = new Date();

    db.collection("posts").get()
        .then(allBins => {
            allBins.forEach(doc => {
                let binDate = doc.data().enddate;

                if (binDate > currentDate){
                    db.collection("posts").doc(doc.id).update({status: "Inactive"});
                }
            });
        });
}