const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYmE4ODA0YjA4NjAxYjExOGExZjFhZjZhMzgzNGI3NCIsInN1YiI6IjY0OWVmZmM0YzlkYmY5MDEwN2UxZTU0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EV_B46kJXwRaqfcfXunUdvSCCDyyRzkS13QBLwEgXK4'
    }
  };
  
  fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', options)
  .then(response => response.json())
  .then(data => {
  const movielist=data.results;
  
  movielist.map((item)=>{
  const name=item.title;
  
  const poster_path=item.poster_path;
  const imageURL = `https://image.tmdb.org/t/p/w500${poster_path}`;
  //console.log(imageURL)
   const movies=`<li><img src="${imageURL}"> <h2>${name}</h2>
  </li>`;
  document.querySelector('.results').innerHTML += movies;
  });
  })
  .catch(err => console.error(err));
  
  
  
  function fetchMovie(){
    const searchinput = document.getElementById("searchInput").value;
    let results = document.querySelector('.results');
              results.innerHTML = "";
  //resultss.innerHTML = " ";
  if (!results) {
    results = document.createElement("div");
    results.setAttribute("id", "results");
    document.body.appendChild(results);
  }
    
  fetch("https://api.themoviedb.org/3/search/movie?query=" + searchinput + "&include_adult=false&language=en-US&page=1", options)
  
        .then((response) => response.json())
        .then((response) => {
          for (let i = 0; i < response.results.length; i++) {
           // console.log(response);
            let title = response.results[i].title;
            let release_date = response.results[i].release_date;
            let poster_pat = response.results[i].poster_path;
            let overvieww = response.results[i].overview;
            let card = document.createElement("div");
            card.style = 'style="width: 18rem';
            card.setAttribute("class", "col-lg-3");
    
            let img = document.createElement("img");
            img.classList.add("card-img-top");
           // const poster_path=item.poster_path;
  const imageURL = `https://image.tmdb.org/t/p/w500${poster_pat}`;
            img.src =imageURL;
    
            let ctitle = document.createElement("h5");
            ctitle.setAttribute("class", "card-title");
            ctitle.textContent = title;
    
            let crd = document.createElement("h7");
            crd.setAttribute("class", "card-title");
            crd.textContent = "Date of Release: " + release_date;
    
            let overveiw = document.createElement("h7");
            overveiw.setAttribute("class", "card-title");
            overveiw.textContent = overvieww;
    
            card.append(img);
            card.append(ctitle);
            card.append(crd);
            card.append(overveiw);
            results.prepend(card);
          }
        })
        .catch((err) => console.error(err));
  }
  document.getElementById("searchButton").addEventListener("click", fetchMovie);
  
  
  // Event listener for the "Now Playing" button
  document.getElementById("nowPlayingButton").addEventListener("click", function() {
      fetchNowPlaying();
  });

  // Event listener for the "Top Rated" button
  document.getElementById("topRatedButton").addEventListener("click", function() {
      fetchTopRated();
  });

  // Function to fetch data from the "Now Playing" endpoint and display in results div
  function fetchNowPlaying() {
    let resultsDiv = document.querySelector('.results');
    resultsDiv.innerHTML = "";

    fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", options)
        .then((response) => response.json())
        .then((response) => {
            response.results.forEach((movie) => {
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('movie');

                const title = document.createElement('h2');
                title.textContent = movie.title;

                // Create an image element for the poster
                const posterImage = document.createElement('img');
                posterImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
                posterImage.alt = movie.title; // Use the movie title as alt text for accessibility

                const releaseDate = document.createElement('p');
                releaseDate.textContent = "Date of Release: " + movie.release_date;

                const overview = document.createElement('p');
                overview.textContent = movie.overview;

                movieDiv.appendChild(posterImage);
                movieDiv.appendChild(title);
                movieDiv.appendChild(releaseDate);
                movieDiv.appendChild(overview);

                resultsDiv.prepend(movieDiv);
            });
        })
        .catch((err) => console.error(err));
}

// Function to fetch data from the "Top Rated" endpoint and display in results div
function fetchTopRated() {
    let resultsDiv = document.querySelector('.results');
    resultsDiv.innerHTML = "";

    fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", options)
        .then((response) => response.json())
        .then((response) => {
            response.results.forEach((movie) => {
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('movie');

                const title = document.createElement('h2');
                title.textContent = movie.title;

                // Create an image element for the poster
                const posterImage = document.createElement('img');
              if (movie.poster_path) {
                  posterImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
              } else {
                  posterImage.src = 'placeholder_image_url.jpg'; // You can use a placeholder image URL if the movie doesn't have a poster
              }
              posterImage.alt = movie.title; // Use the movie title as alt text for accessibility

                const releaseDate = document.createElement('p');
                releaseDate.textContent = "Date of Release: " + movie.release_date;

                const overview = document.createElement('p');
                overview.textContent = movie.overview;

                movieDiv.appendChild(posterImage);
                movieDiv.appendChild(title);
                movieDiv.appendChild(releaseDate);
                movieDiv.appendChild(overview);

                resultsDiv.prepend(movieDiv);
            });
        })
        .catch((err) => console.error(err));
}

document.addEventListener('DOMContentLoaded', function() {
  const results = document.querySelector('.results');
  results.addEventListener('click', function(event) {
      let target = event.target;
      while (target != results) {
          if (target.tagName === 'LI') {
              const movieTitle = target.querySelector('h2').textContent;
              document.getElementById('movieTitle').textContent = movieTitle;
              document.getElementById('reviewModal').style.display = 'block';
              return;
          }
          target = target.parentNode;
      }
  });

  

  // Close the modal if needed
  window.onclick = function(event) {
      const modal = document.getElementById('reviewModal');
      if (event.target === modal) {
          modal.style.display = "none";
      }
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const textarea = document.querySelector('textarea');
  const errorMessage = document.getElementById('error-message');

  form.addEventListener('submit', function(event) {
      if (textarea.value.trim() === '') { // Check if the textarea is empty (ignoring white space)
          event.preventDefault(); // Prevent the form from being submitted
          errorMessage.textContent = 'Please enter a review.'; // Display error message
          errorMessage.style.display = 'block'; // Make sure error message is visible
      } else {
          errorMessage.style.display = 'none'; // Hide error message if text is entered
      }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const reviewModal = document.getElementById('reviewModal');
  const closeModal = document.getElementById('closeModal');

  // Close modal on button click
  closeModal.addEventListener('click', function() {
      reviewModal.style.display = 'none';
  });

  // Optional: Close the modal by clicking outside of it
  window.onclick = function(event) {
      if (event.target == reviewModal) {
          reviewModal.style.display = "none";
      }
  }
});




