const fetchUsers = () => {
    axios.get('http://localhost:3000/reports')
        .then(response => {
            const users = response.data.data;
            console.log(`GET list users`, users);
        })
        .catch(error => console.error(error));
};


const createUser = (user) => {
    axios.post('https://reqres.in/api/users', user)
        .then(response => {
            const addedUser = response.data;
            console.log(`POST: user is added`, addedUser);
            // append to DOM
            appendToDOM([addedUser]);
        })
        .catch(error => console.error(error));
};

const deleteUser = (elem, id) => {
    axios.delete(`https://reqres.in/api/users/${id}`)
        .then(response => {
            console.log(`DELETE: user is removed`, id);
            // remove elem from DOM
            elem.remove();
        })
        .catch(error => console.error(error));
};


const updateUser = (elem, id) => {
    
axios.put('http://localhost:3000/users/6/', {
    first_name: 'Fred',
    last_name: 'Blair',
    email: 'freddyb34@yahoo.com'
}).then(resp => {

    console.log(resp.data);
}).catch(error => {

    console.log(error);
});
};

