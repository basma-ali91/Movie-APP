//  sideNav code

$(".icon").click(function () {
  $(".open").animate({ marginLeft: "250px" }, function () {
    $(".sidenav").fadeIn(1000);
    $(".open .icon").css("display", "none");
    $(".open .icon2").css("display", "block");
    $(".sidenav .item1").animate({ paddingTop: "25px" }, 1000);
    $(".sidenav .item2").animate({ paddingTop: "25px" }, 1100);
    $(".sidenav .item3").animate({ paddingTop: "25px" }, 1200);
    $(".sidenav .item4").animate({ paddingTop: "25px" }, 1300);
    $(".sidenav .item5").animate({ paddingTop: "25px" }, 1400);
    $(".sidenav .item6").animate({ paddingTop: "25px" }, 1500);
  });
});

$(".icon2").click(function () {
  $(".open").animate({ marginLeft: "0" }, function () {
    $(".sidenav ").fadeOut(500);
    $(".icon").css("display", "block");
    $(".open .icon2").css("display", "none");
    $(".sidenav  li").css("padding-top", "100vh");
  });
});

// end sidenav Code

let navLIinks = document.querySelectorAll(".itemlink");
for (let index = 0; index < navLIinks.length; index++) {
  navLIinks[index].addEventListener("click", function () {
    let link = this.innerHTML;
    getMovies(link);
  });
}

// get movies from api

let trendingMovies = [];
let trendinglink = document.getElementById("trending");
async function trending() {
  let apiUrlTrending = await fetch(
    `https://api.themoviedb.org/3/trending/all/day?api_key=9ce95bc6de0f614d08fd10f1ac882e11&page=1`
  );

  let responsetrending = await apiUrlTrending.json();
  trendingMovies = responsetrending.results;
  console.log(trendingMovies)
  displayTrending();
}

function displayTrending() {
  let imgs = ``;
  for (var i = 0; i < trendingMovies.length; i++) {
    imgs += `
        <div class="col-lg-4 col-md-6 p-2">
        <div class="movie">
        <div class="posters">
          <img class="w-100" src="https://image.tmdb.org/t/p/w500${trendingMovies[i].poster_path?trendingMovies[i].poster_path:"../images/images.jpg"}">
          <div class="layer d-flex lign-items-center">
            <div class="info-movie">
              <h2>${trendingMovies[i].title}</h2>
              <p>${trendingMovies[i].overview}</p>
              <p>${trendingMovies[i].vote_average}</p>
              <p>${trendingMovies[i].release_date}</p>
            </div>
          </div>
         </div>
        </div>
        </div>
        `;
  }
  document.getElementById("rowData").innerHTML = imgs;
}

trendinglink.addEventListener("click", function () {
  trending();
});

let linkMovies = [];
async function getMovies(link) {
  let apiUrl = await fetch(`https://api.themoviedb.org/3/movie/${link}?api_key=9ce95bc6de0f614d08fd10f1ac882e11&page=1`);
  let responseData = await apiUrl.json();
  linkMovies = responseData.results;
  console.log(responseData)
  displayMovies();
}

function displayMovies() {
  let imgs = ``;
  for (let i = 0; i < linkMovies.length; i++) {
    imgs += `
        <div class=" col-lg-4 col-sm-6  p-2">
        <div class="movie">
        <div class="posters">
          <img class="w-100 img-fluid" src="https://image.tmdb.org/t/p/w500${linkMovies[i].poster_path?linkMovies[i].poster_path :"../images/images.jpg"}">
          <div class="layer d-flex lign-items-center">
            <div class="info-movie">
              <h2>${linkMovies[i].title}</h2>
              <p>${linkMovies[i].overview}</p>
              <p>${linkMovies[i].vote_average}</p>
              <p>${linkMovies[i].release_date}</p>
            </div>
          </div>
         </div>
        </div>
        </div>
        `;
  }
  document.getElementById("rowData").innerHTML = imgs;
}

(async function showmovies() {
  await getMovies("now_playing");
})();

// end get movies from api


// search by word using api

let searchWord = document.getElementById("allmovies");

async function searchByWord(e) {
  let searchResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=9ce95bc6de0f614d08fd10f1ac882e11&query=${e}&page=1&include_adult=false`);
  let finalSearch = await searchResponse.json();
  let result = [];
  result = finalSearch.results;
  console.log(result);
  let imgs = ``;
  for (let i = 0; i < result.length; i++) {
    imgs += `
        <div class="col-md-6 col-lg-4 p-2 ">
        <div class="movie">
        <div class="posters">
          <img class="w-100" src="https://image.tmdb.org/t/p/w500${result[i].poster_path ?result[i].poster_path :"../images/images.jpg"}">
          <div class="layer d-flex lign-items-center">
            <div class="info-movie">
              <h2>${result[i].title}</h2>
              <p>${result[i].overview}</p>
              <p>${result[i].vote_average}</p>
              <p>${result[i].release_date}</p>
            </div>
          </div>
         </div>
        </div>
        </div>
        `;
  }
  document.getElementById("rowData").innerHTML = imgs;
}

searchWord.addEventListener("keyup", function () {
  searchByWord(searchWord.value);
});

// بحث في الافلام اللي ظهرت في الموقع


let search = document.getElementById("search");
 function searchfunction(){
    let searhimgs =``
    for (let i = 0;  i< linkMovies.length; i++) {
        if(linkMovies[i].original_title.toLowerCase().includes(search.value.toLowerCase())){
             searhimgs += `
             <div class="col-lg-4  p-2">
             <div class="movie">
             <div class="posters">
               <img class="w-100" src="https://image.tmdb.org/t/p/w500${linkMovies[i].poster_path?linkMovies[i].poster_path:"../images/images.jpg"}">
               <div class="layer d-flex lign-items-center">
                 <div class="info-movie">
                   <h2>${linkMovies[i].title}</h2>
                   <p>${linkMovies[i].overview}</p>
                   <p>${linkMovies[i].vote_average}</p>
                   <p>${linkMovies[i].release_date}</p>
                 </div>
               </div>
              </div>
             </div>
             </div>
             `;
       }
       document.getElementById("rowData").innerHTML = searhimgs;
         
    }
}

search.addEventListener("keyup",function () {
    searchfunction();
  });




// contact us and vaidation

let userName = document.getElementById("name");
let userEmail = document.getElementById("email");
let userPhone = document.getElementById("phone");
let userAge = document.getElementById("age");
let userPassword = document.getElementById("pass");
let userRePassword = document.getElementById("pass2");
let userNameAlart = document.getElementById("userNameAlert");
let userEmailAlart = document.getElementById("userEmailAlert");
let userPhoneAlert = document.getElementById("userPhoneAlert");
let userAgeAlert = document.getElementById("userAgeAlert");
let userPassAlert = document.getElementById("userPassAlert");
let userRepassAlert = document.getElementById("userRepassAlert");
let contact = document.getElementById("contactUs");
let submitBtn = document.getElementById("submitBtn");

function userNameValidation() {
  let regName = /^[A-Za-z][a-z]{3,13}$/;
  if (regName.test(userName.value) == true && userName.value != "") {
    userNameAlart.classList.replace("d-block", "d-none");

    return true;
  } else {
    userNameAlart.classList.replace("d-none", "d-block");
    return false;
  }
}

function userEmailValidation() {
  var regEmail = /[A-Za-z]@[a-z]{4,10}(.com)$/;
  if (regEmail.test(userEmail.value) == true && userEmail.value != "") {
    userEmailAlart.classList.replace("d-block", "d-none");
    return true;
  } else {
    userEmailAlart.classList.replace("d-none", "d-block");
    return false;
  }
}

function userPhoneValidation() {
  regphone = /^(010|012|011|015)[0-9]{8}$/;
  if (regphone.test(userPhone.value) == true && userPhone.value != "") {
    userPhoneAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    userPhoneAlert.classList.replace("d-none", "d-block");
    return false;
  }
}

function userAgeValidation() {
  regage = /^[1-9][0-9]$/;
  if (regage.test(userAge.value) == true && userAge.value != "") {
    userAgeAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    userAgeAlert.classList.replace("d-none", "d-block");
    return false;
  }
}

function userPassValidation() {
  var regPass = /^(?=.*[A-Za-z])[A-Za-z\d]{8,}$/;
  if (regPass.test(userPassword.value) == true && userPassword.value != "") {
    userPassAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    userPassAlert.classList.replace("d-none", "d-block");
    return false;
  }
}

function rePassValidation() {
  if (userPassword.value == userRePassword.value) {
    userRepassAlert.classList.replace("d-block", "d-none");
    return true;
  } else {
    userRepassAlert.classList.replace("d-none", "d-block");
    return false;
  }
}

userName.addEventListener("keyup", userNameValidation);
userEmail.addEventListener("keyup", userEmailValidation);
userPhone.addEventListener("keyup", userPhoneValidation);
userAge.addEventListener("keyup", userAgeValidation);
userPassword.addEventListener("keyup", userPassValidation);
userRePassword.addEventListener("keyup", rePassValidation);

contact.addEventListener("click", function () {
  if (
    userNameValidation() == true &&
    userEmailValidation() == true &&
    userPhoneValidation() == true &&
    userAgeValidation() == true &&
    userPassValidation() == true &&
    rePassValidation() == true
  ) {
    submitBtn.disabled = false;
  }
});
