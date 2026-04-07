// Function to render your items.
// I started by customizing the Json file from Eric's lecture then reviewed this with the tutor and customized the basic format to fit within the 4 dropdowns I created in the HTML file. I'm setting up the dropdown menu then calling each child in this first part
let renderItems = (data) => {
	data.forEach((item) => {
		let containerEl = document.getElementById('data-list')
		let itemHtml =`
		<li>
			<h2>hi</h2>
		</li>
		`
		containerEl.insertAdjacentHTML('beforeend', itemHtml)
	})
}
fetch('assets/data.json')
	.then(response => response.json())
	.then(data => {
		// And passes the data to the function, above!
		renderItems(data)
	})
