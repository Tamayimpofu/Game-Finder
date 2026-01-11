const API_KEY = "9c36486e504a4ef0a543202ad7d2c6e1";

const searchInput = document.getElementById("search_input");
const searchButton = document.getElementById("Search_button");
const gameContainer = document.getElementById("game_container");
const gameDetailsContainer = document.getElementById("game_details_container");
const gameStoreContent = document.getElementById("game_store_content");

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



Menudisplay();

gameContainer.addEventListener("click", gameDetails);


/*--------Async Function--------*/
/*-----------------------------*/
async function Menudisplay() {
    try {
        //api
        const response = await fetch(`${BASE_URL}${GAME_LIST_URL}`);
        const data = await response.json();
        console.log("data:", data.results);
        renderGames(data.results);
               
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
        gameContainer.innerHTML = "";
        renderGames(data.results);
        searchInput.value = "";
               
    } catch (error) {
        
    }   
  
}



async function gameDetails(e) {

    const gameEl = e.target.closest(".game");

    if (!gameEl) return;

    try {
        
        //get attribute
        const gameID = gameEl.dataset.gameDataID  ;
        console.log("game id:", gameID);

        const GAME_DETAIL_URL = `games/${gameID}?key=${API_KEY}`;
        const SCREENSHOTS = `games/${gameID}/screenshots?key=${API_KEY}`;
        const GAMESTORES = `games/${gameID}/stores?key=${API_KEY}`

        //api game details
        const gameDetailsResponse = await fetch(`${BASE_URL}${GAME_DETAIL_URL}`);
        const gameDetailsData = await gameDetailsResponse.json();
        console.log("Game Details:", gameDetailsData);

        //api  screenshots
        const screenshotResponse = await fetch(`${BASE_URL}${SCREENSHOTS}`);
        const screenshotData = await screenshotResponse.json();
        console.log("screenshot: ", screenshotData);

        //api game stores
        const gameStoresResponse = await fetch(`${BASE_URL}${GAMESTORES}`);
        const gameStoresData = await gameStoresResponse.json();
        console.log("screenshot: ", gameStoresData);


        /////// game detail content

        const gameDetailContent = document.createElement("div");
        gameDetailContent.classList.add("gameDetailContent");

        const backToMenu = document.createElement("button");
        backToMenu.classList.add("backToMenu");
        backToMenu.innerHTML = `<i class="fa-solid fa-arrow-left"></i> Go back`;

        backToMenu.addEventListener("click", () => {
            gameDetailsContainer.innerHTML = "";
            gameContainer.innerHTML = "";
            Menudisplay();
        });
        
        const title = document.createElement("h1");
        title.textContent = gameDetailsData.name;

        // image carousel //
        const imageCarousel = document.createElement("div");
        imageCarousel.classList.add("imageCarousel");

        const mainImage = document.createElement("img");
        mainImage.classList.add("mainImage");
        mainImage.id = "main_Image";
        mainImage.src = screenshotData.results[0].image;
        

        const slides = document.createElement("div");
        slides.classList.add("slides");

        const imgSlides = document.createElement("div");
        imgSlides.classList.add("imgSlides");

        const previous = document.createElement("button");
        previous.id = "previous_btn";
        previous.innerHTML = `<i class="fa-solid fa-caret-left"></i>`;

        const next = document.createElement("button");
        next.id = "next_btn";
        next.innerHTML = `<i class="fa-solid fa-caret-right"></i>`;

        screenshotData.results.forEach(result =>{
            const img = document.createElement("img");
            img.src = result.image;

            imgSlides.appendChild(img);

        })

        //discription//
        const discription = document.createElement("div");
        discription.classList.add("discription");

        const heading = document.createElement("h2");
        heading.textContent = "About the game";

        const paragraph = document.createElement("p");
        paragraph.innerHTML = `${gameDetailsData.description}`;

        //game details info//
        const gameDetailsInfo = document.createElement("div");
        gameDetailsInfo.classList.add("gameDetailsInfo");

        const gameDiscriptiveDetails = document.createElement("div")
        gameDiscriptiveDetails.classList.add("gameDiscriptiveDetails");

        const gameFactualDetails = document.createElement("div");
        gameFactualDetails.classList.add("gameFactualDetails");

        //gameDiscriptiveDetails
        //platform
        const platformDetails = document.createElement("div");
        platformDetails.classList.add("Details");

        const platformSubheading = document.createElement("h3");
        platformSubheading.textContent = "Platforms";

        const platformLable = document.createElement("p");
        platformLable.textContent = gameDetailsData.parent_platforms ? gameDetailsData.parent_platforms.map(item => item.platform.name ).join(", ") : "N/A";

        platformDetails.appendChild(platformSubheading);
        platformDetails.appendChild(platformLable);

        //genres
        const genreDetails = document.createElement("div");
        genreDetails.classList.add("Details");

        const genreSubheading = document.createElement("h3");
        genreSubheading.textContent = "Genre";

        const genreLable = document.createElement("p");
        genreLable.textContent = gameDetailsData.genres.map(itiem => itiem.name).join(", ");

        genreDetails.appendChild(genreSubheading)
        genreDetails.appendChild(genreLable);

        //developer
        const developerDetails = document.createElement("div");
        developerDetails.classList.add("Details");

        const developerSubheading = document.createElement("h3");
        developerSubheading.textContent = "Developer";

        const developerLable = document.createElement("p");
        developerLable.textContent = gameDetailsData.developers.map(itiem => itiem.name).join(", ");

        developerDetails.appendChild(developerSubheading)
        developerDetails.appendChild(developerLable);

        //age rating
        const ageDetails = document.createElement("div");
        ageDetails.classList.add("Details");

        const ageSubheading = document.createElement("h3");
        ageSubheading.textContent = "Age rating";

        const ageLable = document.createElement("p");
        ageLable.textContent = gameDetailsData.esrb_rating ? gameDetailsData.esrb_rating.name :"N/A";

        ageDetails.appendChild(ageSubheading)
        ageDetails.appendChild(ageLable);


        //tags
        const tagsDetails = document.createElement("div");
        tagsDetails.classList.add("Details");

        const tagsSubheading = document.createElement("h3");
        tagsSubheading.textContent = "Tags";

        const tagsLable = document.createElement("p");
        tagsLable.textContent = gameDetailsData.tags.map(itiem => itiem.name).join(", ");

        tagsDetails.appendChild(tagsSubheading)
        tagsDetails.appendChild(tagsLable);

        //website
        const websiteDetails = document.createElement("div");
        websiteDetails.classList.add("Details");

        const websiteSubheading = document.createElement("h3");
        websiteSubheading.textContent = "Website";

        const websiteLable = document.createElement("a");
        websiteLable.href = gameDetailsData.website;
        websiteLable.target = "_blank"
        websiteLable.textContent = gameDetailsData.website;

        websiteDetails.appendChild(websiteSubheading)
        websiteDetails.appendChild(websiteLable);

        //gameFactualDetails
        //Metascore
        const metascoreDetails = document.createElement("div");
        metascoreDetails.classList.add("Details");

        const metascoreSubheading = document.createElement("h3");
        metascoreSubheading.textContent = "Metascore";

        const metascoreLable = document.createElement("p");
        metascoreLable.classList.add("rating");
        if(gameDetailsData.metacritic !== null && gameDetailsData.metacritic !== undefined)
        {
            metascoreLable.textContent = gameDetailsData.metacritic;
            metascoreLable.classList.add( gameDetailsData.metacritic >= 75 ? "good" : gameDetailsData.metacritic >= 50 ? "average" : "bad" );

        }
        else{
            metascoreLable.classList.remove("rating");
            metascoreLable.textContent = "N/A";
        }

        metascoreDetails.appendChild(metascoreSubheading)
        metascoreDetails.appendChild(metascoreLable);

        //release date
        const releasedateDetails = document.createElement("div");
        releasedateDetails.classList.add("Details");

        const releasedateSubheading = document.createElement("h3");
        releasedateSubheading.textContent = "Release date";

        const releasedateLable = document.createElement("p");
        releasedateLable.textContent = gameDetailsData.released;

        releasedateDetails.appendChild(releasedateSubheading)
        releasedateDetails.appendChild(releasedateLable);

        //publisher
        const publisherDetails = document.createElement("div");
        publisherDetails.classList.add("Details");

        const publisherSubheading = document.createElement("h3");
        publisherSubheading.textContent = "Publisher";

        const publisherLable = document.createElement("p");
        publisherLable.textContent = gameDetailsData.publishers.map(itiem => itiem.name).join(", ");

        publisherDetails.appendChild(publisherSubheading)
        publisherDetails.appendChild(publisherLable);



        //gameDiscriptiveDetails
        gameDiscriptiveDetails.appendChild(platformDetails);
        gameDiscriptiveDetails.appendChild(genreDetails);
        gameDiscriptiveDetails.appendChild(developerDetails);
        gameDiscriptiveDetails.appendChild(ageDetails);
        gameDiscriptiveDetails.appendChild(tagsDetails);
        gameDiscriptiveDetails.appendChild(websiteDetails);

        //gameFactualDetails
        gameFactualDetails.appendChild(metascoreDetails);
        gameFactualDetails.appendChild(releasedateDetails);
        gameFactualDetails.appendChild(publisherDetails);


        //////game store containers
        const gameStoreContent = document.createElement("div");
        gameStoreContent.classList.add("gameStoreContent");

        const storeImageWrapper = document.createElement("div");
        storeImageWrapper.classList.add("storeImageWrapper");

        const storeImage = document.createElement("img");
        storeImage.classList.add("storeImage");
        storeImage.src = gameDetailsData.background_image;
         
        const gameStoreTitle = document.createElement("h2");
        gameStoreTitle.textContent = "where to buy";

        const storeList = document.createElement("div");
        storeList.classList.add("storeList");

        gameDetailsData.stores.forEach((item) => {

            const storeIconClass = getStoreIcon(item.store.id);
            const storeUrl = getStoreUrl(item.store.id, gameStoresData.results)

                const storeItem = document.createElement("a");
                storeItem.classList.add("storeItem");
                storeItem.href = storeUrl
                storeItem.target = "_blank"

                const storeInfo = document.createElement("div");
                storeInfo.classList.add("storeInfo");

                const storeIcon = document.createElement("div");
                storeIcon.classList.add("storeIcon", item.store.slug);

                const icon = document.createElement("i")
                icon.className = storeIconClass;

                const storeDetails = document.createElement("div");
                storeDetails.classList.add("storeDetails");

                const storeName = document.createElement("p");
                storeName.classList.add("storeName");
                storeName.textContent = item.store.name;

            storeIcon.appendChild(icon);
            storeDetails.appendChild(storeName);

            storeInfo.appendChild(storeIcon);
            storeInfo.appendChild(storeDetails);

            storeItem.appendChild(storeInfo);
            storeList.appendChild(storeItem);
        })

        //assement grid 1
        gameDetailsInfo.appendChild(gameDiscriptiveDetails);
        gameDetailsInfo.appendChild(gameFactualDetails);

        discription.appendChild(heading);
        discription.appendChild(paragraph);

        slides.appendChild(previous);
        slides.appendChild(imgSlides);
        slides.appendChild(next);

        gameDetailContent.appendChild(backToMenu);
        gameDetailContent.appendChild(title);       
        imageCarousel.appendChild(mainImage);
        imageCarousel.appendChild(slides);

        gameDetailContent.appendChild(imageCarousel);
        gameDetailContent.appendChild(discription);
        gameDetailContent.appendChild(gameDetailsInfo);

        //assement grid 2

        storeImageWrapper.appendChild(storeImage);

        gameStoreContent.appendChild(storeImageWrapper);
        gameStoreContent.appendChild(gameStoreTitle);
        gameStoreContent.appendChild(storeList);
        



        //assessement
        gameContainer.innerHTML = "";
        gameDetailsContainer.innerHTML = "";
        gameDetailsContainer.appendChild(gameDetailContent);
        gameDetailsContainer.appendChild(gameStoreContent);

        //carousal function
        carousal();
        
    } catch (error) {
        
    }
    

}



/*--------Function--------*/
/*-----------------------*/
function renderGames(games)
{

    try {
   
         games.forEach((result) => {
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
                mcRating.classList.add( result.metacritic >= 75 ? "good" : result.metacritic >= 50 ? "average" : "bad" );

            }
            else{
                mcRating.textContent = "N/A";
                mcRating.classList.add("NA");

            }

            console.log("rating: ",mcRating.className); 
            

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


function carousal() {

    const heroImage = document.getElementById("main_Image");
    const thumbnails = document.querySelectorAll(".imgSlides img");
    const previousBtn = document.getElementById("previous_btn");
    const nextBtn = document.getElementById("next_btn");

    let currentIndex = 0;

    thumbnails[currentIndex].classList.add("active");

    function updateMainImage(index) {
        heroImage.src = thumbnails[index].src

        thumbnails.forEach(img =>{
            img.classList.remove("active")
        });

        thumbnails[index].classList.add("active");

        thumbnails[index].scrollIntoView({
            behavior: "smooth",
            inline: "center", // center the thumbnail in the frame
            block: "nearest"
        });

        currentIndex = index;

    }


    thumbnails.forEach((img, index) => {

        img.addEventListener("click", ()=>{
            updateMainImage(index)

            })
    })


    previousBtn.addEventListener("click", ()=>{
        let newIndex = currentIndex - 1;
        updateMainImage(newIndex)
    })

    nextBtn.addEventListener("click", ()=>{
        let newIndex = currentIndex + 1;
        updateMainImage(newIndex)
    })
    
}



function getStoreIcon(storeIconId) {

    if(storeIconId === 1){
        return "fab fa-steam";
    }
    if(storeIconId === 3){
        return "fab fa-playstation";
    }
    if (storeIconId === 2) {
        return "fab fa-xbox";
    }
    if (storeIconId === 6) {
        return "fas fa-gamepad";   
    }
    if(storeIconId === 5 ){
        return "fas fa-download";
    }
    if (storeIconId === 11) {
        return "fas fa-shopping-cart"
    }
}


function getStoreUrl(storeIconId, storesArray) {
    const store = storesArray.find(s => s.store_id === storeIconId );
    return store ? store.url : "";
}

