const spotifyLoginButton = document.getElementById("auth");
spotifyLoginButton.addEventListener("click", () => {
    const clientId = "dd2bb48637cd48c08c830b0b05bd5d8a";
    const redirectUri = "https://liammoreland.github.io/callback";
    const scope = "user-library-read playlist-modify-public";

    const authorizeUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token&show_dialog=true`;

    window.location.href = authorizeUrl;
});

