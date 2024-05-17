const apiKey = "af6b07afffb948768a80228a8ac381a9";

const container = document.querySelector('.container');
const recipeList = document.querySelector('#recipe-list');
const showMoreBtn = document.querySelector('#btn');





function showRecipes(recipes) {
  recipeList.innerHTML ='';
  
  recipes.forEach((recipe)=>{
    const recipeItem = document.createElement('li');
    recipeItem.classList.add('recipe-item');
   
    const recipeImg = document.createElement('img');
    recipeImg.src = recipe.image;
    recipeImg.alt = 'recipe.image';
    
    const recipeTitle = document.createElement('h2');
    recipeTitle.innerText = recipe.title;
    
    const recipePara = document.createElement('p');
    recipePara.innerHTML = `
    <strong>Ingredients:</strong> ${recipe.extendedIngredients.map((ingredient)=>ingredient.original).join(', ')}
    `;
    
    const recipeLink = document.createElement('a');
    recipeLink.innerText = 'View Recipe ';
    recipeLink.href = recipe.sourceUrl;
    
    
    
    recipeList.appendChild(recipeItem);
    recipeItem.appendChild(recipeImg);
    recipeItem.appendChild(recipeTitle);
    recipeItem.appendChild(recipePara);
    recipeItem.appendChild(recipeLink);
    
  })

  
}

async function autoCall() {
  const recipes = await getRecipes();
  showRecipes(recipes);
}

async function getRecipes(){
  
  try {
    const response = await fetch(`https://api.spoonacular.com/recipes/random?number=10&apiKey=${apiKey}`);
    if (!response.ok) {
      throw new Error('No Response')
    }
    const data = await response.json();
    return data.recipes;
   
  } catch (e) {
    throw(e)
  }
  
}

autoCall();


showMoreBtn.addEventListener('click',()=>{
  autoCall();
})


