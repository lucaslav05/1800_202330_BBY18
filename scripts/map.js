async function showMap() {
    // Initializes basic mapbox data
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWRhbWNoZW4zIiwiYSI6ImNsMGZyNWRtZzB2angzanBjcHVkNTQ2YncifQ.fTdfEXaQ70WoIFLZ2QaRmQ';
    const map = new mapboxgl.Map({
        container: 'map', // Container ID
        style: 'mapbox://styles/mapbox/streets-v11', // Styling URL
        center: [-122.964274, 49.236082], // Starting position
        zoom: 8.8 // Starting zoom
    });

    // Add user controls to map (compass and zoom) to top left
    map.addControl(new mapboxgl.NavigationControl(), 'top-left');

    // Get user's location
    const userLocation = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            position => resolve([position.coords.longitude, position.coords.latitude]),
            error => reject(error)
        );
    });

    // Add a marker for the user's location
    const userLocationMarker = new mapboxgl.Marker()
        .setLngLat(userLocation)
        .addTo(map);

    // Center the map on the user's location
    map.flyTo({
        center: userLocation
    });

    // Fetch posts from Firestore
    const postsSnapshot = await db.collection("posts").get();

    // Loop through each post and add a marker to the map
    postsSnapshot.forEach(doc => {
        const post = doc.data();
        const postLocation = post.coordinates;

        // Add a marker to the map at the post location
        new mapboxgl.Marker({ color: 'red' })
            .setLngLat([postLocation.longitude, postLocation.latitude])
            .addTo(map);
    });
}

showMap();








