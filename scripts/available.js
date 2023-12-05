
// Displays all the posts that have status Active
function displayAvailableBins(collection) {
    let cardTemplate = document.getElementById("available-bin-template")

    db.collection(collection).where("status", "==", "Active")
        .get()
        .then(allBins => {
            allBins.forEach(doc => {
                var title = doc.data().title;
                var location = doc.data().location;
                var type = doc.data().type;
                var docID = doc.id;


                let newCard = cardTemplate.content.cloneNode(true);

                newCard.querySelector("#available-title").innerHTML = title;
                newCard.querySelector("#available-location").innerHTML = location;
                newCard.querySelector("#available-item").innerHTML = type;
                newCard.querySelector('#view-available-details').href = "bininfo.html?docID=" + docID;
                document.getElementById("available-bins-container").append(newCard);

            })
        })
}

displayAvailableBins("posts");

// Gets the item type selection from the filter by item types form and calls on the displayFilteredItems function to display
// only the posts with that item type
function applyItemFilter() {

    document.getElementById("applyFilter").addEventListener("click", function () {
        let type = "n/a";
        if (document.getElementById("bottlesFilter").checked) {
            type = document.getElementById("bottlesFilter").value;
            displayFilteredBins(type);
        } else if (document.getElementById("cardboardFilter").checked) {
            type = document.getElementById("cardboardFilter").value;
            displayFilteredBins(type);
        } else if (document.getElementById("electronicsFilter").checked) {
            type = document.getElementById("electronicsFilter").value;
            displayFilteredBins(type);
        } else if (document.getElementById("metalFilter").checked) {
            type = document.getElementById("metalFilter").value;
            displayFilteredBins(type);
        } else if (document.getElementById("styrofoamFilter").checked) {
            type = document.getElementById("styrofoamFilter").value;
            displayFilteredBins(type);
        } else if (document.getElementById("otherFilter").checked) {
            type = document.getElementById("otherFilter").value;
            displayFilteredBins(type);
        }
    })

}

applyItemFilter();


// function that accepts a string, itemType, as a parameter and displays only the posts with that item type
function displayFilteredBins(itemType) {
    let cardTemplate = document.getElementById("available-bin-template")
    document.getElementById("filtered-bins-container").style.display = "auto";  // Display filtered bins container
    document.getElementById("removeFilter").style.display = "block";  // Display remove filter button
    document.getElementById("available-bins-container").style.display = "none";  // Hide the available bins container

    document.getElementById("filtered-bins-container").innerHTML = "";


    db.collection("posts").where("status", "==", "Active").where("type", "==", itemType)
        .get()
        .then(filteredBins => {
            filteredBins.forEach(doc => {
                var title = doc.data().title;
                var location = doc.data().location;
                var type = doc.data().type;
                var docID = doc.id;


                let newCard = cardTemplate.content.cloneNode(true);

                newCard.querySelector("#available-title").innerHTML = title;
                newCard.querySelector("#available-location").innerHTML = location;
                newCard.querySelector("#available-item").innerHTML = type;
                newCard.querySelector('#view-available-details').href = "bininfo.html?docID=" + docID;
                document.getElementById("filtered-bins-container").append(newCard);
            })

        })
}

// Reloads the page when the "Remove Filter" button is clicked so that all the available bins are displayed again
function removeFilter() {
    window.location.reload();

}
