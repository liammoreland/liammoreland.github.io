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
    // Construct a recommendation URL based on selected genres
    const recommendationURL = `https://api.spotify.com/v1/recommendations?seed_genres=${selectedGenres.join(",")}&limit=50`;

    fetch(recommendationURL, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            const trackURIs = data.tracks.map((track) => track.uri);
            // Add the recommended tracks to the playlist using the Spotify API
        })
        .catch((error) => console.error("Error adding tracks to playlist:", error));
}


document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".genre-button");
  
    const selectedGenres = []; // Store the selected genres
  
    buttons.forEach(function (button) {
      let toggle = false;
      const img = button.querySelector(".genre-img img");
      const imgSrc1 = button.getAttribute("data-image1");
      const imgSrc2 = button.getAttribute("data-image2");
      const genreText = button.querySelector(".genre-text p");
  
      button.addEventListener("click", function () {
        toggle = !toggle;
        if (toggle) {
          img.src = imgSrc2;
          genreText.style.color = "#EC4343"; // Change text color
  
          // Add the selected genre to the array
          selectedGenres.push(button.getAttribute("data-genre"));
        } else {
          img.src = imgSrc1;
          genreText.style.color = ""; // Revert to original text color
  
          // Remove the unselected genre from the array
          const index = selectedGenres.indexOf(button.getAttribute("data-genre"));
          if (index !== -1) {
            selectedGenres.splice(index, 1);
          }
        }
      });
    });
  
    // When the user clicks the "Continue" button for Spotify, call the createPlaylist function
    const finishButton = document.getElementById("finish");
    finishButton.addEventListener("click", function () {
      // Pass the selectedGenres array to createPlaylist
      createPlaylist(selectedGenres);
    });
  });
  

