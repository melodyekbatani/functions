// Function to render your items.
// I started by customizing the Json file from Eric's lecture then reviewed this with the tutor and customized the basic format to fit within the 4 dropdowns I created in the HTML file. I'm setting up the dropdown menu then calling each child in this first part

let renderItems = (data) => {
	data.forEach((item) => {
		let containerEl = document.getElementById(`${item['Category'].toLowerCase()}-list`)
		let itemHtml =`
		<li data-category="${item['Category']}" data-vibes="${item['Vibes']}" class='active'>
			
			<h2>${item['Name']}</h2>
			<img src="${item['Image']}">
		</li>
		`
		// https://chatgpt.com/c/69d48e7e-b5c0-8332-b3b7-0280e0e87c6e

		containerEl.insertAdjacentHTML('beforeend', itemHtml)
	})
}
// Creating function to set up the distribution of selected items 
let getAverages =(data) => {
	let Averages = {}
	for (let item of data) {
		let key = item.dataset.vibes
		if (key in Averages) {Averages[key] += 1} 
		else {Averages[key] = 1;}
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
	Percent[prop] = data[prop]/sum
	}
	console.log(Percent)
}
// Introducing hashmaps - set of keys and values, first thing we do - is say have we seen the keys before(vibes - balanced/unhinged) - keep track of the number of items it has seen 
// const prop(property) in data - iterating through data, props - whatevers in the data 
//square brackets are used in Percent[prop] to get the actual key value


//next steps reviewed with tutor
//next step - event listener - toggle on and off something is selected(active or inactive) - each item has an event listen on it in the render items 
//representing the percentages for the user to see - create the html for the percentages the user sees - defining html structure where those numbers fit in- substituing in using the $() 

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
