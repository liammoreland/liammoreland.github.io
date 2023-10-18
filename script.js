//progress bar - variables//
const progressBar = document.getElementById("progress-bar");
const tripDetailsButton = document.getElementById("trip-details-button");
const linkSpotifyButton = document.getElementById("link-spotify-button");
const topGenresButton = document.getElementById("top-genres-button");
const tripDetailsContent = document.getElementById("trip-details-content");
const linkSpotifyContent = document.getElementById("link-spotify-content");
const topGenreContent = document.getElementById("top-genre-content");


//continue button - variables//
const continueSpotify = document.getElementById("continue-spotify");
const continueGenre = document.getElementById("continue-genre");
const backTripDetails = document.getElementById("back-trip-details");
const createPlaylist = document.getElementById("create-playlist");
const backSpotify = document.getElementById("back-spotify");



// dropdown - variables //
const startingLocationDropdown = document.getElementById("startingLocation");
const endingLocationDropdown = document.getElementById("endingLocation");
const distanceDisplay = document.getElementById("distance-display");

//dropdown - E.V.//
endingLocationDropdown.addEventListener("change", calculateDistance);

//dropdown - functions//
function calculateDistance() {
    const startingLocation = startingLocationDropdown.value;
    const endingLocation = endingLocationDropdown.value;

//object to store the distances//
    const locationDistances = {
        "location2": {
            "locationC": 3,
            "locationD": 5,
            "locationE": 6,
            "locationF": 8,
        },
        "location3": {
            "locationB": 4,
            "locationD": 1,
            "locationE": 2,
            "locationF": 7,
        },

        "location4": {
            "locationB": 4,
            "locationC": 1,
            "locationE": 1,
            "locationF": 5,
        },

        "location5": {
            "locationB": 7,
            "locationC": 5,
            "locationD": 3,
            "locationF": 5,
        },

        "location6": {
            "locationB": 9,
            "locationC": 7,
            "locationD": 6,
            "locationE": 5,
        },
    };

    const distance = locationDistances[startingLocation][endingLocation];

    distanceDisplay.textContent = `Your travel time is: ${distance} minutes`;
}


//set the page //
updateProgress(33.33);
updateTripButtonStyles("transparent", "#EC4343");
tripDetailsContent.classList.remove("d-none");

// progress bar - ev //
tripDetailsButton.addEventListener("click", function () {
    tripDetailsContent.classList.remove("d-none");
    linkSpotifyContent.classList.add("d-none");
    topGenreContent.classList.add("d-none");
});

linkSpotifyButton.addEventListener("click", function () {
    tripDetailsContent.classList.add("d-none");
    linkSpotifyContent.classList.remove("d-none");
    topGenreContent.classList.add("d-none");
});

topGenresButton.addEventListener("click", function () {
    tripDetailsContent.classList.add("d-none");
    linkSpotifyContent.classList.add("d-none");
    topGenreContent.classList.remove("d-none");
});

tripDetailsButton.addEventListener("click", function () {
    updateProgress(33.33);
    updateSpotifyButtonStyles("transparent", "#313131");
    updateGenresButtonStyles("transparent", "#313131");
});

linkSpotifyButton.addEventListener("click", function () {
    updateProgress(50);
    updateSpotifyButtonStyles("transparent", "#EC4343");
    updateGenresButtonStyles("transparent", "#313131");
});

topGenresButton.addEventListener("click", function () {
    updateProgress(100);
    updateSpotifyButtonStyles("transparent", "#EC4343");
    updateGenresButtonStyles("transparent", "#EC4343");
});


// if user navigates via progress bar - functions // 
function updateProgress(value) {
    progressBar.style.width = value + "%";
    progressBar.setAttribute("aria-valuenow", value);
}

function updateTripButtonStyles(backgroundColor, textColor) {
    tripDetailsButton.style.backgroundColor = backgroundColor;
    tripDetailsButton.style.color = textColor;
}

function updateSpotifyButtonStyles(backgroundColor, textColor) {
    linkSpotifyButton.style.backgroundColor = backgroundColor;
    linkSpotifyButton.style.color = textColor;
}

function updateGenresButtonStyles(backgroundColor, textColor) {
    topGenresButton.style.backgroundColor = backgroundColor;
    topGenresButton.style.color = textColor;
}

continueSpotify.addEventListener("click", function () {
    tripDetailsContent.classList.add("d-none");
    linkSpotifyContent.classList.remove("d-none");
    topGenreContent.classList.add("d-none");
    updateProgress(50);
    updateSpotifyButtonStyles("transparent", "#EC4343");
    updateGenresButtonStyles("transparent", "#313131");
});

backTripDetails.addEventListener("click", function () {
    tripDetailsContent.classList.remove("d-none");
    linkSpotifyContent.classList.add("d-none");
    topGenreContent.classList.add("d-none");
    updateProgress(33.33);
    updateSpotifyButtonStyles("transparent", "#313131");
    updateGenresButtonStyles("transparent", "#313131");
});

continueGenre.addEventListener("click", function () {
    tripDetailsContent.classList.add("d-none");
    linkSpotifyContent.classList.add("d-none");
    topGenreContent.classList.remove("d-none");
    updateProgress(100);
    updateSpotifyButtonStyles("transparent", "#EC4343");
    updateGenresButtonStyles("transparent", "#EC4343");
});

backSpotify.addEventListener("click", function () {
    tripDetailsContent.classList.add("d-none");
    linkSpotifyContent.classList.remove("d-none");
    topGenreContent.classList.add("d-none");
    updateProgress(50);
    updateSpotifyButtonStyles("transparent", "#EC4343");
    updateGenresButtonStyles("transparent", "#313131");
});

document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".genre-button");

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
            } else {
                img.src = imgSrc1;
                genreText.style.color = ""; // Revert to original text color
            }
        });
    });
});



// // creating the playlist //
// async function createPlaylist(accessToken, userId, playlistName) {
//     try {
//         const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({
//                 name: playlistName,
//             }),
//         });

//         if (response.status === 201) {
//             const data = await response.json();
//             return data.id; // Return the ID of the created playlist.
//         } else {
//             console.error('Failed to create a playlist:', response.statusText);
//             return null;
//         }
//     } catch (error) {
//         console.error('Error creating playlist:', error);
//         return null;
//     }
// }


// function filterTracksByGenre(tracks, selectedGenres) {
//     return tracks.filter(track => selectedGenres.includes(track.genre));
// }


// async function addTracksToPlaylist(accessToken, playlistId, trackUris) {
//     try {
//         const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ uris: trackUris }),
//         });

//         if (response.status === 201) {
//             return true; // Tracks added successfully.
//         } else {
//             console.error('Failed to add tracks to the playlist:', response.statusText);
//             return false;
//         }
//     } catch (error) {
//         console.error('Error adding tracks to the playlist:', error);
//         return false;
//     }
// }

// // Step 6: Set Playlist Details
// async function setPlaylistDetails(accessToken, playlistId, playlistDetails) {
//     try {
//         const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
//             method: 'PUT',
//             headers: {
//                 'Authorization': `Bearer ${accessToken}`,
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(playlistDetails),
//         });

//         if (response.status === 200) {
//             return true; // Playlist details updated successfully.
//         } else {
//             console.error('Failed to set playlist details:', response.statusText);
//             return false;
//         }
//     } catch (error) {
//         console.error('Error setting playlist details:', error);
//         return false;
//     }
// }

// // Step 7: Display the Playlist to the User (Assuming you have an HTML element to display the playlist)
// function displayPlaylist(playlistUrl) {
//     const playlistContainer = document.getElementById('playlist-container');
//     playlistContainer.innerHTML = `<iframe src="${playlistUrl}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
// }

// // Step 8: Handle Errors
// function handleError(message) {
//     console.error(message);
//     // You can display an error message to the user or handle it in your application as needed.
// }

