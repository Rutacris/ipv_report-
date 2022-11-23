const fetchContacts = () => {
    axios
      .get("http://localhost:3000/smscontact", {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => {
        const sms = response.data;
        let html_ = "<tr>";
        Object.keys(sms).forEach(function (value, key) {
          html_ += "<tr>";
          html_ += "<td>" + (key + 1) + "</td>";
          html_ += "<td>" + comments[value].names + "</td>";
          html_ += "<td>" + comments[value].phonenumber + "</td>";
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
  
  const createSms = (contact,user="") => {
    axios
      .post(`http://localhost:3000/smscontact${user === 'guest' ? '?guest=true':''}`, contact)
      .then((response) => {
        const addedContacts = response.data;
        console.log(`POST: SMS contact added`, addedContacts);
        // append to DOM
        // appendToDOM([addedReports]);
        alert("Thank you for subscribing!!");
      })
      .catch((error) => console.error(error));
  };
  const deleteContact = (elem, id) => {
    axios
      .delete(`http://localhost:3000/smscontact/${id}`)
      .then((response) => {
        console.log(`DELETE: sms contact  removed`, id);
        // remove elem from DOM
        elem.remove();
      })
      .catch((error) => console.error(error));
  };
  
  const updateContact = (elem, id) => {
    axios
      .put(`http://localhost:3000/smscontact/${id}`, {
        elem
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
  
  
  const fetchContact = async (id) => {
    await axios
      .get("http://localhost:3000/smscontact/" + id, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => {
        html_ = `<div class="row">
        <div class="col-25">
          <label for="names">Names</label>
        </div>
        <div class="col-75">
          <input type="text" id="fname" name="names" value=${response.data.names}>
        </div>
      </div>
      
      <div class="row">
      <div class="col-25">
        <label for="email">Email</label>
      </div>
      <div class="col-75">
        <input type="text" id="forward_email" name="lastname" value=${response.data.email}>
      </div>
    </div>
    
      <div class="row">
        <div class="col-25">
          <label for="message">Message</label>
        </div>
        <div class="col-75">
          <textarea id="subject" name="subject" placeholder="Write something.." style="height:200px" value=${response.data.message}>${response.data.message}</textarea>
        </div>
      </div>
     
      <div class="row">
      <div class="col-25">
      <label for="message">Reply</label>
    </div>
    <div class="col-75">
      <textarea id="message_" name="subject" placeholder="Write something.."></textarea>
    </div><input type="button" id="submit_btn" onclick="submit_report()" value="Reply">
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
  
 