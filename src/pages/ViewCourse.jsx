// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { Outlet, useParams } from 'react-router-dom';
// import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
// import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
// import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
// import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';

// const ViewCourse = () => {

//     const [reviewModal, setReviewModal] = useState(false);
//     const {courseId} = useParams();
//     const {token} = useSelector((state)=>state.auth);
//     const dispatch = useDispatch();

//     useEffect(()=> {
//         const setCourseSpecificDetails = async() => {
//               const courseData = await getFullDetailsOfCourse(courseId, token);
//               dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
//               dispatch(setEntireCourseData(courseData.courseDetails));
//               dispatch(setCompletedLectures(courseData.completedVideos));
//               let lectures = 0;
//               console.log("courseData",courseData);
//               courseData?.courseDetails?.courseContent?.forEach((sec) => {
//                 lectures += sec.subSection.length
//               })  
//               dispatch(setTotalNoOfLectures(lectures));
//         }
//         setCourseSpecificDetails();
//     },[]);


//   return (
//     <>
//         <div className='flex w-full gap-2 mt-2'>
//             <VideoDetailsSidebar  setReviewModal={setReviewModal} />
//             <div className='w-[70%] text-white mx-auto'>
//                 <Outlet />
//             </div>
//             {reviewModal && (<CourseReviewModal setReviewModal={setReviewModal} />)}
//         </div>
        
//     </>
//   )
// }

// export default ViewCourse


import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';

const ViewCourse = () => {

    const [reviewModal, setReviewModal] = useState(false);
    const { courseId } = useParams();
    const { token } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        const setCourseSpecificDetails = async () => {
            try {
                const courseData = await getFullDetailsOfCourse(courseId, token);
                dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
                dispatch(setEntireCourseData(courseData.courseDetails));
                dispatch(setCompletedLectures(courseData.completedVideos));
                let lectures = 0;
                console.log("courseData", courseData);
                courseData?.courseDetails?.courseContent?.forEach((sec) => {
                    lectures += sec.subSection.length;
                });
                dispatch(setTotalNoOfLectures(lectures));
            } catch (error) {
                console.error("Failed to fetch course details", error);
            }
        };
        setCourseSpecificDetails();
    }, [courseId, token, dispatch]); // Include dependencies here

    return (
        <>
            <div className='flex w-full gap-2 mt-2'>
                <VideoDetailsSidebar setReviewModal={setReviewModal} />
                <div className='w-[70%] text-white mx-auto'>
                    <Outlet />
                </div>
                {reviewModal && (<CourseReviewModal setReviewModal={setReviewModal} />)}
            </div>
        </>
    );
}

export default ViewCourse;
