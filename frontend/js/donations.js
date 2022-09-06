const fetchDonations = () => {
    axios
      .get("http://localhost:3000/donations", {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => {
        const donations = response.data;
        console.log(response)
        let html_ = "<tr>";
        let total_amount = 0;
        Object.keys(donations).forEach(function (value, key) {
          html_ += "<tr>";
          html_ += "<td>" + (key + 1) + "</td>";
          html_ += "<td>" + donations[value].names + "</td>";
          html_ += "<td>" + donations[value].email + "</td>";
          html_ += "<td>" + donations[value].amount + "</td>";
          html_ += "<td>" + donations[value].donated_on + "</td>";
          html_ += "</tr>";
          total_amount = total_amount + parseInt(donations[value].amount)
        });
        document.getElementById("table_body").innerHTML = html_;
        document.getElementById("total_amount_id").innerHTML = total_amount;
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            window.location.href = "/login.html";
          }
        }
      });
  };
  
  const createDonation = (donation, guest="") => {
    axios
      .post(`http://localhost:3000/donations${user === 'guest' ? '?guest=true':''}`, donation)
      .then((response) => {
        const addedDonations = response.data;
        console.log(`POST: Donation recieved`, addedDonations);
        // append to DOM
        // appendToDOM([addedReports]);
      })
      .catch((error) => console.error(error));
  };
  
  const deleteDonation = (elem, id) => {
    axios
      .delete(`http://localhost:3000/donations/${id}`)
      .then((response) => {
        console.log(`DELETE: donation  removed`, id);
        // remove elem from DOM
        elem.remove();
      })
      .catch((error) => console.error(error));
  };
  
  const updateDonation = (elem, id) => {
    axios
      .put("http://localhost:3000/donations/6/", {
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
  