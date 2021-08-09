const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote-dynamic-text");
const author = document.getElementById("author-name");
const newQuoteBtn = document.getElementById("quote-new");
const tweetQuoteBtn = document.getElementById("quote-twitter-btn");
const loader = document.getElementById("loader");
// to check if the internet connection is online | returns True or False
const connection = navigator.onLine;

// store the API url path
const api_url = "https://type.fit/api/quotes";
let data = [];

//Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.style.display = "none";
}
function complete() {
  loader.hidden = true;
  quoteContainer.style.display = "flex";
}

function showData() {
  loading();
  let index = Math.floor(Math.random() * data.length);
  quoteText.innerHTML = data[index].text;

  if (data[index].author == null) {
    author.innerHTML = "Unknown";
  } else {
    author.innerHTML = data[index].author;
  }
  complete();
}

//get data from the above API using async and await
async function getData(url) {
  //store response
  //reponse will be set only after it has received data from the fetch API
  //otherwise it will be undefined
  // after getting the rsponse data, convert it into json object for us to access it.
  loading();
  try {
    if (connection == true) {
      const response = await fetch(url);

      data = await response.json();
      showData();
      //   setInterval(showData, 5000);
    } else {
      loader.hidden = true;
      document.getElementById("errorMsg").style.display = "block";
    }
  } catch (error) {}
  //   } catch (error) {
  //     // alert("Error occured!!! \n Please try again");
  //   }
}

function tweet() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerHTML} - ${author.innerHTML}`;
  window.open(twitterUrl, "_blank");
}

//Event listeners
tweetQuoteBtn.addEventListener("click", tweet);
newQuoteBtn.addEventListener("click", showData);

//Calling the async function on load
getData(api_url);
