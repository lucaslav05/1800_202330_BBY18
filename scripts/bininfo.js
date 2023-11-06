// function addItems() {
//     document.getElementById("addItemsButton").addEventListener("click",() =>{
//         console.log("add items button clicked!");
//     });

// }

// function addToFavourites(){
//     document.getElementById("favouriteButton").addEventListener("click", () => {
//         console.log("added to favourites!");
//     })
// }

// function viewOnMap(){
//     document.getElementById("viewOnMap").addEventListener("click", () => {
//         console.log("view on map clicked!");
//     })
// }

// addItems();
// addToFavourites();
// viewOnMap();

function displayBinInfo() {
    let params = new URL(window.location.href);
    let ID = params.searchParams.get("docID");
    console.log(ID);

    db.collection("posts")
        .doc(ID)
        .get()
        .then(doc => {
            thisBin = doc.data();
            

            binTitle = doc.data().title;
            binLocation = doc.data().location;
            binStart = doc.data().startdate;
            binEnd = doc.data().enddate;
            binType = doc.data().type;
            binDescription = doc.data().description;

            document.getElementById("bintitle").innerHTML = binTitle;
            document.getElementById("binlocation").innerHTML = binLocation;
            document.getElementById("binend").innerHTML = binEnd;
            document.getElementById("binitemtype").innerHTML = binType;
            document.getElementById("bindetails").innerHTML = binDescription;



        });
}

displayBinInfo();