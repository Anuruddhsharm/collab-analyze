document.getElementById("analyzeForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    // Get input values
    const ngrokLink = document.getElementById("ngrokLink").value.trim();
    const youtubeLink = document.getElementById("youtubeLink").value.trim();

    // Validate inputs
    if (!ngrokLink || !youtubeLink) {
        alert("Please fill out both fields.");
        return;
    }

    const analyzeEndpoint = `${ngrokLink}/analyze`;

    // Send POST request to the Flask API
    try {
        const response = await fetch(analyzeEndpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ video_url: youtubeLink }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        displayResults(data);
    } catch (error) {
        console.error(error);
        alert("Failed to analyze video. Check the inputs and try again.");
    }
});

function displayResults(data) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.style.display = "block";
    resultsDiv.innerHTML = `
        <h2>Analysis Results</h2>
        <p><strong>Video ID:</strong> ${data.video_id}</p>
        <p><strong>Comments Analyzed:</strong> ${data.comments_analyzed}</p>
        <h3>Comment Details:</h3>
        <ul>
            ${data.results
                .map(
                    (comment) => `
                <li>
                    <strong>Comment:</strong> ${comment.text} <br>
                    <strong>Sentiment:</strong> ${comment.sentiment} <br>
                    <strong>Brands Mentioned:</strong> ${comment.brands.join(", ") || "None"}
                </li>
            `
                )
                .join("")}
        </ul>
    `;
}