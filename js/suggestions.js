const fetchSuggestions = () => {
    axios.get('http://localhost:3000/suggestions')
        .then(response => {
            const suggestions = response.data.data;
            console.log(`GET list suggestions`, suggestions);
        })
        .catch(error => console.error(error));
};


const createSuggestion = (suggestion) => {
    axios.post('http://localhost:3000/suggestions', suggestion)
        .then(response => {
            const addedSuggestions = response.data;
            console.log(`POST: suggestion is added`, addedSuggestions);
            // append to DOM
            // appendToDOM([addedReports]);
        })
        .catch(error => console.error(error));
};

const deleteSuggestion = (elem, id) => {
    axios.delete(`http://localhost:3000/suggestions/${id}`)
        .then(response => {
            console.log(`DELETE: suggestion is removed`, id);
            // remove elem from DOM
            elem.remove();
        })
        .catch(error => console.error(error));
};


const updateSuggestion = (elem, id) => {
    
axios.put(`http://localhost:3000/suggestions/${id}/`, {elem}).then(resp => {

    console.log(resp.data);
}).catch(error => {

    console.log(error);
});
};

