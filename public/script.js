const courseSelect = document.getElementById("course");
const courseTable = document.getElementById("courseTable");
const form = document.getElementById("registrationForm");
const message = document.getElementById("message");


// Load courses
fetch("/api/courses")
    .then(response => response.json())
    .then(courses => {

        courses.forEach(course => {

            const option = document.createElement("option");

            option.value = course.name;
            option.textContent =
                `${course.code} - ${course.name}`;

            courseSelect.appendChild(option);

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${course.code}</td>
                <td>${course.name}</td>
                <td>${course.credits}</td>
            `;

            courseTable.appendChild(row);
        });
    });


// Register student
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value
    };

    fetch("/api/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    })
    .then(response => response.json())
    .then(data => {

        message.textContent = data.message;

        if (data.student) {
            form.reset();
        }
    });
});