const fetchComments = () => {
    axios
      .get("http://localhost:3000/comments", {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((response) => {
        const comments = response.data;
        let html_ = "<tr>";
        Object.keys(comments).forEach(function (value, key) {
          html_ += "<tr>";
          html_ += "<td>" + (key + 1) + "</td>";
          html_ += "<td>" + comments[value].names + "</td>";
          html_ += "<td>" + comments[value].email + "</td>";
          html_ += "<td>" + comments[value].message.slice(0, 20) + "</td>";
          html_ +=
          "<td> <a type='button' style='cursor:pointer;' onclick='fetchComment(" +
          comments[value].id +
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
  
  const createComment = (comment) => {
    axios
      .post(`http://localhost:3000/comments`, comment)
      .then((response) => {
        const addedComments = response.data;
        console.log(`POST: comment added`, addedComments);
        // append to DOM
        // appendToDOM([addedReports]);
      })
      .catch((error) => console.error(error));
  };
  
  const deleteComment = (elem, id) => {
    axios
      .delete(`http://localhost:3000/comments/${id}`)
      .then((response) => {
        console.log(`DELETE: comment  removed`, id);
        // remove elem from DOM
        elem.remove();
      })
      .catch((error) => console.error(error));
  };
  
  const updateComment = (elem, id) => {
    axios
      .put("http://localhost:3000/comment/6/", {
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
  
  
  const fetchComment = async (id) => {
    await axios
      .get("http://localhost:3000/comments/" + id, {
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
    const forward_subject = "Comment";
    sendEmail(forward_to, forward_subject, forward_body);
  };