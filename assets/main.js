// Function to render your items.
// I started by customizing the Json file from Eric'toos lecture then reviewed this with the tutor. Rather then calling each part of the JSON I want each of the categories to function as a drop down at first- I'm setting up the dropdown menu then calling each child. 
let renderItems = (data) => {
    data.forEach((item) => {
        let dropdown = document.getElementById(item.Category)

        if (dropdown) {
            let option = document.createElement ('option')
            option.textContent =item.Name // looping through each name item from the data.json 
            dropdown.appendChild(option)
    }
    })
}
let output = () => {
    let results=document.querySelector('.output')
    results.innerHTML = '<h2>Your Girl Dinner</h2>'

    document.querySelectorAll('select').forEach(select => {
        results.innerHTML += `<li>${select.value}</li>`
    
})
}
// I was struggling to get the event listener to be clicked by the user, I used ChatGPT to help trouble shoot this. This issue is that the event listener is appears before the second set of brackets. Needs to go after the output let function is closed https://chatgpt.com/share/69cd5fe1-65c0-832c-9846-165c9b75ddf0

    document.querySelector('button').addEventListener('click', output)


    
// Adding drop downs - using this https://www.w3schools.com/howto/howto_js_dropdown.asp https://medium.com/@kyleducharme/developing-custom-dropdowns-with-vanilla-js-css-in-under-5-minutes-e94a953cee75



// Fetch gets your (local) JSON file…
// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
fetch('assets/data.json')
	.then(response => response.json())
	.then(data => {
		// And passes the data to the function, above!
		renderItems(data)
	})
