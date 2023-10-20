const hashParams = {};
const hash = window.location.hash.substring(1);
const params = hash.split('&');

params.forEach((param) => {
    const parts = param.split('=');
    hashParams[parts[0]] = decodeURIComponent(parts[1]);
});

console.log(hashParams.access_token);
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
                selectedGenres.push(genreText.innerText); // Use the text inside the button as the genre
            } else {
                img.src = imgSrc1;
                genreText.style.color = ""; // Revert to the original text color

                // Remove the unselected genre from the array
                const index = selectedGenres.indexOf(genreText.innerText);
                if (index !== -1) {
                    selectedGenres.splice(index, 1);
                }
            }
        });
    });

    document.getElementById("generate-btn").addEventListener("click", generatePlaylist);
    
    function generatePlaylist() {
        if (selectedGenres.length === 0) {
            alert("Please select at least one genre.");
        } else {
            createPlaylist(selectedGenres);
        }
    }
    
    function createPlaylist(selectedGenres) {
        const playlistName = "My liam Playlist"; // You can change the playlist name
        const accessToken = hashParams.access_token; // Use the access token from hashParams
    
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };
    
        // Create a new playlist
        fetch('https://api.spotify.com/v1/me/playlists', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ name: playlistName })
        })
        .then(response => response.json())
        .then(playlist => {
            const playlistId = playlist.id;
    
            selectedGenres.forEach(genre => {
                // Retrieve track recommendations based on the genre
                fetch(`https://api.spotify.com/v1/recommendations?limit=12&market=US&seed_genres=${genre}`, {
                    method: 'GET',
                    headers: headers
                })
                .then(response => response.json())
                .then(data => {
                    const trackUris = data.tracks.map(track => track.uri);
    
                    // Add the recommended tracks to the playlist
                    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                        method: 'POST',
                        headers: headers,
                        body: JSON.stringify({ uris: trackUris })
                    })
                    .then(response => response.json())
                    .then(result => {
                        console.log(`Added tracks to the playlist: ${result.snapshot_id}`);
    
                        // Display the created playlist details (name and link) to the user
                        displayCreatedPlaylist(playlist);
                    })
                    .catch(error => console.error(`Error adding tracks to the playlist: ${error}`));
                })
                .catch(error => console.error(`Error fetching track recommendations: ${error}`));
            });
        })
        .catch(error => console.error(`Error creating the playlist: ${error}`));
    }
    
    function displayCreatedPlaylist(playlist) {
        // Get the playlist name and external URL
        const playlistName = playlist.name;
        const playlistUrl = playlist.external_urls.spotify;
    
        // Display the playlist information to the user
        const playlistInfo = document.getElementById("playlist-info");
        playlistInfo.innerHTML = `
            <p>Playlist Name: <a href="${playlistUrl}" target="_blank">${playlistName}</a></p>
        `;
    }
});
