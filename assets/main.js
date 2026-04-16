// Function to render your items.
// I started by customizing the Json file from Eric's lecture then reviewed this with the tutor and customized the basic format to fit within the 4 dropdowns I created in the HTML file. I'm setting up the dropdown menu then calling each child in this first part
//variables are defined and can access everything below
let currentPlate ={}
//This foodItem is for storing all items for resetetting the selection
let foodItem = []; 
//Global value - all categories of food
const categories = ['Base', 'Protein', 'Crunch', 'Sweet']
let currentModal = 0; 


//Every time you select a food item, the toggleNextButton function will perform a querySelector and check if li[data-category="Base”].active exists If querySelector  li[data-category="Base”] returns null or undefined, then disable the next button, but if it returns an HTML element, then enable the next button
let renderItems = (data) => {
	data.forEach((item) => {
		let containerEl = document.getElementById(`${item['Category'].toLowerCase()}-list`)
		let itemHtml = `
		<li data-category="${item['Category']}" data-vibes="${item['Vibes']}" data-personality="${item['Personality']}" class='item'>
			<img src="${item['Image']}">
			
		</li>
		`
		// to get the category and vibes together I originally used chat gpt before talking more to my code tutor, not really sure how much of the help from chat I ended up using https://chatgpt.com/c/69d48e7e-b5c0-8332-b3b7-0280e0e87c6e

		// After reviewing with my tutor, he mentioned the next steps to work on was adding an event listener and mentioned claude could help with this here's the chat tread, toggle on and off something is selected(active or inactive) - each item has an event listen on it in the render items https://claude.ai/share/80671624-d8b8-4373-b790-a0a73f990823

		containerEl.insertAdjacentHTML('beforeend', itemHtml)
		containerEl.lastElementChild.addEventListener("click", (e) => {e.currentTarget.classList.toggle('active')
		toggleNextButton(currentModal-1)
		}) 
		foodItem.push (containerEl.lastElementChild)
		//push - add it to the array 
	})
}
// Creating function to set up the distribution of selected items, counts how many times each vibe appears in an item. Arrow function like a traditional function, creates the average variable - then loops through data one by one for the dataset vibes and finds the vibe of each item. if statement is checking if its seen the vibe before if it hasnt seen it would {} - empty object if the item 1 is calm: 1, chaotic: 1 - if it exist it adds one andd if it doesnt exist it name a new one
function getAverages (data) {
	let Averages = {}
	for (let item of data) {
		let key = item.dataset.vibes
		if (key in Averages) { Averages[key] += 1 }
		else { Averages[key] = 1; }
	}
	return Averages
}

//for loop is going through ever property in the data and loops through each key, so for example happy: 2,sad: 1, angry: 1 - sum adds it all up. Percent takes each and divides it by the total 
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
// working with claude to implement the output options https://claude.ai/share/80671624-d8b8-4373-b790-a0a73f990823 
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

// random x array length (less than 1 and in between 0-1) getting random item from selected items
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
