function addItems() {
    document.getElementById("addItemsButton").addEventListener("click",() =>{
        console.log("add items button clicked!");
    });

}

function addToFavourites(){
    document.getElementById("favouriteButton").addEventListener("click", () => {
        console.log("added to favourites!");
    })
}

function viewOnMap(){
    document.getElementById("viewOnMap").addEventListener("click", () => {
        console.log("view on map clicked!");
    })
}

addItems();
addToFavourites();
viewOnMap();