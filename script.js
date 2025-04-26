// Initialize the Ngrok URL variable
let ngrokUrl = "";

// Function to handle the Ngrok URL input
document.getElementById('setNgrokUrl').addEventListener('click', function() {
    const userNgrokUrl = document.getElementById('ngrokUrl').value.trim();

    if (userNgrokUrl === "") {
        alert("Please enter a valid Ngrok URL.");
        return;
    }

    // Set the Ngrok URL
    ngrokUrl = userNgrokUrl;
    alert(`Ngrok URL has been set to: ${ngrokUrl}`);
});

// Event listener for Analyze button
document.getElementById('analyzeButton').addEventListener('click', async function() {
    const videoUrl = document.getElementById('videoUrl').value.trim();
    
    if (!videoUrl) {
        alert("Please enter a valid YouTube URL.");
        return;
    }

    if (!ngrokUrl) {
        alert("Please set the Ngrok URL first.");
        return;
    }

    try {
        // Show loading message
        document.getElementById('analysisSummary').innerHTML = "Analyzing the video...";
        document.getElementById('commentsContainer').innerHTML = "";
        document.getElementById('results').style.display = "none";
        
        // Send POST request to the backend using the Ngrok URL
        const response = await fetch(`${ngrokUrl}/analyze`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ video_url: videoUrl })
        });

        const data = await response.json();
        
        if (response.ok) {
            displayAnalysisResults(data);
        } else {
            alert(`Error: ${data.error}`);
        }
    } catch (error) {
        alert("There was an error with the analysis.");
        console.error(error);
    }
});

// Function to display analysis results
function displayAnalysisResults(data) {
    // Display summary of results
    const summary = `
        <p><strong>Video ID:</strong> ${data.video_id}</p>
        <p><strong>Total Comments:</strong> ${data.total_comments}</p>
        <p><strong>High-Value Comments Found:</strong> ${data.high_value_count}</p>
    `;
    document.getElementById('analysisSummary').innerHTML = summary;
    
    // Display high-value comments
    const commentsContainer = document.getElementById('commentsContainer');
    data.comments.forEach(comment => {
        if (comment.high_value) {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment');
            
            commentElement.innerHTML = `
                <p class="author">👤 ${comment.author}</p>
                <p>${comment.text}</p>
                <p class="brands"><strong>Brands Mentioned:</strong> ${comment.brands.join(', ') || 'None'}</p>
                <p class="sentiment"><strong>Sentiment:</strong> ${comment.sentiment}</p>
                <p class="engagement"><strong>Engagement:</strong> ${comment.engagement}</p>
            `;
            commentsContainer.appendChild(commentElement);
        }
    });
    
    // Show results and download button
    document.getElementById('downloadReport').style.display = 'inline-block';
    document.getElementById('results').style.display = 'block';

    // Set up the download button
    document.getElementById('downloadReport').onclick = function() {
        downloadReport(data.video_id);
    };
}

// Function to download the report
async function downloadReport(videoId) {
    try {
        const response = await fetch(`${ngrokUrl}/download-report`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ video_id: videoId, comments: [] })  // Include other data as needed
        });

        const blob = await response.blob();
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `brand_collab_report_${videoId}.pdf`;
        link.click();
    } catch (error) {
        alert("Failed to download the report.");
        console.error(error);
    }
}
