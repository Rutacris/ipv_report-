const fetchReports = () => {
    axios.get('http://localhost:3000/reports')
        .then(response => {
            const reports = response.data.data;
            console.log(`GET list reports`, reports);
        })
        .catch(error => console.error(error));
};


const createReport = (report) => {
    axios.post(`http://localhost:3000/reports`, report)
        .then(response => {
            const addedReports = response.data;
            console.log(`POST: report is added`, addedReports);
            // append to DOM
            // appendToDOM([addedReports]);
        })
        .catch(error => console.error(error));
};

const deleteReport = (elem, id) => {
    axios.delete(`http://localhost:3000/reports/${id}`)
        .then(response => {
            console.log(`DELETE: report is removed`, id);
            // remove elem from DOM
            elem.remove();
        })
        .catch(error => console.error(error));
};


const updateReport = (elem, id) => {
    
axios.put('http://localhost:3000/reports/6/', {
    first_name: 'Fred',
    last_name: 'Blair',
    email: 'freddyb34@yahoo.com'
}).then(resp => {

    console.log(resp.data);
}).catch(error => {

    console.log(error);
});
};

