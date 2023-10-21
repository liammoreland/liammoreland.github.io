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


function createPlaylist() {
    const playlistName = "TC Radio"; // Replace with the desired playlist name

    const createPlaylistURL = `https://api.spotify.com/v1/me/playlists`;

    fetch(createPlaylistURL, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${hashParams.access_token}`, // Use the user's access token
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: playlistName,
            public: true, // Make the playlist public or private as needed
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            const playlistId = data.id;
            // Call a function to add tracks to the playlist here
        })
        .catch((error) => console.error("Error creating playlist:", error));
}
  

function addTracksToPlaylist(playlistId, selectedGenres) {
    const recommendationURL = `https://api.spotify.com/v1/recommendations?seed_genres=${selectedGenres.join(",")}&limit=50`;
  
    fetch(recommendationURL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${hashParams.access_token}`, // Use the user's access token
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const trackURIs = data.tracks.map((track) => track.uri);
  
        // Once you have the recommended track URIs, add them to the playlist
        addTracksToPlaylistByURI(playlistId, trackURIs);
      })
      .catch((error) => console.error("Error adding tracks to playlist:", error));
  }
  
  function addTracksToPlaylistByURI(playlistId, trackURIs) {
    const addTracksURL = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
  
    fetch(addTracksURL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${hashParams.access_token}`, // Use the user's access token
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uris: trackURIs,
      }),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Tracks added to the playlist successfully!");
        } else {
          console.error("Error adding tracks to playlist:", response.statusText);
        }
      })
      .catch((error) => console.error("Error adding tracks to playlist:", error));
  }
  

  function displayPlaylist(playlistId) {
    const playlistInfoContainer = document.getElementById("playlist-info");
  
    const getPlaylistURL = `https://api.spotify.com/v1/playlists/${playlistId}`;
  
    fetch(getPlaylistURL, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${hashParams.access_token}`, // Use the user's access token
      },
    })
      .then((response) => response.json())
      .then((playlistData) => {
        // Get playlist details (name, description, etc.)
        const playlistName = playlistData.name;
        const playlistDescription = playlistData.description;
        const playlistOwner = playlistData.owner.display_name;
  
        // Create HTML to display playlist details
        const playlistInfoHTML = `
          <h2>${playlistName}</h2>
          <p>${playlistDescription}</p>
          <p>Created by: ${playlistOwner}</p>
          <a href="${playlistData.external_urls.spotify}" target="_blank">Open Playlist on Spotify</a>
        `;
  
        // Update the playlist-info container with the HTML
        playlistInfoContainer.innerHTML = playlistInfoHTML;
      })
      .catch((error) => console.error("Error getting playlist details:", error));
  }
  
  function createPlaylist(selectedGenres) {
    // ... (your existing code to create the playlist)
    // Once the playlist is created, get its ID and then display it
    displayPlaylist(playlistId);
  }