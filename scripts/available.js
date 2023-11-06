
//This function displays all the available bins on available.html
// function displayAvailableBins(collection) {
//     let cardTemplate = document.getElementById("available-bin-template")

//     db.collection(collection).get()
//         .then(allBins=> {
//             allBins.forEach(doc => {
//                 var title = doc.data().title;
//                 var location = doc.data().location;
//                 var type = doc.data().type;
//                 var docID = doc.id;
                

//                 let newCard = cardTemplate.content.cloneNode(true);

//                 newCard.querySelector('#available-title').innerHTML = title;
//                 newCard.querySelector('#available-location').innerHTML = location;
//                 newCard.querySelector('#available-item').innerHTML = type;
//                 newCard.querySelector('#view-available-details').href = "bininfo.html?docID="+docID;

//                 document.getElementById("available-bins-container").append(newCard);

//             })
//         })
// }

//function to manually add a bin
// function writeBins() {
//     var binsRef = db.collection("posts");

//     hikesRef.add({
//         title: "Olivia's Bottle Drive",
//         description: "Raising money for my baseball team. The bin is in my front yard",
//         endDate: "November 25",
//         status: "active",
//         type: "Bottles",
//         owner: 2048153,
        


//     });
// }

// This is the function that only shows active bins
function displayAvailableBins(collection) {
    let cardTemplate = document.getElementById("available-bin-template")

    db.collection(collection).where("status", "==", "Active")
        .get()
        .then(allBins=> {
            allBins.forEach(doc => {
                var title = doc.data().title;
                var location = doc.data().location;
                var type = doc.data().type;
                var docID = doc.id;
                

                let newCard = cardTemplate.content.cloneNode(true);

                newCard.querySelector("#available-title").innerHTML = title;
                newCard.querySelector("#available-location").innerHTML = location;
                newCard.querySelector("#available-item").innerHTML = type;
                newCard.querySelector('#view-available-details').href = "bininfo.html?docID="+docID;
                document.getElementById("available-bins-container").append(newCard);

            })
        })
}

displayAvailableBins("posts");