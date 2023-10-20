const hashParams = {};
const hash = window.location.hash.substring(1);
const params = hash.split('&');

params.forEach((param) => {
    const parts = param.split('=');
    hashParams[parts[0]] = decodeURIComponent(parts[1]);
});

console.log(hashParams.access_token);
const finishButton = document.getElementById("finish");
finishButton.addEventListener("click", createPlaylist);


// function createPlaylist() {
//     const playlistName = "TC Radio"; // Replace with the desired playlist name

//     const createPlaylistURL = `https://api.spotify.com/v1/me/playlists`;

//     fetch(createPlaylistURL, {
//         method: "POST",
//         headers: {
//             Authorization: `Bearer ${hashParams.access_token}`, // Use the user's access token
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             name: playlistName,
//             public: true, // Make the playlist public or private as needed
//         }),
//     })
//         .then((response) => response.json())
//         .then((data) => {
//             const playlistId = data.id;
//             // Call a function to add tracks to the playlist here
//         })
//         .catch((error) => console.error("Error creating playlist:", error));
// }

// function addTracksToPlaylist(playlistId, selectedGenres) {
//     // Construct a recommendation URL based on selected genres
//     const recommendationURL = `https://api.spotify.com/v1/recommendations?seed_genres=${selectedGenres.join(",")}&limit=50`;

//     fetch(recommendationURL, {
//         method: "GET",
//         headers: {
//             Authorization: `Bearer ${accessToken}`,
//         },
//     })
//         .then((response) => response.json())
//         .then((data) => {
//             const trackURIs = data.tracks.map((track) => track.uri);
//             // Add the recommended tracks to the playlist using the Spotify API
//         })
//         .catch((error) => console.error("Error adding tracks to playlist:", error));
// }
