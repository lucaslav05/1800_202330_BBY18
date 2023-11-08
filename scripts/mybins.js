function displayMyPosts(collection) {
    let cardTemplate = document.getElementById("my-posts-template")

    db.collection(collection).where("location, "==", "1234 Bcit Lane")
        .get()
        .then(allBins=> {
            allBins.forEach(doc => {
                var title = doc.data().title;
                var location = doc.data().location;
                var type = doc.data().type;
                var docID = doc.id;
                

                let newCard = cardTemplate.content.cloneNode(true);

                newCard.querySelector("#my-post-title").innerHTML = title;
                newCard.querySelector("#my-post-location").innerHTML = location;
                newCard.querySelector("#my-post-item").innerHTML = type;
                newCard.querySelector('#view-my-post-details').href = "mybinsinfo.html?docID="+docID;
                document.getElementById("my-post-container").append(newCard);

            })
        })
}

displayMyPosts("posts");



