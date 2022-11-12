const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";
//Method 1 : Using Async Await

const couscous = {
  title: "Moroccan couscous",
  level: "UltraPro Chef",
  ingredients: [
    "1/2 cup rice vinegar",
    "5 tablespoons honey",
    "1/3 cup soy sauce (such as Silver Swan®)",
    "1/4 cup Asian (toasted) sesame oil",
    "3 tablespoons Asian chili garlic sauce",
    "3 tablespoons minced garlic",
    "salt to taste",
    "8 skinless, boneless chicken thighs",
  ],
  cuisine: "Moroccan",
  dishType: "main_course",
  image: "https://images.media-allrecipes.com/userphotos/720x405/815964.jpg",
  duration: 240,
  creator: "Chef Oussama",
};
const manageRecipes = async () => {
  try {
    // Connection to the database "recipe-app"
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log(`Connected to the database: "${dbConnection.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    //create my own recipe
    const createRecipe = await Recipe.create(couscous);
   console.log(createRecipe.title);

    //insert all the 5 recipes
const manyRecipies = await Recipe.insertMany(data);
manyRecipies.forEach((recipe) => {
  console.log("title -->", recipe.title);
});
    // update the recipe
    await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    );
    // detele one recipe
    await Recipe.deleteOne({ title: "Carrot Cake" });
    // Run your code here, after you have insured that the connection was made
  } catch (error) {
    console.log(error);
  }
};
mongoose.connection.close();
manageRecipes();

//Method 2: Using .then() method
//If you want to use this method uncomment the code below:

/* mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  }); */
