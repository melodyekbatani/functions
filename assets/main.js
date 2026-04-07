// Function to render your items.
// I started by customizing the Json file from Eric's lecture then reviewed this with the tutor and customized the basic format to fit within the 4 dropdowns I created in the HTML file. I'm setting up the dropdown menu then calling each child in this first part

let renderItems = (data) => {
	data.forEach((item) => {
		let containerEl = document.getElementById(`${item['Category'].toLowerCase()}-list`)
		let itemHtml =`
		<li>
			<h2>${item['Name']}</h2>
			<img src="${item['Image']}">
		</li>
		`
		// https://chatgpt.com/c/69d48e7e-b5c0-8332-b3b7-0280e0e87c6e

		containerEl.insertAdjacentHTML('beforeend', itemHtml)
	})
}
fetch('assets/data.json')
	.then(response => response.json())
	.then(data => {
		// And passes the data to the function, above!
		renderItems(data)
	})
