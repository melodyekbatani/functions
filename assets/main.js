// I begin by creating and setting global values. I'm defining these variables at the beginning of the file which means they can be access below. A few key variables I used are currentPlate, foodItem for storing all items and resetting the selection when the user hits restart as well as the categories that are used throughout but specifically within the toggleNext button 
let currentPlate ={}
let foodItem = []; 
const categories = ['Base', 'Protein', 'Crunch', 'Sweet']
let currentModal = 0; 


// To figure this out I first referenced the JSON lecture from Eric’s Loom video and then customized that approach for my project. When I started building the generator I needed a way to pull in my JSON data and display it on the page. I built the renderItems function to loop through each food item and drop it into the right category list. For each item I store the personality and vibe as data attributes so I can grab them later when calculating the results. Some additional resources I used to understand this better are https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals, https://www.geeksforgeeks.org/javascript/how-to-creating-html-list-from-javascript-array/ 
let renderItems = (data) => {
	data.forEach((item) => {
		let containerEl = document.getElementById(`${item['Category'].toLowerCase()}-list`)
		let itemHtml = `
		<li data-category="${item['Category']}" data-vibes="${item['Vibes']}" data-personality="${item['Personality']}" class='item'>
			<img src="${item['Image']}">
		</li>
		`

// When the food items are clicked, it toggles an active state (styled with css) on that element indicating to the user the item has been selected. This is the original LLM use that I shared, since learning this wasn't the correct way to prompt I went in revised the code so that I could understand it better and make the logic my own https://claude.ai/share/80671624-d8b8-4373-b790-a0a73f990823. To further understand this, I also reviewed this mdn link: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener. for my reference, e = event, so on a click event, the code targets the element and toggles the active styling.

		containerEl.insertAdjacentHTML('beforeend', itemHtml)
		containerEl.lastElementChild.addEventListener("click", (e) => {e.currentTarget.classList.
		toggle('active')

//I created this to clearly indicate to a user that they must select at least one item before moving to the next modal. Every time a user select a food item, the toggleNextButton function runs, doing a querySelector and checking if example li data-category="Base” active exists. If querySelector returns nothing selected, then it disable the next button, but if it returns an HTML element that has been selected, then enable the next button. It's important to note the sweets "create plate button" isn't in the same class as the other buttons so I need to add the disabled/enable state to that directly.

			if (currentModal <= 4) {
				toggleNextButton(currentModal - 1)
			}
		})

//This is something I learnt from the UC code tutor and from this youtube video https://www.youtube.com/watch?v=P4rQyW0hWTk. The goal of this function is to reset selected items. At the top, I created an empty array called foodItem. Each time a new li is created,containerEl grabs it and push adds it to the array. This loops through every item in the selected array and removes the active class.
		foodItem.push(containerEl.lastElementChild)
	})
}

// Creating function to set up the distribution of selected items, counts how many times each vibe appears in an item. First, jey is created to store the vibe value of each item. Then creates the average variable, then loops through data for the dataset vibes and finds the word for each item. if statement is checking if its seen the vibe before. if it hasn't seen the vibe before it creates a new entry and sets it to 1, if it has seen it before it adds 1 to the existing count. Reviewed this with code tutor and reviewed this video to understand it better https://www.youtube.com/watch?v=bRfkYI8Y0PM
function getAverages (data) {
	let Averages = {}
	for (let item of data) {
		let key = item.dataset.vibes
		if (key in Averages) { Averages[key] += 1 }
		else { Averages[key] = 1; }
	}
	return Averages
}

//This function takes the average and converts each vibe count into a percent. for loop is going through ever property in the data and loops through each key, so for example chaotic: 2, girlcore: 1, balanced: 1 - sum adds it all up. Percent takes each and divides it by the total to create the most dominant category. The sum variable loops through each property and counts to add up the total count of the vibes. Then I loop through again and divide each vibe by the total to get percentage. Then add it to the HTML so it can show the vibe name. 
function getPercent (data) {
	let Percent = {}
	let sum = 0
	for (const prop in data) {
		sum = sum + data[prop]
	}
	for (const prop in data) {
		Percent[prop] = data[prop] / sum
	}
	let html = ""
	for (const prop in Percent) {
		html += `<p>${prop}</p>`
	}
	return html
}
// Here I'm defining the most dominant category by creating and if statement. starting at 0 because no vibe is chosen, then keeping track of the vibe that's being picked the most times. holds the name of the vibe and returns it back to the user.
// 

function getMDC (Averages) {
	let mdc = null
	let highestCount = 0
	for (const vibe in Averages) {
		if (Averages[vibe] > highestCount) {
			highestCount = Averages[vibe]
			mdc = vibe
		}
	}
	return mdc
}

// This function runs when the button create plate button is clicked is clicked defines a random x array length (less than 1 and in between 0-1) if the user doesn't select an item in the most dominant category.
const getRandomItem = (arr) =>
	arr[Math.floor(Math.random() * arr.length)]


const createPlate = document.getElementById('create-plate')
createPlate.addEventListener('click', () => {
	let selected = document.getElementsByClassName('active')
	let Averages = getAverages(selected)
	const mdc = getMDC(Averages)

	let mdcItems = Array.from(selected).filter(item => item.dataset.vibes === mdc)


	// Triple === creates a strict equality to check if both values are the same https://claude.ai/share/80671624-d8b8-4373-b790-a0a73f990823
	//go through mdc items and filter them based on the catergory 
	//filter is the main function of the block 
	
	
	const plate = {}
	categories.forEach(category => {
		const filteredItems = mdcItems.filter(item => item.dataset.category === category)
		plate[category] = getRandomItem(filteredItems)



	if (plate[category] === undefined) {
		const nonMdcItems = Array.from(selected).filter(item => item.dataset.category === category)
		plate[category] = getRandomItem(nonMdcItems)
		console.log(nonMdcItems)
	}
	
	currentPlate = plate
})

	let plateHtml = ''
	for (const category in plate) {
		const item = plate[category]
		if (item) {
			const image = item.querySelector('img').src
			plateHtml += `<p>${category}: ${name}</p><img src="${image}">`
		}
	}
	const results = getPercent(Averages)

//simple for loop for declaring the personality type 


//create a variable called item and starts at 0 as long as the item is less then the length of the plate array the for loop will stop
//Object.values - converts the object into an array - takes every object value and puts it into an array so you can access it in a for loop
//Index - variable and accumulates by a value of 1, once it hits 4 it will stop.
let personalities = ''

const platePersonalities = Object.values(plate);
for (let index=0; index <platePersonalities.length; index+=1) { 
    //personalities += plate[item]. dataset.personality + ', '

const item = platePersonalities[index];
console.log(personalities[item]);
    //if the item is equal to the last plate (lenght is 4) then give it a period - but if any other item (1,2,3) give it a comma
    if (index===platePersonalities.length-1)
    {
    personalities += item. dataset.personality + '.';
    }
    else {
    personalities += item. dataset.personality + ', ';
    }
}



// I was trying to add you're without it thinking that's a part of a string 
// https://claude.ai/share/156f3a07-d924-4389-94fb-ce1aa46467d8
// https://w3schools.tech/tutorial/javascript/javascript_strings_object?

document.querySelector ('.plate-description').textContent = "You're giving "+ personalities


	document.querySelector('.output').innerHTML = results + plateHtml
//counting the numbers of modals before the create plate button activates - reviewed this with a tutor - its a hacky way to combine the 2 buttons i created
	currentModal = 5;
	switchModals(currentModal);

	
	foodItem.forEach((item)=>{item.classList.toggle('active',false)})
}
// 1 equal sign is a command - whatever this varible is change it to this 
//2/3 equal signs is a question (2 checking for semantic similarity, 3 is checking for datatype similarity)


)



fetch('assets/data.json')
	.then(response => response.json())
	.then(data => {
		// And passes the data to the function, above!
		renderItems(data)
		let selected = document.getElementsByClassName('active')
		let Averages = getAverages(selected);
		getPercent(Averages)
	})

//Accessing the button in the html first before starting the function (defining the variables)
const modals = document.querySelectorAll('.modal');
const nextButton = document.querySelector('.next-button');
const backButton = document.querySelector('.back-button');


function toggleNextButton (currentCategory){

	//2 lines in an if statement mean or find an html has an active class or if its -1 (home page) or 4(last button)
	//if its any other page you can disable it
if (document.querySelector("li[data-category='"+categories[currentCategory]+"'].active")||currentCategory===-1||currentCategory===4) { 
nextButton.disabled=false
}
else {
nextButton.disabled=true
}
}


switchModals(currentModal); // Reviewed this with tutor - it runs the function when the user first opens the page and updates the UI based on the current step starting on modal 0 which is the homepage
function switchModals(index){modals.forEach((modal,i)=>{ 
//modal.classList.toggle('current',index===i);


toggleNextButton (currentModal-1)
//Activating/deactivating modals
if (index===i)
{
modal.classList.add('current');
}
else {
modal.classList.remove('current');
}


//Creating the button names 
 })
let buttonName=modals[index].getAttribute('data-button-name');

if (buttonName==null)
{
nextButton.innerHTML= "next";
}
else {
nextButton.innerHTML= buttonName; 
}
}


//https://claude.ai/share/c86aaf9e-1b17-45f4-aebb-28c750f52d55 help troubleshooting the clear button
nextButton.addEventListener('click',()=>{if (currentModal < modals.length-1) {
currentModal+=1; }
else {
	currentModal = 0;
}
switchModals(currentModal)
})
backButton.addEventListener('click',()=>{if (currentModal > 0) {
currentModal-=1;
switchModals(currentModal)
}})
