document.querySelector(".inquiry-form").addEventListener("submit", e => {
  e.preventDefault();
  let inquiries = JSON.parse(localStorage.getItem("inquiries")) || [];
  inquiries.push({
    name: name.value,
    email: email.value,
    subject: subject.value,
    message: message.value
  });
  localStorage.setItem("inquiries", JSON.stringify(inquiries));
  alert("Inquiry submitted successfully");
  e.target.reset();
});
