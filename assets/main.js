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
		if (key in Averages) {Averages[key] += 1} 
		else {Average[key] = 1;}
	}
// Introducing hashmaps - set of keys and values, first thing we do - is say have we seen the keys before(vibes - balanced/unhinged) - keep track of the number of items it has seen 
}


fetch('assets/data.json')
	.then(response => response.json())
	.then(data => {
		// And passes the data to the function, above!
		renderItems(data)
		let selected = document.getElementsByClassName('active')
	getAverages(selected);
	})
