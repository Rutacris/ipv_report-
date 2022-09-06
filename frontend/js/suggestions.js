const fetchSuggestions = (user = "") => {
  axios
    .get(
      `http://localhost:3000/suggestions${
        user === "guest" ? "?guest=true" : ""
      }`,
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    )
    .then((response) => {
      const suggestions = response.data;
      let html_ = "<tr>";
      Object.keys(suggestions).forEach(function (value, key) {
        html_ += "<tr>";
        html_ += "<td>" + (key + 1) + "</td>";
        html_ += "<td>" + suggestions[value].names + "</td>";
        html_ += "<td>" + suggestions[value].email + "</td>";
        html_ += "<td>" + suggestions[value].subject + "</td>";
        html_ +=
          "<td> <a type='button' style='cursor:pointer;' onclick='fetchSuggestion(" +
          suggestions[value].id +
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

const createSuggestion = (suggestion,user = "") => {
  axios
    .post(`http://localhost:3000/suggestions${user === 'guest' ? '?guest=true':''}`, suggestion)
    .then((response) => {
      const addedSuggestions = response.data;
      console.log(`POST: suggestion is added`, addedSuggestions);
      // append to DOM
      // appendToDOM([addedReports]);
    })
    .catch((error) => console.error(error));
};

const deleteSuggestion = (elem, id) => {
  axios
    .delete(`http://localhost:3000/suggestions/${id}`)
    .then((response) => {
      console.log(`DELETE: suggestion is removed`, id);
      // remove elem from DOM
      elem.remove();
    })
    .catch((error) => console.error(error));
};

const updateSuggestion = (elem, id) => {
  axios
    .put(`http://localhost:3000/suggestions/${id}/`, { elem })
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

const fetchSuggestion = (id) => {
  axios
    .get("http://localhost:3000/suggestions/" + id, {
      headers: { Authorization: `Bearer ${getToken()}` },
    })
    .then((response) => {
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
          <label for="email">Email</label>
        </div>
        <div class="col-75">
          <input type="text" id="forward_email" name="forward_email" value=${response.data.email}>
        </div>
      </div>
      <div class="row">
      <div class="col-25">
        <label for="email">Subject</label>
      </div>
      <div class="col-75">
        <input type="text" id="subject_" name="forward_subject" value=${response.data.subject}>
      </div>
    </div>
      
        <div class="row">
          <div class="col-25">
            <label for="message">Message</label>
          </div>
          <div class="col-75">
            <textarea id="subject" name="subject" style="height:120px" value=${response.data.message}>${response.data.message}</textarea>
          </div>
        </div>
       
        <div class="row">
        <div class="col-25">
        <label for="message">Reply</label>
      </div>
      <div class="col-75">
        <textarea id="message_" name="message_" placeholder="Write something.."></textarea>
      </div><input type="button"  id="submit_btn" onclick="submit_report()"  value="Reply">
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
        document.getElementById("message_").value = "";
        alert("Email sent successfully");
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
  const forward_subject = document.getElementById("subject_").value;
  sendEmail(forward_to, forward_subject, forward_body);
};
