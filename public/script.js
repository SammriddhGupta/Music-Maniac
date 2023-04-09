// client-side js, loaded by index.html

// any console.log in this file will appear the browser console
console.log("Hello from script.js!")

// get Handlebars and axios from the window object. We added these to the window from a CDN link in index.html
const handlebars = window.Handlebars
const axios = window.axios

// get elements from the DOM 
const output = document.getElementById("recommendation-output");
const button = document.getElementById("submitButton");

const submitForm = async (event) => {
  try {
    // This line prevents the page from reshing on form submit. By default, a form submission event refreshes the page
    event.preventDefault()  
    disableButton()
    
    // get form values 
    const { elements } = event.target
    const track = elements.track.value
    const artist = elements.artist.value

    // send a POST request to the backend /recommendations path to get song recommendations
    let result
    try {
      result = await axios.post("/recommendations", { track, artist })
      //console.log(result)
    } catch (err) {
      let errMsg = "Something went wrong"

      if(err.response.data.message) {
        errMsg = err.response.data.message 
    } 
      return alert(errMsg)
    }
    
    // Extract top 3 recommendations only from the result
    const recommendations = result.data.tracks
    const topThreeRecs = recommendations.slice(0,3)
    
    const template = handlebars.compile(templateRaw)
    const recommendationsHtml = template({ track, topThreeRecs })
    output.innerHTML = recommendationsHtml
    
  } catch(err) {
    alert("Something went wrong. " + err.message)
  } finally {
    // regardless of outcome, re-enable button
    enableButton()
  }
}

const disableButton = () => {
  button.value = "Searching..."
  button.disabled = true
}

const enableButton = () => {
  button.value = "Get recommendations"
  button.disabled = false
}

const templateRaw = `
<p>If you like "{{track}}", you'll love:</p>
<ul>
  {{#each topThreeRecs}}
  <li>{{name}} - <a href="{{external_urls.spotify}}" target="_blank">Play</a></li>
  {{/each}}
</ul>
`
