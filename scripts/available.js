
//This function displays all the available bins on available.html
function displayAvailableBins(collection) {
    let cardTemplate = document.getElementById("available-bin-template")

    db.collection(collection).get()
        .then(allBins=> {
            allBins.forEach(doc => {
                var title = doc.data().title;
                var location = doc.data().location;
                var type = doc.data().type;

                let newcard = cardTemplate.contentEditable.cloneNode(true);

                newcard.querySelector("#available-title").innerHTML = title;
                newcard.querySelector("#available-location").innerHTML = location;
                newcard.querySelector("#available-item").innerHTML = type;

                document.getElementById("available-bins-container").append(newCard);

            })
        })
}

// This is the function that only shows active bins
// function displayAvailableBins(collection) {
//     let cardTemplate = document.getElementById("available-bin-template")

//     db.collection(collection).where("status", "==", "active")
//         .get()
//         .then(allBins=> {
//             allBins.forEach(doc => {
//                 var title = doc.data().title;
//                 var location = doc.data().location;
//                 var type = doc.data().type;

//                 let newcard = cardTemplate.contentEditable.cloneNode(true);

//                 newcard.querySelector("#available-title").innerHTML = title;
//                 newcard.querySelector("#available-location").innerHTML = location;
//                 newcard.querySelector("#available-item").innerHTML = type;

//                 document.getElementById("available-bins-container").append(newCard);

//             })
//         })
// }

displayAvailableBins("posts");