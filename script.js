document.addEventListener("DOMContentLoaded", () => {
    const accessKey = "-o-GiNxuuB10WPoy8EqOW-orw0LdS15NT2j0E8xnQEs";
    
    const searchForm = document.getElementById("search-form");
    const searchBox = document.getElementById("search-box");
    const searchResult = document.getElementById("search-result");
    const showMoreButton = document.getElementById("show-more-btn");
    const infoCard = document.getElementById("info-card"); // Reference to the info card
 
    let keyword = "";
    let page = "1";
 
    async function searchImages() {
        keyword = searchBox.value;
 
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;
 
        if (page === "1") {
            searchResult.innerHTML = ""; // Clear previous results
        }
 
        results.forEach((result, index) => {
            const image = document.createElement("img");
            image.src = result.urls.small;
            image.classList.add("fade-in"); // Add fade-in class
 
            // Add a slight delay for each image based on its index
            setTimeout(() => {
                const imageLink = document.createElement("a");
                imageLink.href = result.links.html; // Link to the image on Unsplash
                imageLink.target = "_blank"; // Open in new tab
                imageLink.appendChild(image);
                searchResult.appendChild(imageLink);
            }, index * 200); // Adjust the timing (200 ms) as needed
        });
 
        showMoreButton.style.display = "block"; // Show the 'Show More' button
    }
 
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault(); // Prevent form submission
        page = "1"; // Reset to first page
        searchResult.innerHTML = ""; // Clear previous results
        infoCard.style.display = "none"; // Hide the info card on search
        searchImages(); // Fetch new images
    });
 
    showMoreButton.addEventListener("click", () => {
        page++; // Increment page number
        searchImages(); // Fetch more images
    });
 });
