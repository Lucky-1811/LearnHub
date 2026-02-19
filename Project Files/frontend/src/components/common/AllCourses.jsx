import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "./AxiosInstance";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import CourseCard from "./CourseCard";
import demoCourses from "../../data/demoCourses";

const AllCourses = () => {
   const navigate = useNavigate()
   const user = useContext(UserContext)
   const [allCourses, setAllCourses] = useState([]);
   const [filterTitle, setFilterTitle] = useState('');
   const [filterType, setFilterType] = useState('');

   const [showModal, setShowModal] = useState(Array(allCourses.length).fill(false));
   const [cardDetails, setCardDetails] = useState({
      cardholdername: '',
      cardnumber: '',
      cvvcode: '',
      expmonthyear: '',
   })

   const handleChange = (e) => {
      setCardDetails({ ...cardDetails, [e.target.name]: e.target.value })
   }


   const handleShow = (courseIndex, coursePrice, courseId, courseTitle) => {
      if (coursePrice == 'free') {
         handleSubmit(courseId)
         return navigate(`/courseSection/${courseId}/${courseTitle}`)
      } else {

         const updatedShowModal = [...showModal];
         updatedShowModal[courseIndex] = true;
         setShowModal(updatedShowModal);
      }
   };

   // Function to handle closing the modal for a specific course
   const handleClose = (courseIndex) => {
      const updatedShowModal = [...showModal];
      updatedShowModal[courseIndex] = false;
      setShowModal(updatedShowModal);
   };

   const mapDemoCourse = (course) => ({
      _id: `demo-${course.id}`,
      C_title: course.title,
      C_educator: course.educator,
      C_categories: course.category,
      C_price: course.price,
      C_description: course.description,
      sections: [
         {
            S_title: "Overview",
            S_description: course.description,
            S_content: {
               filename: "demo.mp4",
               path: "/uploads/demo.mp4",
            },
         },
      ],
      enrolled: 0,
   });

   const getAllCoursesUser = async () => {
      try {
         const res = await axiosInstance.get(`api/user/getallcourses`, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
         });
         if (res.data.success) {
            const fetchedCourses = res.data.data || [];
            if (fetchedCourses.length === 0) {
               let storedDemoCourses = [];
               try {
                  storedDemoCourses = JSON.parse(localStorage.getItem("demoCourses")) || [];
               } catch (error) {
                  storedDemoCourses = [];
               }

               if (storedDemoCourses.length === 0) {
                  localStorage.setItem("demoCourses", JSON.stringify(demoCourses));
                  storedDemoCourses = demoCourses;
               }

               setAllCourses(storedDemoCourses.map(mapDemoCourse));
            } else {
               setAllCourses(fetchedCourses);
            }
         }
      } catch (error) {
         console.log('An error occurred:', error);
      }
   };

   useEffect(() => {
      getAllCoursesUser();
   }, []);

   const isPaidCourse = (course) => {
      // Check if C_price contains a number
      return /\d/.test(course.C_price);
   };

   const handleSubmit = async (courseId) => {
      try {
         const res = await axiosInstance.post(`api/user/enrolledcourse/${courseId}`, cardDetails, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
         })
         if (res.data.success) {
            alert(res.data.message);
            navigate(`/courseSection/${res.data.course.id}/${res.data.course.Title}`);
         } else {
            alert(res.data.message);
            navigate(`/courseSection/${res.data.course.id}/${res.data.course.Title}`);
         }
      } catch (error) {
         console.log('An error occurred:', error);
      }
   }

   return (
      <>
         <div className="filter-bar">
            <div className="filter-field">
               <label>Search</label>
               <input
                  type="text"
                  placeholder="Search by title"
                  value={filterTitle}
                  onChange={(e) => setFilterTitle(e.target.value)}
               />
            </div>
            <div className="filter-field">
               <label>Type</label>
               <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                  <option value="">All Courses</option>
                  <option value="Paid">Paid</option>
                  <option value="Free">Free</option>
               </select>
            </div>
         </div>
         <div className="course-grid">
            {allCourses?.length > 0 ? (
               allCourses
                  .filter(
                     (course) =>
                        filterTitle === '' ||
                        course.C_title?.toLowerCase().includes(filterTitle?.toLowerCase())
                  )
                  .filter((course) => {
                     if (filterType === 'Free') {
                        return !isPaidCourse(course);
                     } else if (filterType === 'Paid') {
                        return isPaidCourse(course);
                     } else {
                        return true;
                     }
                  })
                  .map((course, index) => (
                     <CourseCard
                        key={course._id}
                        course={course}
                        userLoggedIn={user.userLoggedIn === true}
                        showModal={showModal[index]}
                        onStartCourse={() => handleShow(index, course.C_price, course._id, course.C_title)}
                        onClose={() => handleClose(index)}
                        onSubmitPayment={(e) => {
                           e.preventDefault();
                           handleSubmit(course._id);
                        }}
                        cardDetails={cardDetails}
                        onCardChange={handleChange}
                     />
                  ))
            ) : (
               <p>No courses at the moment</p>
            )}
         </div>
      </>
   );
};

export default AllCourses;
