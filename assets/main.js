// Function to render your items.
// I started by customizing the Json file from Eric's lecture then reviewed this with the tutor and customized the basic format to fit within the 4 dropdowns I created in the HTML file. I'm setting up the dropdown menu then calling each child in this first part
let currentPlate ={}

let renderItems = (data) => {
	data.forEach((item) => {
		let containerEl = document.getElementById(`${item['Category'].toLowerCase()}-list`)
		let itemHtml = `
		<li data-category="${item['Category']}" data-vibes="${item['Vibes']}" class='item'>
			<img src="${item['Image']}">
			<h2>${item['Name']}</h2>
			
		</li>
		`
		// to get the category and vibes together I originally used chat gpt before talking more to my code tutor, not really sure how much of the help from chat I ended up using https://chatgpt.com/c/69d48e7e-b5c0-8332-b3b7-0280e0e87c6e

		// After reviewing with my tutor, he mentioned the next steps to work on was adding an event listener and mentioned claude could help with this here's the chat tread, toggle on and off something is selected(active or inactive) - each item has an event listen on it in the render items https://claude.ai/share/80671624-d8b8-4373-b790-a0a73f990823

		containerEl.insertAdjacentHTML('beforeend', itemHtml)
		containerEl.lastElementChild.addEventListener("click", (e) => e.currentTarget.classList.toggle('active'))
	})
}
// Creating function to set up the distribution of selected items 
let getAverages = (data) => {
	let Averages = {}
	for (let item of data) {
		let key = item.dataset.vibes
		if (key in Averages) { Averages[key] += 1 }
		else { Averages[key] = 1; }
	}
	return Averages

}
let getPercent = (data) => {
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
		html += `<p>${prop}: ${Percent[prop] * 100 + '%'}</p>`
	}
	return html
}
// working with claude to implement the output options https://claude.ai/share/80671624-d8b8-4373-b790-a0a73f990823 
let getMDC = (Averages) => {
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
	
	const categories = ['Base', 'Protein', 'Crunch', 'Sweet']
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
			const name = item.querySelector('h2').textContent
			const image = item.querySelector('img').src
			plateHtml += `<p>${category}: ${name}</p><img src="${image}">`
		}
	}
	const results = getPercent(Averages)
	document.querySelector('.output').innerHTML = results + plateHtml

	currentModal = 5;
	switchModals(currentModal);
}
// 1 equal sign is a command - whatever this varible is change it to this 
//2/3 equal signs is a question (2 checking for semantic similarity, 3 is checking for datatype similarity)
)


const output1 = document.getElementById("output1");



// After reviewing with my tutor, he mentioned representing the percentages for the user to see - create the html for the percentages the user sees - defining html structure where those numbers fit in- substituing in using the $() https://claude.ai/share/80671624-d8b8-4373-b790-a0a73f990823


// Introducing hashmaps - set of keys and values, first thing we do - is say have we seen the keys before(vibes - balanced/unhinged) - keep track of the number of items it has seen 
// const prop(property) in data - iterating through data, props - whatevers in the data 
//square brackets are used in Percent[prop] to get the actual key value


//next steps reviewed with tutor
//next step - event listener - toggle on and off something is selected(active or inactive) - each item has an event listen on it in the render items DONE
//representing the percentages for the user to see - create the html for the percentages the user sees - defining html structure where those numbers fit in- substituing in using the $() DONE

//pick one per category - identifies what the most common category is (find most common category mdc nested - first look at all the categories - bases find any bases that are active that equal the mdc, find all protiens,crunch, sweet in mdc)
//then use JS random function - if there are no sweets in the mdc then just get one randomly from any of them (not nessissarily in the mdc)
//if the user picks no crunch - drop down to 3 instead of 4 or pick one from none selected "go to the store" maybe not nessissary right now 

//putting together the plate - find mdc - for loop whatever category is the biggest in the list is the category we care about - assuming we've done the html for all the active things then sort through all these then pick randomly from the category - compare many categories at the same time, I have the mdc and then base,protein ect. get the collection of items that are selected. they'll have the data attribute of the html of the category and the vibe - gets rid of all items that aren't in the mdc, data processing the easiest way - might be hard - but set up data into sub arrays and select a random one for each of those (ask for some help)

fetch('assets/data.json')
	.then(response => response.json())
	.then(data => {
		// And passes the data to the function, above!
		renderItems(data)
		let selected = document.getElementsByClassName('active')
		let Averages = getAverages(selected);
		getPercent(Averages)
	})

const modals = document.querySelectorAll('.modal');
const nextButton = document.querySelector('.next-button');
const backButton = document.querySelector('.back-button');

let currentModal = 0; 
switchModals(currentModal); // Reviewed this with tutor - it runs the function when the user first opens the page and updates the UI based on the current step starting on modal 0 which is the homepage
function switchModals(index){modals.forEach((modal,i)=>{ 
modal.classList.toggle('current',index===i);


 })
let buttonName=modals[index].getAttribute('data-button-name');
nextButton.innerHTML= buttonName==null ?"next":buttonName; 
}
//https://claude.ai/share/c86aaf9e-1b17-45f4-aebb-28c750f52d55 help troubleshooting the clear button
nextButton.addEventListener('click',()=>{if (currentModal < modals.length-1) {
currentModal++; }
else {
	currentModal = 0;
}
switchModals(currentModal)
})
backButton.addEventListener('click',()=>{if (currentModal > 0) {
currentModal--;
switchModals(currentModal)
}})
