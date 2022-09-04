const fetchReports = async () => {
    await axios
      .get("http://localhost:3000/reports", {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => {
        const reports = response.data;
        let html_ = "<tr>";
        Object.keys(reports).forEach(function (value, key) {
          html_ += "<tr>";
          html_ += "<td>" + (key + 1) + "</td>";
          html_ += "<td>" + reports[value].email + "</td>";
          html_ += "<td>" + reports[value].phonenumber + "</td>";
          html_ += "<td>" + reports[value].district + "</td>";
          html_ += "<td>" + reports[value].sector + "</td>";
          html_ +=
            "<td> <a type='button' style='cursor:pointer;' onclick='fetchReport(" +
            reports[value].id +
            ")'>Read</a></td>";
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
  
  const createReport = (report) => {
    axios
      .post(`http://localhost:3000/reports`, report)
      .then((response) => {
        const addedReports = response.data;
        console.log(`POST: report is added`, addedReports);
      })
      .catch((error) => console.error(error));
  };
  
  const deleteReport = (elem, id) => {
    axios
      .delete(`http://localhost:3000/reports/${id}`)
      .then((response) => {
        console.log(`DELETE: report is removed`, id);
        // remove elem from DOM
        elem.remove();
      })
      .catch((error) => console.error(error));
  };
  
  const updateReport = (elem, id) => {
    axios
      .put("http://localhost:3000/reports/6/", {
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
  
  const fetchReport = async (id) => {
    await axios
      .get("http://localhost:3000/reports/" + id, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => {
        const reports = response.data;
        html_ = `<div class="row">
        <div class="col-25">
          <label for="names">Names</label>
        </div>
        <div class="col-75">
          <input type="text" id="fname" name="firstname" placeholder="Your name.." value=${response.data.names}>
        </div>
      </div>
      <div class="row">
        <div class="col-25">
          <label for="pnumber">Phone number</label>
        </div>
        <div class="col-75">
          <input type="text" id="lname" name="lastname" placeholder="Your last name.." value=${response.data.phone}>
        </div>
      </div>
      <div class="row">
      <div class="col-25">
        <label for="email">Email</label>
      </div>
      <div class="col-75">
        <input type="text" id="lname" name="lastname" placeholder="Your last name.." value=${response.data.email}>
      </div>
    </div>
    
      <div class="row">
        <div class="col-25">
          <label for="message">Message</label>
        </div>
        <div class="col-75">
          <textarea id="message_" name="subject" placeholder="Write something.." style="height:200px" value=${response.data.message}>${response.data.message}</textarea>
        </div>
      </div>
      <div class="row">
      <div class="col-25">
        <label for="email">District</label>
      </div>
      <div class="col-75">
        <input type="text" id="lname" name="lastname" placeholder="Your last name.." value=${response.data.district}>
      </div>
    </div> <div class="row">
    <div class="col-25">
      <label for="email">Sector</label>
    </div>
    <div class="col-75">
      <input type="text" id="lname" name="lastname" placeholder="Your last name.." value=${response.data.sector}>
    </div>
  </div> <div class="row">
  <div class="col-25">
    <label for="email">Cell</label>
  </div>
  <div class="col-75">
    <input type="text" id="lname" name="lastname" placeholder="Your last name.." value=${response.data.cell}>
  </div>
  </div>
  <div class="row">
  <div class="col-25">
  <label for="message">Forward To</label>
  </div>
  <div class="col-75">
  <input type="text" name="forward_email" id="forward_email" placeholder="Enter email..">
  </div><input type="button" id="submit_btn" onclick="submit_report()" value="Send">
  </div>`;
        document.getElementById("myModal");
        modal.style.display = "block";
        document.getElementById("modal-data").innerHTML = html_;
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            window.location.href = "/login.html";
          }
        }
      });
  };
  
  const sendEmail = async (to, subject, body) => {
    await axios
      .post(
        "http://localhost:3000/mail/send",
        { to: to, subject: subject, body: body },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          document.getElementById("forward_email").value = "";
          alert("email sent successfully");
        }
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 401) {
            window.location.href = "/login.html";
          }
          if (error.response.status === 500) {
            alert(
              "Error occured, try again in a few minutes",
              error.response.message
            );
          }
        }
      });
  };
  
  const submit_report = () => {
    const forward_to = document.getElementById("forward_email").value;
    const forward_body = document.getElementById("message_").value;
    const forward_subject = "Report case";
    sendEmail(forward_to, forward_subject, forward_body);
  };
  
  // When the user clicks on <span> (x), close the modal
  span.onclick = function () {
    modal.style.display = "none";
  };
  