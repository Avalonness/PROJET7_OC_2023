let recipesArray = [];
let ingredientArray = [];
let appliancetArray = [];
let ustensilsArray = [];
let recipesList = ""

const res = fetch("https://raw.githubusercontent.com/Avalonness/P11-front-end-search-engine/master/recipes.json")
    .then(res => res.json())
    .then(data => getRecipes(data))

//Function générale
function getRecipes(data){
    data.recipes.forEach(element => 
        {setIngredients(element);
        setAppliance(element.appliance);
        setUstensils(element.ustensils)
        setRecipes(element)
      });

}

  /* ------------------------
            OBJET TEMOIN
  --------------------------*/
let objTemoin = {
    tilte: null,
    ingredient: [],
    appliance: [],
    ustensils: []
}


  /* ------------------------
            SEARCH TOOL
  --------------------------*/
function selectRecipe() {
  selectedRecipe = recipesArray;
  filterRecipe = [];


  for(let i = 0; i < selectedRecipe.length; i++){
    if(selectedRecipe[i].name.includes(objTemoin.tilte)

   )
   {
      filterRecipe.push(selectedRecipe[i])
    } 

  }
  console.log(filterRecipe)
}


  /* ------------------------
            INGREDIENT
  --------------------------*/
//Permet de sélectionner les ingrédients uniques dans les recettes et les injecter
function setIngredients(element) {
    let ingredientList = "";
    const list1 = document.querySelector('#list_one')

    element.ingredients.forEach( allIngredient => {
    if (!ingredientArray.includes(allIngredient.ingredient.toLowerCase())) {
        ingredientArray.push(allIngredient.ingredient.toLowerCase());
    }
      })
//Tri tous les élément dans un ordre alphabétique
      ingredientArray.sort(function (a, b) {
        return a.localeCompare(b);
      });
//Injecte les éléments dans le dom
      ingredientArray.forEach(ingredient => ingredientList +=`<li onclick="getFilter1(event)">${ingredient}</li>`)
      list1.innerHTML = ingredientList
}

  /* ------------------------
            Appareil
  --------------------------*/
//Permet de sélectionner les appareil uniques dans les recettes et les injecter
function setAppliance(element) {
    let  applianceList = "";
    const list2 = document.querySelector('#list_two')

    if (!appliancetArray.includes(element.toLowerCase())) {
        appliancetArray.push(element.toLowerCase());
    }
//Tri tous les élément dans un ordre alphabétique
    appliancetArray.sort(function (a, b) {
        return a.localeCompare(b);
      });

//Injecte les éléments dans le dom
appliancetArray.forEach(appli => applianceList +=`<li onclick="getFilter2(event)">${appli}</li>`)
    list2.innerHTML = applianceList
}

  /* ------------------------
            USTENSILES
  --------------------------*/
function setUstensils(element) {
  let ustensilsList = "";
  const list3 = document.querySelector('#list_three')

  element.forEach( allUstensils => { 

      if (!ustensilsArray.includes(allUstensils.toLowerCase())) {
        ustensilsArray.push(allUstensils.toLowerCase());
    }
    })
//Tri tous les élément dans un ordre alphabétique
      ustensilsArray.sort(function (a, b) {
      return a.localeCompare(b);
    });
//Injecte les éléments dans le dom
    ustensilsArray.forEach(ustensils => ustensilsList +=`<li onclick="getFilter3(event)" ">${ustensils}</li>`)
    list3.innerHTML = ustensilsList
}

  /* ------------------------
            ALL RECIPES
  --------------------------*/
function setRecipes(element){
    
    const recipesContainer = document.querySelector('#recipe_container')

//Compile les recettes dans un tableau en même temps (utilisé pour la recherche)
    recipesArray.push(element)

//Isole les ingrédients de la recette 
    let ingredientElementList = ""
    element.ingredients.forEach( allIngredient => {
      ingredientElementList +=`<li><span class="bold">${allIngredient.ingredient}</span> ${allIngredient.quantity ? allIngredient.quantity : " "} ${allIngredient.unit ? allIngredient.unit : " "}</li>`
        })

//Setup de la recette dans le code html
    recipesList += ` 
    <div class="recipe_content">
    <div class="recipe_content_top">
  
    </div>
  
    <div class="recipe_content_bot">
      <div class="recipe_bot_title">
      <h3>${element.name}</h3>
      <div>🕒 <span class="bold">${element.time} min</span></div>
      </div>
  
      <div class="recipe_bot_infos">
        <ul>
          ${ingredientElementList}
        </ul>
  
        <div class="recipe_infos_description">${element.description}</div>
      
      </div>
    </div>
  </div>
    `
//Injecte dans le DOM  
  recipesContainer.innerHTML = recipesList


}
  /* ------------------------
            FUNCTION FRONT
  --------------------------*/

  let optionFilterArray = [];
  const domOptionFilter = document.querySelector("#option_filter__list")

//Function pour gérer les options de filtre
  //Function FILTRE 1
  function getFilter1(event) {
    let optionObj = {}
    optionObj = {value: `${event.target.textContent}`, type: "filter1"}
    if (!optionFilterArray.includes(optionObj)) {
      optionFilterArray.push(optionObj);
  }
    objTemoin.ingredient.push(optionObj.value);
    console.log(objTemoin)
    console.log(objTemoin.ingredient)
    setAllFilter()
    selectRecipe()
  }
  //Function FILTRE 2
  function getFilter2(event) {
    let optionObj = {}
    optionObj = {value: `${event.target.textContent}`, type: "filter2"}
    if (!optionFilterArray.includes(optionObj)) {
      optionFilterArray.push(optionObj);
  }
  objTemoin.appliance.push(optionObj.value);
  console.log(objTemoin)
    setAllFilter()
    selectRecipe()
  }
  //Function FILTRE 3
  function getFilter3(event) {
    let optionObj = {}
    optionObj = {value: `${event.target.textContent}`, type: "filter3"}
    if (!optionFilterArray.includes(optionObj)) {
      optionFilterArray.push(optionObj);
  }
  objTemoin.ustensils.push(optionObj.value);
  console.log(objTemoin)
    setAllFilter()
  }

  //Function pour injecter les filtres
  function setAllFilter() {
    let optionFilterList =""

    optionFilterArray.sort(function (a, b) {
      return a.type.localeCompare(b.type);
    });

    optionFilterArray.forEach( filter => {
      optionFilterList += `<li class="${filter.type}"><span>${filter.value}</span><button onclick="deleteOption(event)" class="btn_filter_close">x</button></li>`    
    })

    domOptionFilter.innerHTML = optionFilterList
  }

  //Function pour gérer la suppression d'un filtre

  function deleteOption(event) {
    event.preventDefault()

    let index = optionFilterArray.findIndex(obj => obj.value === `${event.target.parentNode.querySelector("span").textContent}`)
    optionFilterArray.splice(index, 1);
  
    //PERMET DE PARCOURIR L'OBJET TEMOIN AFIN DE SUPPRIMER LES FILTRES (et donc actualiser l'algo de recherche)
    Object.entries(objTemoin).forEach(([key, value]) => {
      if (Array.isArray(value)) {
          let index = value.indexOf(event.target.parentNode.querySelector("span").textContent);
          if (index !== -1) {
              value.splice(index, 1);
              console.log(`${event.target.parentNode.querySelector("span").textContent} removed from ${key}`);
              console.log(objTemoin)
          }
      }
  });

    setAllFilter()

  }

    /* ------------------------
            SEARCH BAR
  --------------------------*/

function searchBar(){
  const searchBarDom = document.querySelector("#searchbar")

  searchBarDom.addEventListener("change", function(e) {
    e.preventDefault()
    objTemoin.tilte = searchBarDom.value;

    if(objTemoin.tilte == '') {
      objTemoin.tilte = null
    }

    console.log(objTemoin)
    selectRecipe()
  });
}
searchBar()
console.log("Loaded")
console.log(ingredientArray)

/* ------------------------
            INPUT FILTER
  --------------------------*/
  //function de recherche d'un élément entré
  function inputFilter1(){
    const inupt1 = document.querySelector('#option1')
    const ulInput1 = document.querySelector('#optin1_list_ul')
    
// Ecoute chaque entrée de l'utilisateur
    inupt1.addEventListener("keyup", function(e) {
      let protoIngredient = []
      let searchFilter1List = ""
      e.preventDefault()
//Compare tous les ingrédients à l'input
      ingredientArray.forEach( ingredient => {
        if (ingredient.includes(inupt1.value)) {
          protoIngredient.push(ingredient);
      } 
        
      })
//Injecte tous les éléments relevés
      protoIngredient.forEach(element => {
        searchFilter1List += `<li onclick="getFilter1(event)" class="filter1">${element}</li>`
      })
      if(inupt1.value == "") {
        searchFilter1List = null
      }
      ulInput1.innerHTML = searchFilter1List

    })
  }

  function inputFilter2(){
    const inupt2 = document.querySelector('#option2')
    const ulInput2 = document.querySelector('#optin2_list_ul')
    

    inupt2.addEventListener("keyup", function(e) {
      let protoAppliance = []
      let searchFilter2List = ""
      e.preventDefault()

      appliancetArray.forEach( appliance => {
        if (appliance.includes(inupt2.value)) {
          protoAppliance.push(appliance);
      } 
        
      })

      protoAppliance.forEach(element => {
        searchFilter2List += `<li onclick="getFilter2(event)" class="filter2">${element}</li>`
      })
      if(inupt2.value == "") {
        searchFilter2List = null
      }
      ulInput2.innerHTML = searchFilter2List

    })
  }

  function inputFilter3(){
    const inupt3 = document.querySelector('#option3')
    const ulInput3 = document.querySelector('#optin3_list_ul')
    

    inupt3.addEventListener("keyup", function(e) {
      let protoUstensil = []
      let searchFilter3List = ""
      e.preventDefault()

      ustensilsArray.forEach( ustensil => {
        if (ustensil.includes(inupt3.value)) {
          protoUstensil.push(ustensil);
      } 
        
      })

      protoUstensil.forEach(element => {
        searchFilter3List += `<li onclick="getFilter3(event)" class="filter3">${element}</li>`
      })
      if(inupt3.value == "") {
        searchFilter3List = null
      }
      ulInput3.innerHTML = searchFilter3List

    })
  }

  inputFilter1()
  inputFilter2()
  inputFilter3()

