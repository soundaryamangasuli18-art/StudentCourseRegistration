const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));

let students = [];

let courses = [
    {
        id: 1,
        name: "Data Structures",
        code: "CS201",
        credits: 4
    },
    {
        id: 2,
        name: "Database Management System",
        code: "CS202",
        credits: 4
    },
    {
        id: 3,
        name: "Operating Systems",
        code: "CS203",
        credits: 3
    },
    {
        id: 4,
        name: "Artificial Intelligence",
        code: "AI201",
        credits: 4
    }
];

// Get courses
app.get("/api/courses", (req, res) => {
    res.json(courses);
});

// Register student
app.post("/api/register", (req, res) => {
    const { name, email, course } = req.body;

    if (!name || !email || !course) {
        return res.status(400).json({
            message: "Please fill all fields"
        });
    }

    const student = {
        id: students.length + 1,
        name,
        email,
        course
    };

    students.push(student);

    res.json({
        message: "Course registration successful!",
        student
    });
});

// Get registered students
app.get("/api/students", (req, res) => {
    res.json(students);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});