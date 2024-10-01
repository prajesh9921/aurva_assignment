import axios from "axios";

const GetAllCategories = async () => {
    try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");
        return response?.data?.categories;
    } catch (error) {
        console.log(error.message)
    }
}

const GetMealsByCategory = async (category) => {
    try {
        const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`);
        return response?.data?.meals;
    } catch (error) {
        console.log(error.message)
    }
}

const GetIngredientsOrTags = async (name) => {
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`);
        return response?.data?.meals;
    } catch (error) {
        console.log(error.message)
    }
}



export {GetAllCategories, GetMealsByCategory, GetIngredientsOrTags};