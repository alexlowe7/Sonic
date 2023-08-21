# Sonic
<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!-- PROJECT LOGO -->
<br />
<div align="center">

<h3 align="center">Sonic Ear Training App</h3>

  <p align="center">
    Sonic Ear Training App is a web app created to help musicians improve their ability to learn songs by ear.
    <br />
    <a href="https://github.com/alexlowe7/Sonic.git"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/alexlowe7/Sonic.git">View Demo</a>
    ·
    <a href="https://github.com/alexlowe7/Sonic.git/issues">Report Bug</a>
    ·
    <a href="https://github.com/alexlowe7/Sonic.git/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

This app contains two games to improve user's ability to learn songs by ear. The games are called Chords and Intervals. 
"Chords" tests the user's ability of identifying chord types by playing random chords given the User's preferences (example: Major, Minor).
"Intervals" tests the user's ability of identifying how far away two random notes are from each other (example: A and B are two notes away, so the interval is "major 2nd").
Users can select the chords/interval types they want to play with by clicking settings within each game.
Each game tracks the user's stats and breaks them down by chord/interval type. 
"Intervals" mode also tracks the user's listening type, which is a feature that allows users to listen to the intervals in ascending order, descending order, or harmonic mode, which plays both notes at the same time.
Listening mode stats are tracked so users can see which listening modes they need to practice.
The app has user authentication and a stats dashboard, where the user can see their stats for each game mode.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

* React.js
* Django
* Django REST Framework

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* npm
* Python

### Installation

1. Clone the Front-end repo
   ```sh
   git clone https://github.com/alexlowe7/Sonic.git
   ```
2. From the project directory, navigate to the frontend directory and start the frontend app:
   ```sh
   cd sonic_frontend
   npm start
   ```
3. In a new terminal, navigate to the backend directory
   ```sh
   cd sonic_backend
   ```
4. Install dependencies:
   ```sh
   pipenv install
   ```
5. Activate virtual environment:
   ```sh
   pipenv shell
   ```
7. Run the backend server
   ```sh
   python manage.py runserver
   ```
8. Start practicing! http://localhost:3000/


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

1. Click 'register' in the navigation bar
2. Signup
3. Select a game (chords, or intervals)
4. Start practicing, and go to dashboard to view your stats

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Alex Lowe - alexander.h.lowe22@gmail.com

Project Link: [https://github.com/alexlowe7/Sonic.git](https://github.com/alexlowe7/Sonic.git)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

* [https://github.com/othneildrew/Best-README-Template](https://github.com/othneildrew/Best-README-Template)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo_name.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo_name/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo_name.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo_name/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo_name.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo_name/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo_name.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo_name/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo_name.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo_name/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
