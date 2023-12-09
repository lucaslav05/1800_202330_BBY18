//function for setting up mapbox
async function showMap() {

    // Initializes basic mapbox data
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbWNoZW4zIiwiYSI6ImNsMGZyNWRtZzB2angzanBjcHVkNTQ2YncifQ.fTdfEXaQ70WoIFLZ2QaRmQ';
    const map = new mapboxgl.Map({
        container: 'map', // Container ID
        style: 'mapbox://styles/mapbox/streets-v11', // Styling URL
        center: [-122.964274, 49.236082], // Starting position
        zoom: 8.8 // Starting zoom
    });

    //adds nav controls
    map.addControl(new mapboxgl.NavigationControl(), 'top-left');

    // Get user's location
    const userLocation = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => resolve([position.coords.longitude, position.coords.latitude]),
            error => reject(error)
        );
    });


    map.on('load', () => {
        // Add a marker for the user's location
        const userLocationMarker = new mapboxgl.Marker()
            .setLngLat(userLocation)
            .addTo(map);

        // Center the map on the user's location
        map.flyTo({
            center: userLocation
        });

        addHikePin(map);

    });

}

showMap();

//function to add bins marker to the map
function addHikePin(map) {
    var ID = localStorage.getItem("id");
    console.log(ID);

    //checks if id is taken from local storage
    if (!ID) {
        console.error("No Post found in local storage.");
        return;
    }

    // READING information from "posts" collection in Firestore for the stored post ID
    db.collection('posts').doc(ID).get().then(doc => {
        if (doc.exists) {
            // Extract coordinates of the place
            const coordinates = doc.data().coordinates;
            console.log(coordinates);

            // Create a feature for the specified post
            const feature = {
                'type': 'Feature',
                'geometry': {
                    'type': 'Point',
                    'coordinates': [coordinates.longitude, coordinates.latitude] // Updated line
                }
            };

            // Adds the feature (in our case, pin) to the map
            map.addSource('place', {
                'type': 'geojson',
                'data': {
                    'type': 'FeatureCollection',
                    'features': [feature]
                }
            });

            // Creates a layer above the map displaying the pin
            // Add a layer showing the place.
            map.addLayer({
                'id': 'place',
                'type': 'circle', // what the pin looks like
                'source': 'place',
                'paint': {   // customize colour and size
                    'circle-color': '#4264fb',
                    'circle-radius': 6,
                    'circle-stroke-width': 2,
                    'circle-stroke-color': '#ffffff'
                }
            });

        } else {
            console.log("No such document!");
        }
    }).catch(error => {
        console.log("Error getting document:", error);
    });
}










