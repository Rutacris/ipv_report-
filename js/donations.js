const fetchDonations = () => {
    axios.get('http://localhost:3000/donations')
        .then(response => {
            const donations = response.data.data;
            console.log(`GET list donations`, donations);
        })
        .catch(error => console.error(error));
};


const createDonation = (donation) => {
    axios.post(`http://localhost:3000/donations`, donation)
        .then(response => {
            const addedDonations = response.data;
            console.log(`POST: Donation recieved`, addedDonations);
            // append to DOM
            // appendToDOM([addedReports]);
        })
        .catch(error => console.error(error));
};

const deleteDonation = (elem, id) => {
    axios.delete(`http://localhost:3000/donations/${id}`)
        .then(response => {
            console.log(`DELETE: donation  removed`, id);
            // remove elem from DOM
            elem.remove();
        })
        .catch(error => console.error(error));
};


const updateDonation = (elem, id) => {
    
axios.put('http://localhost:3000/donations/6/', {
    first_name: 'Fred',
    last_name: 'Blair',
    email: 'freddyb34@yahoo.com'
}).then(resp => {

    console.log(resp.data);
}).catch(error => {

    console.log(error);
});
};

