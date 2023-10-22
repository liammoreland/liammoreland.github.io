# Transport Canberra Radio

Transport Canberra Radio is a **mobile first** solution for Canberra's light rail travelers that delivers personalized playlists to match your travel and music preferences. It was designed using figma and official ACT government design guidelines.

You can find it hosted [here](https://liammoreland.github.io/) on Github.

### Personal and Professional Growth During The Project
The process of creating TC Radio as a real, functional web application has helped me a lot in my own personal and professional growth. As someone who has taken a semester off studying and has struggled with coding in the past, this project offered the perfect opportunity to refresh and add to my coding skills. 

Through this project, I not only regained confidence in my abilities but also gained a better understanding of the gap between design and development. This has enabled me to design more realistically and intentionally in the future, ensuring that my design ideas can be effectively translated to development.

### Challenges Faced
This assignment did not come without its challenges. From the start, I faced difficulties setting up the proper development environment on university computers, so I was unable to build with React as I intended. To address this, I shifted my approach and attempted to perform much of the dev on the server-side of the web app. I turned to Bootstrap framework and vanilla JavaScript for the front-end, finding Bootstrap easy to pick up, frequently referring to its [documentation](https://getbootstrap.com/docs/4.1/getting-started/introduction) for guidence.

Developing the static site was relatively straightforward, and I'm particularly proud of how closely it stayed true to the original design. However, incorporating JavaScript introduced more significant challenges. It has been almost a year since I last used JavaScript, and I have a lot of knowledge gaps. I leaned heavily on ChatGPT as a tool to guide me through complex functions, help debug JavaScript code, and fill these knowledge gaps. Some examples of my prompts included:

- *"Walk me through the steps required to create a dynamic progress bar?"*
- *"Can you debug this section of my code?"*
- *"Remind me how the sequence of JS code works?"*

Understanding the order of code execution was also a major concept that I overlooked, and much of my troubleshooting stemmed from here.

Another challenge was authenticating users without backend technology. Fortunately, Spotify makes this possible with the [OAuth implicit grant flow](https://developer.spotify.com/documentation/web-api/tutorials/implicit-flow), but executing it requires a lot of attention to detail. Stack Overflow became a valuable resource during this phase, particularly this [thread](https://stackoverflow.com/questions/50938844/spotify-authentication-failure-using-implicit-grant).

Finally, accessing the time between light rail stops from the Transport Canberra API was another obstacle faced. Instead, I created a small dataset in JavaScript using information from google maps, and limited the number of light rail stops to 5. Further research into the API documentation prior to choosing an app idea should've been done.

### Unexpected Insights and Outcomes

The previous challenge also highlighted an unexpected insight, that the time between light rail stops was often too short. For instance, a user traveling from Ipima to Eloura would have had a one minute long playlist. User testing during the early stages of development would have identified this issue, allowing me to make the right changes. Instead, I resorted to adding a song into the playlist for each minute of the commute to compensate.

### Potential Improvements

Reflecting back, there are many areas where improvements and different approaches could have been taken. But if I could start over, the most important thing I would do is conduct more research and design more iterations before delving into the development phase. Really understanding the API documentation as well. Many of the challenges faced during development could have been mitigated with a better understanding of how certain features would transition from design to development.

### Broader Themes and Issues

Despite the challenges and lessons learned, the goal of creating a playlist-generating app for light rail commuters was successfully achieved. The UI of TC Radio meets my original vision, and I'm looking forward to auditing the UX. Once that is completed, I will set out to try it in practice and see if it genuinely does improve the light-rail experience.

In the broader context, my final result highlights the importance of thorough research, a deep understanding of both design and development, and user testing in the development process. This experience has not only strengthened my technical abilities but also equipped me with a better approach to creating meaningful digital solutions.
