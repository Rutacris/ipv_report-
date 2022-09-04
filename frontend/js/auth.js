const login = (creds) => {
    axios.post('http://localhost:3000/auth/login', creds)
        .then(response => {
           
            window.localStorage.setItem(`access_token`, response.data.access_token);
            window.localStorage.setItem(`names`, response.data.access_token);
            window.location.assign("dashboard.html")
        })
        .catch(error => console.error(error));
};


const register = (user) => {
    axios.post('http://localhost:3000/auth/register')
    .then(response => {
        const token = response;
        window.localStorage.setItem(`Access token`, token);
        window.localStorage.setItem(`access_token`, response.data.access_token);
        window.location.href = "/dashboard.html";
    })
    .catch(error => console.error(error));
};



const dashb = (user) => {
    axios.get('http://localhost:3000/auth/register')
    .then(response => {
        const token = response.access_token;
        console.log(`Access token`+ token);
    })
    .catch(error => console.error(error));
};

