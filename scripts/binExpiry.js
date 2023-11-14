function binExpiry(){
    console.log("binExpiry loaded");
    const currentDate = new Date();

    db.collection("posts").get()
        .then(allBins => {
            allBins.forEach(doc => {
                let binDate = new Date(doc.data().enddate);

                if (currentDate > binDate){
                    db.collection("posts").doc(doc.id).update({status: "Inactive"});
                }
            });
        });
}