const fetchComments = () => {
    axios.get('http://localhost:3000/comments')
        .then(response => {
            const comments = response.data.data;
            console.log(`GET list comments`, comments);
        })
        .catch(error => console.error(error));
};


const createComment = (comment) => {
    axios.post(`http://localhost:3000/comments`, comment)
        .then(response => {
            const addedComments = response.data;
            console.log(`POST: comment added`, addedComments);
            // append to DOM
            // appendToDOM([addedReports]);
        })
        .catch(error => console.error(error));
};

const deleteComment = (elem, id) => {
    axios.delete(`http://localhost:3000/comments/${id}`)
        .then(response => {
            console.log(`DELETE: comment  removed`, id);
            // remove elem from DOM
            elem.remove();
        })
        .catch(error => console.error(error));
};


const updateComment = (elem, id) => {
    
axios.put('http://localhost:3000/comment/6/', {
    first_name: 'Fred',
    last_name: 'Blair',
    email: 'freddyb34@yahoo.com'
}).then(resp => {

    console.log(resp.data);
}).catch(error => {

    console.log(error);
});
};

