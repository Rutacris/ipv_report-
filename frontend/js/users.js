const fetchUsers = () => {
    axios
      .get("http://localhost:3000/users", {
          headers: { Authorization: `Bearer ${getToken()}` },
        })
      .then((response) => {
        const users = response.data;
        let html_ = "<tr>";
        Object.keys(users).forEach(function (value, key) {
          html_ += "<tr>";
          html_ += "<td>" + (key + 1) + "</td>";
          html_ += "<td>" + users[value].email + "</td>";
          html_ += "</tr>";
        });
        document.getElementById("table_body").innerHTML = html_;
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            window.location.href = "/login.html";
          }
        }
      });
  };
  
  const createUser = (user) => {
    axios
      .post("https://reqres.in/api/users", user)
      .then((response) => {
        const addedUser = response.data;
        console.log(`POST: user is added`, addedUser);
        // append to DOM
        appendToDOM([addedUser]);
      })
      .catch((error) => console.error(error));
  };
  
  const deleteUser = (elem, id) => {
    axios
      .delete(`https://reqres.in/api/users/${id}`)
      .then((response) => {
        console.log(`DELETE: user is removed`, id);
        // remove elem from DOM
        elem.remove();
      })
      .catch((error) => console.error(error));
  };
  
  const updateUser = (elem, id) => {
    axios
      .put("http://localhost:3000/users/6/", {
        first_name: "Fred",
        last_name: "Blair",
        email: "freddyb34@yahoo.com",
      })
      .then((resp) => {
        console.log(resp.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getToken = () => {
      return localStorage.getItem(`access_token`);
    };