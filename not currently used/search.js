function binSearch(){
    document.getElementById("searchButton").addEventListener("click", () => {

        // Find item type
        let itemsSearched = "";
        if (document.getElementById("glass").checked)
            itemsSearched += document.getElementById("glass").value + " ";
        if (document.getElementById("metal").checked)
            itemsSearched += document.getElementById("metal").value + " ";
        if (document.getElementById("plastic-container").checked)
            itemsSearched += document.getElementById("plastic-container").value + " ";
        if (document.getElementById("batteries").checked)
            itemsSearched += document.getElementById("batteries").value + " ";
        if (document.getElementById("cans-bottles").checked)
            itemsSearched += document.getElementById("cans-bottles").value + " ";
        if (document.getElementById("paper").checked)
            itemsSearched += document.getElementById("paper").value + " ";
        if (document.getElementById("electronics").checked)
            itemsSearched += document.getElementById("electronics").value + " ";
        if (document.getElementById("flex-plastic").checked)
            itemsSearched += document.getElementById("flex-plastic").value + " ";
        if (document.getElementById("foam").checked)
            itemsSearched += document.getElementById("foam").value + " ";
        if (document.getElementById("other").checked)
            itemsSearched += document.getElementById("other").value + " ";

        // Get location
        let locationSearched = document.getElementById("postalcode").value;

        // Print information to console
        console.log("Items Searched: " + itemsSearched + ", Location: " + locationSearched);
    });
}

binSearch();