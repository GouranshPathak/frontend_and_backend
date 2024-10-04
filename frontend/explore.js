document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const placeId = params.get('id'); // Get the place ID from the URL
    const detailsContainer = document.getElementById('details-container');

    try {
        const response = await fetch(`http://localhost:3000/historical-places/${placeId}`); // Fetch place details by ID
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const place = await response.json();

        // Populate the details in the container
        detailsContainer.innerHTML = `
            <h3>${place.name}</h3>
            <p>${place.description}</p>
            <img src="${place.image}" alt="${place.name}">
        `;
    } catch (error) {
        console.error('Error fetching place details:', error);
        detailsContainer.innerHTML = `<p>Failed to fetch place details.</p>`;
    }
});
