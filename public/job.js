import { departments } from "./departments.js";
function getUrlParameters() {
    const searchParams = new URLSearchParams(window.location.search);
    const params = []
  
    for (const [key] of searchParams) {
      params.push(key);
    }
  
    return params;
  }
  const urlParams = getUrlParameters();

// Define the URL of your API endpoint
const apiUrl = `https://arianodelb4.herokuapp.com/jobs/${urlParams[1]}/${urlParams[0]}`; // Replace with your API URL
// Function to fetch data and update HTML elements
const fetchDataAndPopulate = async() =>{
    try{
    const companyResponse = await fetch(`https://arianodelb4.herokuapp.com/companies/${urlParams[0]}`);
    const companyData = await companyResponse.json();
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (response.status === 404 || companyResponse.status === 404) {
        // Handle the 404 error here
        
        const body = document.querySelector('body');
        body.innerHTML = `
          <div class="not-found">
            <h1>This page does not exist, Please verify the url</h1>
            <p style="font-size: 18px;">You can close this page now.</p>
          </div>`;
      } else if (response.ok && companyResponse.ok) {
      // Update other elements
      const body = document.querySelector('body');
      body.innerHTML = `
      <header>
        <img src="https://uploads-ssl.webflow.com/64f372bf5cb2cbb8370c00fd/6500f8e0204206c9e8e4d598_minilogo.png" alt="emplihire company logo" />
        <h1 id="comp-title">${companyData.name}</h1>
    </header>
    <main>
        <a href="/?${companyData.id}" class="jobs-link">See more jobs from this company</a>
        <article>
            <section class="job-top">
                <h2>${data.title}</h2>
                <div class="sub-info">

                    <div class="job-details">
                        <div class="j-d-titles">
                            <p>Location</p>
                        </div>
                        <div class="j-d-answer">
                            <p>${data.city}, ${data.region}, ${data.country}</p>
                        </div>
                    </div>
                    <div class="job-details">
                        <div class="j-d-titles">
                            <p>Department</p>
                        </div>
                        <div class="j-d-answer">
                            <p>${departments[data.department-1].depName}</p>
                        </div>
                    </div>
                    <div class="job-details">
                    <div class="j-d-titles">
                        <p>Position Status</p>
                    </div>
                    <div class="j-d-answer">
                        <p>${data.active === 1? "Active":"Not Active"}</p>
                    </div>
                </div>
                </div>
                <a class="apply a-top" href="https://ariaapply.netlify.app/?apply=${data.id}" target="_blank"> Apply to this job </a>
            </section>
            <section class="job-content">
                ${data.jobDescription}
            </section>
            <a class="apply a-bottom" href="https://ariaapply.netlify.app/?apply=${data.id}"> Apply to this job </a>
        </article>
    </main> 
    <footer>
        <p class="copywrite">Powered By Emplihire.</p>
        <p>Read our <a href="https://www.emplihire.com/privacy-policy" target="_blank">Privacy policy</a></p>
    </footer>
      `;
    }
      
    }
    catch(error) {
        return Promise.reject(error)
    };
}
// Call the function to fetch and populate data when the page loads
if(!urlParams){
    body.innerHTML = `
      <div class="not-found">
          <h1>This page does not exist, Please verify the url</h1>
          <p style="font-size: 18px;">This page will automatically close...</p>
      </div>`
}
else{
window.addEventListener('load', fetchDataAndPopulate);
}