function scrollToBottom() {
    document.documentElement.scrollTop = document.documentElement.scrollHeight;
    document.body.scrollTop = document.body.scrollHeight;
}



//progress bar - variables//
const progressBar = document.getElementById("progress-bar");
const tripDetailsButton = document.getElementById("trip-details-button");
const linkSpotifyButton = document.getElementById("link-spotify-button");
const topGenresButton = document.getElementById("top-genres-button");
const tripDetailsContent = document.getElementById("trip-details-content");
const linkSpotifyContent = document.getElementById("link-spotify-content");
const topGenreContent = document.getElementById("top-genre-content");
const loadingPageContent = document.getElementById("loading-page-content");


//continue button - variables//
const continueSpotify = document.getElementById("continue-spotify");
const continueGenre = document.getElementById("continue-genre");
const backTripDetails = document.getElementById("back-trip-details");
// const createPlaylist = document.getElementById("create-playlist");
const backSpotify = document.getElementById("back-spotify");

// dropdown - variables //
const startingLocationDropdown = document.getElementById("startingLocation");
const endingLocationDropdown = document.getElementById("endingLocation");
const distanceDisplay = document.getElementById("distance-display");

//dropdown - E.V.//
endingLocationDropdown.addEventListener("change", calculateDistance);


let distance;

function calculateDistance() {
    const startingLocation = startingLocationDropdown.value;
    const endingLocation = endingLocationDropdown.value;

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

    distance = locationDistances[startingLocation][endingLocation];

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
    loadingPageContent.classList.add("d-none");
});

linkSpotifyButton.addEventListener("click", function () {
    tripDetailsContent.classList.add("d-none");
    topGenreContent.classList.remove("d-none");
    linkSpotifyContent.classList.add("d-none");
    loadingPageContent.classList.add("d-none");
});

topGenresButton.addEventListener("click", function () {
    tripDetailsContent.classList.add("d-none");
    linkSpotifyContent.classList.add("d-none");
    topGenreContent.classList.add("d-none");
    loadingPageContent.classList.remove("d-none");
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
    loadingPageContent.classList.add("d-none");
    tripDetailsContent.classList.add("d-none");
    linkSpotifyContent.classList.remove("d-none");
    topGenreContent.classList.add("d-none");
    updateProgress(100);
    updateSpotifyButtonStyles("transparent", "#EC4343");
    updateGenresButtonStyles("transparent", "#EC4343");
});

backTripDetails.addEventListener("click", function () {
    loadingPageContent.classList.add("d-none");
    tripDetailsContent.classList.add("d-none");
    linkSpotifyContent.classList.add("d-none");
    topGenreContent.classList.remove("d-none");
    updateProgress(50);
    updateSpotifyButtonStyles("transparent", "#EC4343");
    updateGenresButtonStyles("transparent", "#313131");
    scrollToBottom();
});

continueGenre.addEventListener("click", function () {
    loadingPageContent.classList.add("d-none");
    tripDetailsContent.classList.add("d-none");
    linkSpotifyContent.classList.add("d-none");
    topGenreContent.classList.remove("d-none");
    updateProgress(50);
    updateSpotifyButtonStyles("transparent", "#EC4343");
    updateGenresButtonStyles("transparent", "#313131");
    scrollToBottom();
});

backSpotify.addEventListener("click", function () {
    tripDetailsContent.classList.remove("d-none");
    linkSpotifyContent.classList.add("d-none");
    topGenreContent.classList.add("d-none");
    updateProgress(33.33);
    updateSpotifyButtonStyles("transparent", "#313131");
    updateGenresButtonStyles("transparent", "#313131");
});


const selectedGenres = [];

document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            const genreIcon = this.closest(".genre-button").querySelector(".genre-img img");
            if (this.checked) {
                genreIcon.src = this.closest(".genre-button").getAttribute("data-image2");
            } else {
                genreIcon.src = this.closest(".genre-button").getAttribute("data-image1");
            }
        });
    });

    document.getElementById("continue-spotify").addEventListener("click", generatePlaylist);

    function generatePlaylist() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                selectedGenres.push(checkbox.value);
            }
        });

        if (selectedGenres.length === 0) {
            alert("Please select at least one genre.");
            return;
        }

        if (distance === undefined) {
            alert("Please choose your locations");
            tripDetailsContent.classList.remove("d-none");
            linkSpotifyContent.classList.add("d-none");
            topGenreContent.classList.add("d-none");
            updateProgress(33.33);
            updateSpotifyButtonStyles("transparent", "#313131");
            updateGenresButtonStyles("transparent", "#313131");
            return;
        }

        const limit = distance;
        createPlaylist(selectedGenres);
    }

    function createPlaylist(selectedGenres) {
        const playlistName = "Transport Canberra radio"; 
        const accessToken = hashParams.access_token;

        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };

       // REATING A NEW PLAYLIST//
        fetch('https://api.spotify.com/v1/me/playlists', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({ name: playlistName })
        })
            .then(response => response.json())
            .then(playlist => {
                const playlistId = playlist.id;

                selectedGenres.forEach(genre => {
                    fetch(`https://api.spotify.com/v1/recommendations?limit=${distance}&market=US&seed_genres=${genre}`, {
                        method: 'GET',
                        headers: headers
                    })
                        .then(response => response.json())
                        .then(data => {
                            const trackUris = data.tracks.map(track => track.uri);

                            fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                                method: 'POST',
                                headers: headers,
                                body: JSON.stringify({ uris: trackUris })
                            })
                                .then(response => response.json())
                                .then(result => {
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
        const playlistName = playlist.name;
        const playlistUrl = playlist.external_urls.spotify;

        const distanceOutput = document.getElementById("distance-output-text");
        const genreOutput = document.getElementById("genre-output-text");
        const playlistInfo = document.getElementById("playlist-info");

        distanceOutput.textContent = distance;
        genreOutput.textContent = selectedGenres;

        playlistInfo.innerHTML = `
            <p>Check it out <a 
            style="font-family: Inter;
            font-size: 1rem;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            text-decoration: none;
            color: #EC4343;
            cursor: pointer;"
            href="${playlistUrl}" target="_blank">${playlistName}</a></p>
        `;
        loadingPageContent.classList.add("d-none");
        linkSpotifyContent.classList.remove("d-none");
    }


    
});