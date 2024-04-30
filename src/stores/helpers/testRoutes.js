import { dishes } from '../data/sushi-data.js';

let categoriesArray = [];
let dishesArray = dishes;

dishesArray.map(dish => categoriesArray.push(dish.category));
let categoriesSet = new Set(categoriesArray);

function testIfCategoryTitleIsCorrect(categoryTitle) {
	return categoriesSet.has(categoryTitle);
}

export default testIfCategoryTitleIsCorrect;