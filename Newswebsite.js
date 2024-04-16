const API_KEY = "ef972909394a4ace8ea902b911ca1edc";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("business"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&pageSize=24&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";
    
    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    console.log(article.url)
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");
    const newsUrl = cardClone.querySelector("#news-url"); 

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;


    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});




const API_KEY2 = `07d233a932ac4a61a3945853240704`
const form = document.querySelector("form")
const search = document.querySelector("#search")
const weather = document.querySelector("#weather")
const getWeather = async(city) => {
    weather.innerHTML = `<h2> Loading... <h2>`
    const url = `http://api.weatherapi.com/v1/current.json?key=${API_KEY2}&q=${city}`
    const response = await fetch(url);
    const data = await response.json()
    console.log(data);
    return showWeather(data)
}

const showWeather = (data) => {
    if (!data.weather || data.weather.length === 0) {
        weather.innerHTML = `
        
        <h6>Temp:${data.current.temp_c
        } ℃</h6>   
        <img src="https:${data.current.condition.icon}" />
       
        `;
        
        return;
    }

    const weatherData = data.weather[0]; 
    weather.innerHTML = `
        <div>
        <img src="https:${data.current.condition.icon}" height="2px" styles={} >
        </div>
        <div>
            <h6>${data.current.temp_c
            } ℃</h6>
            <h4> ${data.weather[0].main} </h4>
        </div>
    `;
    console.log(data.current.condition);
}


form.addEventListener(
    "submit",
    function(event) {
        console.log(search.value)
        getWeather(search.value)
        event.preventDefault();
    }
)

const apiKey = 'ef972909394a4ace8ea902b911ca1edc';

// Fetch breaking news from NewsAPI
async function fetchBreakingNews() {
  const response = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`);
  const data = await response.json();
  const cnt = data.articles.length;
  let articles = '`<p class="mt">  ';
  for(let i = 0; i < Math.min(cnt, 10); i++){
    articles += `${data.articles[i].title}+                                                                        `;
  } 
  articles += '</p>';
  const headlinesEl = document.querySelector('.headlines');
  if (headlinesEl) {    
    headlinesEl.innerHTML = articles ;
  }
  console.log(headlinesEl);
}
fetchBreakingNews();
