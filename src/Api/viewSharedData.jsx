import axios from 'axios';

// Function to fetch data using Axios
async function fetchData(workflowRuntimeId, stepId) {
    const url = `https://acme-labs.azurewebsites.net/api/sharedData?workflowRuntimeId=${workflowRuntimeId}&stepId=${stepId}`;

    try {
        const response = await axios.get(url);
        return response.data; // Return the data or process it as needed
    } catch (error) {
        return { error: error.message };
    }
}

export default fetchData;
