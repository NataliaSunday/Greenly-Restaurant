var xhttp = new XMLHttpRequest();

let menuCategorySandwitches;
let menuCategoryMaindishes;
let socket = [];


xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(xhttp.responseText);
        let category = response.category;

        menuCategorySandwitches = category[0];
        menuCategoryMaindishes = category[1];

        window.onload = () => {
            displayMenu(menuCategorySandwitches)
        }
        let sandwitchesMenuBtn = document.getElementById('sandwitchesBtn');
        sandwitchesMenuBtn.addEventListener('click', () => {
            displayMenu(menuCategorySandwitches)
        });
        let mainDishesMenuBtn = document.getElementById('mainDishesBtn');
        mainDishesMenuBtn.addEventListener('click', () => {
            displayMenu(menuCategoryMaindishes)
        });
    }
};
xhttp.open("GET", "script/orderMenu.json", true);
xhttp.send();



function displayMenu(category) {

    let container = document.getElementById('mealsList');
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    };
    for (let i = 0; i < category.menuItems.length; i++) {
        createLayout(category.menuItems, i);
    }
}

function createLayout(categoryMenuItems, index) {
    let container = document.getElementById('mealsList');
    let listItem = document.createElement('li');
    let listItem__img = document.createElement('img');
    let listItem__text = document.createElement('div');
    let listItem__text__heading = document.createElement('p');
    let listItem__text__description = document.createElement('p');
    let listItem__costPanel = document.createElement('div');
    let listItem__costPanel__price = document.createElement('p');
    let listItem__costPanel__socket = document.createElement('svg');

    container.appendChild(listItem);
    listItem.appendChild(listItem__img);
    listItem.appendChild(listItem__text);
    listItem.appendChild(listItem__costPanel);
    listItem__text.appendChild(listItem__text__heading);
    listItem__text.appendChild(listItem__text__description);
    listItem__costPanel.appendChild(listItem__costPanel__price);
    listItem__costPanel.appendChild(listItem__costPanel__socket);

    listItem.setAttribute('class', 'mealsList__item flex-row-center');
    listItem__img.setAttribute('class', 'mealsList__image');
    listItem__text__heading.setAttribute('class', 'paragraph paragraph--menu');
    listItem__text__description.setAttribute('class', 'paragraph');
    listItem__costPanel.setAttribute('class', 'flex-row-center  padding-left-2');
    listItem__costPanel__price.setAttribute('class', 'paragraph paragraph--menu');
    listItem__costPanel__socket.addEventListener('click', ()=>{addToSocket(categoryMenuItems[index])});

    listItem__img.setAttribute('src', categoryMenuItems[index].image);
    listItem__text__heading.textContent = categoryMenuItems[index].name;
    listItem__text__description.textContent = categoryMenuItems[index].description;
    listItem__costPanel__price.textContent = categoryMenuItems[index].cost;
    listItem__costPanel__socket.innerHTML = '<svg id="Capa_1" enable-background="new 0 0 509.275 509.275" height="512" viewBox="0 0 509.275 509.275" width="512" xmlns="http://www.w3.org/2000/svg" class="icon icon--green"><g><path d="m479.637 314.485v-182.744l-360-65v-22.466c0-24.413-19.861-44.275-44.274-44.275h-45.726v30h45.725c7.871 0 14.275 6.404 14.275 14.275v277.005c0 31.979 26.016 57.995 57.995 57.995h12.005v34.187c-6.129-2.686-12.891-4.187-20-4.187-27.57 0-50 22.43-50 50s22.43 50 50 50c25.883 0 47.233-19.769 49.749-45h.251v-85h260v34.187c-6.129-2.686-12.891-4.187-20-4.187-27.57 0-50 22.43-50 50s22.43 50 50 50c25.883 0 47.233-19.769 49.749-45h.251v-115h-332.005c-15.437 0-27.995-12.558-27.995-27.995v-11.796zm-340 164.79c-11.028 0-20-8.972-20-20s8.972-20 20-20 20 8.972 20 20-8.972 20-20 20zm290 0c-11.028 0-20-8.972-20-20s8.972-20 20-20 20 8.972 20 20-8.972 20-20 20zm-160-197.71-60-.833v-167.256l60 10.833zm30-151.839 55 9.931v143.089l-55-.764zm-120 150.589-60-.833v-182.256l60 10.833zm270 3.75-65-.903v-138.089l65 11.736z"/></g></svg>';

}

function addToSocket(obj) {
   
    socket.push(obj)


    let container = document.body;
    menuResult = document.createElement('div');
    container.appendChild(menuResult);
    menuResult.setAttribute('class', 'order__result');
    let menuP = document.createElement('p');
    menuP.setAttribute('class', 'order__resut__p');
    menuResult.appendChild(menuP);
    menuP.textContent = `Added to socket: ${obj.name}`;

    setTimeout(()=>{
      document.querySelector('.order__result').remove();
    },2000);

    let ordered = document.createElement('div');
    let paragraphOrdered = document.createElement('p')
    paragraphOrdered.setAttribute('class', 'paragraph paragraph--green');
    paragraphOrdered.textContent = 'PAY';
    ordered.appendChild(paragraphOrdered);
    container.appendChild(ordered);
    ordered.setAttribute('class', 'socket flex-center');

    ordered.setAttribute('onclick', () =>{
        let container = document.body;
        payWindow = document.createElement('div');
        container.appendChild(payWindow);
        payWindow.setAttribute('class', 'flex-column-center payWindow');

    });

    
    
}

function displaySocket(){

}




/*
 
        window.onload = () =>{
            for (let i = 0; i < menuCategorySandwitches.menuItems.length; i++) {
                createLayout(menuCategorySandwitches.menuItems, i);
            }
        }
        sandwitchesMenuBtn.addEventListener('click', () => {
            let container = document.getElementById('mealsList');
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            };
            for (let i = 0; i < menuCategorySandwitches.menuItems.length; i++) {
                createLayout(menuCategorySandwitches.menuItems, i);
            }
        })

        let mainDishesMenuBtn = document.getElementById('mainDishesBtn');
        mainDishesMenuBtn.addEventListener('click', () => {
            let container = document.getElementById('mealsList');
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            };
            for (let i = 0; i < menuCategoryMaindishes.menuItems.length; i++) {
                createLayout(menuCategoryMaindishes.menuItems, i);
            }
        })


        


    listItem__text.textContent = menuCategorySandwitches[0].name;
    listItem__img.setAttribute('src', `${menuCategorySandwitches[0].image}`);
    
    let categoryMeals = menuCategorySandwitches.menuItems[];
  categoryItems.forEach(el => { 
        listItem__img.setAttribute('src', el.image);
      
  });
let sandwitchesBtn = document.getElementById('sandwitchesBtn');
sandwitchesBtn.addEventListener('click', displayCategory('kiki'));


is object 

function isObject(obj){
    const isObject = obj instanceof Object;
    console.log(isObject);
}



var xhttp = new XMLHttpRequest();


xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       let response = JSON.parse(xhttp.responseText);
       let category = response.category;
        
       let output = '';
       for( let i =0; i < category.length; i++){
           output += '<li>'+category[i].name+'</li>';
       }
       document.getElementById('category').innerHTML = output;
    
    }
    
};

xhttp.open("GET", "script/orderMenu.json", true);
xhttp.send();


/*/