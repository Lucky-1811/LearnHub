const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const DBConnection = require('./config/connect')
const path = require("path");
const fs = require('fs')
const userSchema = require('./schemas/userModel')
const courseSchema = require('./schemas/courseModel')
const demoCourses = require('./data/demoCourses')

const app = express()
dotenv.config()

//////connection of DB/////////
DBConnection()

const PORT = process.env.PORT 


//////middleware/////////
app.use(express.json())
app.use(cors())

const uploadsDir = path.join(__dirname, "uploads");

// Create uploads folder if it doesn’t exist
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


///ROUTES///
app.use('/api/admin', require('./routers/adminRoutes'))
app.use('/api/user', require('./routers/userRoutes'))

const seedDemoData = async () => {
  try {
    const demoEmail = "Teacher@gmail.com";
    let teacher = await userSchema.findOne({ email: demoEmail });

    if (!teacher) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash("123456", salt);
      teacher = await userSchema.create({
        name: "Teacher",
        email: demoEmail,
        password: hashedPassword,
        type: "Teacher",
      });
    }

    const courseCount = await courseSchema.countDocuments();
    if (courseCount === 0) {
      const demoSection = {
        S_title: "Introduction",
        S_description: "Overview of the course goals and learning outcomes.",
        S_content: {
          filename: "demo.mp4",
          path: "/uploads/demo.mp4",
        },
      };

      const coursesToInsert = demoCourses.map((course) => ({
        userId: teacher._id.toString(),
        C_educator: course.educator,
        C_title: course.title,
        C_categories: course.category,
        C_price: course.price,
        C_description: course.description,
        sections: [demoSection],
      }));

      await courseSchema.insertMany(coursesToInsert);
    }
  } catch (error) {
    console.error("Demo seed failed:", error.message);
  }
};

mongoose.connection.once("open", () => {
  seedDemoData();
});

app.listen(PORT, () => console.log(`running on ${PORT}`))