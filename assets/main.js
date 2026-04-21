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
// Here I'm defining the most dominant category by creating an if statement. Its sayign starting at 0 because no vibe is chosen, then keeping track of the vibe that's being picked the most times, defining the highest count. It holds the name of the vibe and returns it back to the user. 

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


// Note: Triple === creates a strict equality to check if both values are the same https://claude.ai/share/80671624-d8b8-4373-b790-a0a73f990823


//Next, I'm defining the variable for the plate prioritizing the items in the most dominant category filtering them by the food category they are a part of, saying if there are selected items in the MDC then get a random item within that food category. After selecting random items within the MDC, if there is a category where no items are in the MDC, pick randomly from the selected items so the user always has 4 items on the plate
	const plate = {}
	categories.forEach(category => {
		const filteredItems = mdcItems.filter(item => item.dataset.category === category)
		plate[category] = getRandomItem(filteredItems)



	if (plate[category] === undefined) {
		const nonMdcItems = Array.from(selected).filter(item => item.dataset.category === category)
		plate[category] = getRandomItem(nonMdcItems)
	}
	
	currentPlate = plate
})
//This function loops declaring the overall personality/vibe type for the user's plate. It through the plate objects and for each category that has an item selected it grabs the item's image and adds it to the html. After it loops it gives the getPercentage function to declare the vibe.The item variable starts at 0 as long as the item is less then the length of the plate array the for loop will stop. Also helpful for this logic: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in and template literal for figuring out the html string https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
	let plateHtml = ''
	for (const category in plate) {
		const item = plate[category]
		if (item) {
			const image = item.querySelector('img').src
			plateHtml += `<p>${category}: ${name}</p><img src="${image}">`
		}
	}
	const results = getPercent(Averages)


//Here I'm creating the sentence for the individual personality train for each food item on the outcome plate. First defining a variable for peronality type. Object value converts the selected plate object into an array so it can be looped through the index, starting at 0 then going up by 1 each time stopping at 4 (because I have 4 categories). Then I'm definining what that sentance will look like. The if else statement is to make it so the last item gets an 'and' and a period behind it rather then a comma like the first 3. 
let personalities = ''

const platePersonalities = Object.values(plate);
for (let index=0; index <platePersonalities.length; index+=1) { 
    //personalities += plate[item]. dataset.personality + ', '

const item = platePersonalities[index];
    //if the item is equal to the last plate (lenght is 4) then give it a period - but if any other item (1,2,3) give it a comma
    if (index===platePersonalities.length-1)
    {
    personalities += 'and ' + item. dataset.personality + '.';
    }
    else {
    personalities += item. dataset.personality + ', ';
    }
}



// Here I'm actually creating the html structure for the outcome statement by using document.querySelector and defining what it will say. One thing to note here is that because I'm using the word you're with a ' I need to use " quotation marks so that it doesn't misinterprete the comma in you're.
// https://claude.ai/share/156f3a07-d924-4389-94fb-ce1aa46467d8
// https://w3schools.tech/tutorial/javascript/javascript_strings_object?

document.querySelector ('.plate-description').textContent = "You're giving "+ personalities


	document.querySelector('.output').innerHTML = results + plateHtml

	//In this section I'm counting the numbers of modals before the create plate button activates while combining the switch modal active state with the functionality of the next button. This is something I reviewed with a UC tutor. 
	currentModal = 5;
	switchModals(currentModal);

	
	foodItem.forEach((item)=>{item.classList.toggle('active',false)})
	// Note: 1 equal sign is a command - whatever this varible is change it to this. vs 2/3 equal signs is a question (2 checking for semantic similarity, 3 is checking for datatype similarity)
}
)
// From Eric's json lecture. Using fetch here to pull in my JSON data. //Accessing the button in the html first before starting the function (defining the variables). Once the data is ready, it gets added to the renderItems to show it on the page. Next it targets the selected items checking if there is an active item in the current category, if there isn't one it disables the next button. 
// Also here I'm setting up the averages and percentages but it's not really doing anything yet other then getting prepared for when all 4 category items are selected. 
fetch('assets/data.json')
	.then(response => response.json())
	.then(data => {
		// And passes the data to the function, above!
		renderItems(data)
		let selected = document.getElementsByClassName('active')
		let Averages = getAverages(selected);
		getPercent(Averages)
	})


// Defining modals and button variables as conste because they always point to the same html element (even though they are styled differently thoughout)
const modals = document.querySelectorAll('.modal');
const nextButton = document.querySelector('.next-button');
const backButton = document.querySelector('.back-button');
const createPlateButton = document.getElementById ('create-plate');

//Here I'm making sure the user can't skip a category without picking something first. Every time a food item is clicked, this checks if there's an active item in the current category. If there isn't one it disables the next button. This is done by creatinng an if else statment saying if nothing  is selected disable it, if something is selected render it in it's active state. The -1 and 4 exceptions are for the home screen and the last screen where the user doesn't need to make a selection so the button stays enabled. A few notes here: the 2 vertical lines in an if statement mean OR, checking if there is an selected state on an item OR if its on the first screen OR the last screen, if any of those statements are true button stays active. 

function toggleNextButton (currentCategory){
if (document.querySelector("li[data-category='"+categories[currentCategory]+"'].active")||currentCategory===-1||currentCategory===4) { 
nextButton.disabled=false
createPlateButton.disabled=false

}
else {
nextButton.disabled=true
createPlateButton.disabled=true
}
}


/// Reviewed this with tutor, here I'm running switchModals so the right screen shows when the page first loads, starting at 0 which is the homepage. The function loops through every modal and checks if it matches the current step. If it does, it shows it. If it doesn't, it hides it. I'm also running toggleNextButton here so the next button always updates whenever the screen changes. Using a simple add and remove class here: https://www.w3schools.com/jsref/prop_element_classlist.asp with an if else statement. 

switchModals(currentModal); 
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


//This function defines the button names that I set in the html. I use the data-button-name attribute from the current modal but also adding an if else statement here saying if it doesn't have a name in the html give it the name "next" https://www.w3schools.com/jsref/met_element_getattribute.asp. 
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

//Finally adding an event listener for the buttons to guide the user through the screens. When next is clicked it says go one forward and when the back button is clicked go back 1 modal. I got help from my code tutor for figuring out the reset on the last screen saying if the user is already on the last screen it resets back to 0 which is the homepage. https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener, addition and subtraction resource: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition_assignment and for arrow functions: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions 
//  https://claude.ai/share/c86aaf9e-1b17-45f4-aebb-28c750f52d55 help troubleshooting the clear button

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
