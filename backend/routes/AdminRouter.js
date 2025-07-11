const express = require('express');
const router = express.Router();
const { body, check, validationResult } = require("express-validator");
const HandleErrorMessage = require('../middlewares/HandleErrorMessage');
const AdminController = require('../controllers/AdminController');
const { upload } = require('../Helpers/UploadFile');
const { requireAuth, requireRole } = require('../middlewares/AuthMiddleware');
const LectureController = require('../controllers/LectureController');
const multer = require('multer');
const path = require('path');

router.use(requireAuth, requireRole('admin'));

router.get('/dashboard-stats', AdminController.getDashboardStats);

router.post('/create-new-category', [
    body('name').notEmpty().withMessage('Category name is required'),
    HandleErrorMessage
], AdminController.createNewCategory);

router.get('/get-all-categories', AdminController.getAllCategories);

router.post('/create-new-course', [
    body('name').notEmpty().withMessage('Course name is required'),
    body('description').notEmpty().withMessage('Course description is required'),
    body('price').notEmpty().isNumeric().withMessage('Price must be a number'),
    body('instructor').notEmpty().withMessage('Instructor is required'),
    body('level').notEmpty().withMessage('Course level is required'),
    body('category').notEmpty().withMessage('Course category is required'),
    HandleErrorMessage
], AdminController.createNewCourse);

// New file upload endpoint - accepts both image and video files
router.post('/upload-course-file', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'intro_video', maxCount: 1 }
]),
    body('image').custom((value, { req }) => {
        if (!req.files || !req.files.image) {
            throw new Error('Image file is required');
        }
        if (!req.files.image[0].mimetype.startsWith('image/')) {
            throw new Error('Invalid image file type');
        }
        if (!req.files.intro_video) {
            throw new Error('Video file is required');
        }
        if (!req.files.intro_video[0].mimetype.startsWith('video/')) {
            throw new Error('Invalid video file type');
        }
        return true;
    }),
    AdminController.uploadCourseFile);

router.get('/get-all-courses', AdminController.getAllCourses);

router.get('/get-course-by-id/:courseId', AdminController.getCourseById);

// Add this new route for file deletion
router.post('/delete-course-files', AdminController.deleteCourseFiles);

// Set up multer for video uploads
const videoStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/courses/lectures'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const LectureVideoUpload = multer({ storage: videoStorage });

const userStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/users'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const userProfileUpload = multer({ storage: userStorage });

router.put('/update-profile', userProfileUpload.single('profile_image'), [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    HandleErrorMessage
], AdminController.updateProfile);


// Lecture routes
router.get('/courses/:courseId/lectures', LectureController.getLecturesByCourse);

router.post('/courses/:courseId/lectures', HandleErrorMessage, LectureController.addLecture);

router.post('/courses/:courseId/lectures/upload-video', HandleErrorMessage, LectureVideoUpload.single('video_url'), LectureController.uploadVideo);

router.put('/lectures/reorder', LectureController.reorderLectures);

router.delete('/lectures/:lectureId', LectureController.deleteLecture);

router.put('/lectures/:lectureId/hidden', LectureController.toggleLectureHidden);

router.get('/courses/:courseId/lectures/:lectureId', LectureController.getLectureById);

router.put('/courses/:courseId/lectures/:lectureId', LectureController.updateLectureById);

router.put('/update-course/:courseId', upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'intro_video', maxCount: 1 }
]), [
    check('courseId').isMongoId().withMessage('Invalid course ID'),
    body('name').notEmpty().withMessage('Course name is required'),
    body('description').notEmpty().withMessage('Course description is required'),
    body('price').notEmpty().isNumeric().withMessage('Price must be a number'),
    body('level').notEmpty().withMessage('Course level is required'),
    body('category').notEmpty().withMessage('Course category is required'),
    HandleErrorMessage
], AdminController.updateCourse);

router.delete('/delete-course/:courseId', [
    check('courseId').isMongoId().withMessage('Invalid course ID'),
    HandleErrorMessage
], AdminController.deleteCourse);


module.exports = router;
