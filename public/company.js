// const companyTitle = document.getElementById("comp-title");
// document.addEventListener("DOMContentLoaded",  async()=>{
//         const compData = await fetch("https://arianodelb4.herokuapp.com/companies/gw719koywl652ci4");
//         const jobData = await fetch("https://arianodelb4.herokuapp.com/jobs/374360570235");
//         const jobInfo = await jobData.json();
//         const compInfo = await compData.json();
//         companyTitle.innerText = compInfo.name
        
// })
function getUrlParameters() {
    const searchParams = new URLSearchParams(window.location.search);
    let params 
  
    for (const [key] of searchParams) {
      params = key;
    }
  
    return params;
  }
const urlParams = getUrlParameters();
const body = document.querySelector('body');
// Define the URL of your API endpoint

// Function to fetch data and update HTML elements
const fetchDataAndPopulate = async() =>{
    const apiUrl = `https://arianodelb4.herokuapp.com/jobs?company=${urlParams}`; // Replace with your API URL
    try{
    const companyResponse = await fetch(`https://arianodelb4.herokuapp.com/companies/${urlParams}`);
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
      // Update the company name

      // Update other elements
     
      body.innerHTML = `
      <header class="dashboard-header">
      <img src="https://uploads-ssl.webflow.com/64f372bf5cb2cbb8370c00fd/6500f8e0204206c9e8e4d598_minilogo.png" alt="emplihire company logo" />
      <h1>${companyData.name}</h1>
  </header>
  <main>
      <section class="hero">
          <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
              Aliquid dolor quasi neque quo voluptatem? Repellendus explicabo qui veritatis modi, 
              laboriosam quo porro blanditiis assumenda suscipit recusandae reiciendis iure ipsa 
              exercitationem, ex quia excepturi corrupti placeat sapiente illum voluptate similique 
              deserunt! Debitis sunt adipisci perspiciatis, optio a minima aspernatur iusto dicta 
              et maiores, hic exercitationem! Minus eum sit quo dolorum commodi, deleniti similique 
              vitae quas!
          </p>
      </section>
      <section class="jobs-list-cont">
          <h2> Active Job Positions</h2>
              <div class="job-list-wrap">
              ${data.map((res)=>{
                if(res.active === 1){

                    const date = new Date(res.addedDate);
                    const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
                    return(`<a href="/details.html?${companyData.id}&${res.id}" class="job-card">
                    <h4>${res.title}</h4>
                    <div class="job-card-info">
                    <p>${res.city}, ${res.region}</p>
                    <p>${res.country}</p>
                    <p>In Office, Full Time</p>
                    <p class="date-p"><span class="date">Posted Date: ${formattedDate}</span> <span class="date-explained">(YYYY-mm-dd)</span></p>
                    </div>
                    </a>`
                    )
                }
                }).join('') }
              </div>
          <!-- <div class="no-job">
              <p>There is currently no positions opened, come back another time.</p>
          </div> -->
      </section>
      
  </main> 
  <footer>
      <p class="copywrite">Powered By Emplihire.</p>
      <p>Read our <a href="https://www.emplihire.com/privacy-policy" target="_blank">Privacy policy</a></p>
  </footer>
      `;
            }
      
    }
    catch(error) {
      console.error('Error fetching data:', error);
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