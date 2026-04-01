// Function to render your items.
// I started by customizing the Json file from Erics lecture then reviewed this with the tutor. Rather then calling each part of the JSON I want each of the categories to function as a drop down at first- I'm setting up the dropdown menu then calling each child. 
let renderItems = (data) => {
    data.forEach((item) => {
        let dropdown = document.getElementById(item.Category)

        if (dropdown) {
            let option = document.createElement ('option')
            option.textContent =item.Name
            dropdown.appendChild(option)
    }
})
    // looping through each item from the data.json 

    }
// Adding drop downs - using this https://www.w3schools.com/howto/howto_js_dropdown.asp https://medium.com/@kyleducharme/developing-custom-dropdowns-with-vanilla-js-css-in-under-5-minutes-e94a953cee75



// Fetch gets your (local) JSON file…
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
fetch('assets/data.json')
	.then(response => response.json())
	.then(data => {
		// And passes the data to the function, above!
		renderItems(data)
	})
