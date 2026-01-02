const API_KEY = "9c36486e504a4ef0a543202ad7d2c6e1";

const searchInput = document.getElementById("search_input");
const searchButton = document.getElementById("Search_button");
const gameContainer = document.getElementById("game_container");

const BASE_URL =`https://api.rawg.io/api/`;
const GAME_LIST_URL =`games?key=${API_KEY}`;

/*-----Event listiners-----*/
/*------------------------*/
searchButton.addEventListener("click", gameSearch);

searchInput.addEventListener("keypress", (e)=>{
    if(e.key ==="Enter")
    {
        gameSearch();
    }
});

gameContainer.addEventListener("click", gameDetails);


Menudisplay();



/*--------Function--------*/
/*------------------------*/
async function Menudisplay() {
    try {
        //api
        const response = await fetch(`${BASE_URL}${GAME_LIST_URL}`);
        const data = await response.json();
        console.log("data:", data.results)

        //game
        data.results.forEach((result) => {
            //game container{main container}//
            /////////////////////////////////
            const game = document.createElement("div");
            game.classList.add("game");
            game.dataset.gameDataID = result.id;


            const img = document.createElement("img");
            img.src = result.background_image;
            img.alt = result.name;

            //game info container//
            const gameInfo = document.createElement("div");
            gameInfo.classList.add("gameInfo");

            //game meta
            const gameMeta = document.createElement("div");
            gameMeta.classList.add("gameMeta")

            const icons = document.createElement("div");
            icons.classList.add("icons");

            if (result.platforms)
            {
                //store unique icon class[no duplicates]
                const addIconClass = new Set();
                result.platforms.forEach((item)=>{
                    const iconClass = getPlatformIcon(item.platform.id);

                    if(iconClass && !addIconClass.has(iconClass)){
                        const icon = document.createElement("i");
                        icon.className = iconClass;
                        icons.appendChild(icon);
                        addIconClass.add(iconClass);

                    } 
                });             
            }
            
            const mcRating = document.createElement("div");
            mcRating.classList.add("rating");

            if(result.metacritic !== null && result.metacritic !== undefined)
            {
                mcRating.textContent = result.metacritic;
            }
            else{
                mcRating.textContent = "N/A";

            }
            

            const title = document.createElement("h3");
            title.textContent = result.name;

            gameMeta.append(icons);
            gameMeta.appendChild(mcRating);
            
            gameInfo.appendChild(gameMeta);
            gameInfo.appendChild(title);
           
            //assements
            game.appendChild(img);
            game.appendChild(gameInfo);

            gameContainer.appendChild(game);
            
        });
               
    } catch (error) {
        
    }   
}


async function gameSearch() {

    const searchTerm = searchInput.value.trim();

    try {
        //api
        const response = await fetch(`${BASE_URL}${GAME_LIST_URL}&search=${searchTerm}`);
        const data = await response.json();
        console.log("data:", data.results)
        gameContainer.innerHTML="";

        //game
        data.results.forEach((result) => {
            //game container{main container}//
            /////////////////////////////////
            const game = document.createElement("div");
            game.classList.add("game");
            game.dataset.gameDataID = result.id

            const img = document.createElement("img");
            img.src = result.background_image;
            img.alt = result.name;

            //game info container//
            const gameInfo = document.createElement("div");
            gameInfo.classList.add("gameInfo");

            //game meta
            const gameMeta = document.createElement("div");
            gameMeta.classList.add("gameMeta")

            const icons = document.createElement("div");
            icons.classList.add("icons");

            if (result.platforms)
            {
                //store unique icon class[no duplicates]
                const addIconClass = new Set();
                result.platforms.forEach((item)=>{
                    const iconClass = getPlatformIcon(item.platform.id);

                    if(iconClass && !addIconClass.has(iconClass)){
                        const icon = document.createElement("i");
                        icon.className = iconClass;
                        icons.appendChild(icon);
                        addIconClass.add(iconClass);

                    } 
                });             
            }
            
            const mcRating = document.createElement("div");
            mcRating.classList.add("rating");
            
            if(result.metacritic !== null && result.metacritic !== undefined)
            {
                mcRating.textContent = result.metacritic;
            }
            else{
                mcRating.textContent = "N/A";

            }

            const title = document.createElement("h3");
            title.textContent = result.name;

            gameMeta.append(icons);
            gameMeta.appendChild(mcRating);
            
            gameInfo.appendChild(gameMeta);
            gameInfo.appendChild(title);
           
            //assements
            game.appendChild(img);
            game.appendChild(gameInfo);

            gameContainer.appendChild(game);

            searchInput.value ="";
            
        });
               
    } catch (error) {
        
    }   
    
}


function getPlatformIcon(platformId) {


    if (platformId === 187 || platformId === 18 || platformId === 16) {
        return "fa-brands fa-playstation";
    }
    if (platformId === 186 || platformId === 14 || platformId === 1) {
        return "fa-brands fa-xbox";

    }
    if (platformId === 4) {
        return "fa-brands fa-microsoft";  
    }
    if (platformId === 7) {
        return "fa-notdog fa-solid fa-n";  
    }
    if (platformId === 5) {
        return "fa-brands fa-apple";  
    }
    
}





async function gameDetails(e) {

    const gameEl = e.target.closest(".game");

    if (!gameEl) return;

    //get attribute
    const gameID = gameEl.dataset.gameDataID  ;
    console.log("game id:", gameID);

    const GAME_DETAIL_URL = `games/${gameID}?key=${API_KEY}`;

    //api
    const response = await fetch(`${BASE_URL}${GAME_DETAIL_URL}`);
    const data = await response.json();
    console.log("Game Details:", data);

    const gameDetailsContent = document.createElement("div");
    gameDetailsContent.classList.add("gameDetailsContent");

    const title = createElement("h1");
    title.textContent = data.name;

    im


    
}