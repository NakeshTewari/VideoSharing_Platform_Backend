# Video Sharing Platform

## Overview:
The Video Sharing Platform is a web application that allows users to upload, delete, and manage video content. It provides secure user authentication, video metadata management, and a seamless experience for video viewing. This project demonstrates the core functionalities of video platforms, focusing on efficient backend architecture using Node.js and Express.

## Features:
Video Upload & Deletion: Upload large video files and delete them with secure authentication.User Authentication: JWT-based authentication for user accounts, ensuring secure access.video Metadata: Fetch detailed video metadata like upload time, file size, and more.Postman Integration: API endpoints are tested and demonstrated via Postman for seamless interaction.
File Upload Optimization: Implements chunked uploads for large videos, ensuring reliability and resumability.

## Technologies Used:
* Backend: Node.js, Express.js 
* Database: MongoDB
* Authentication: JWT for secure user access
* File Storage: Local file system (can be extended to cloud solutions)
* Testing: Postman for API testing
* Additional Tools: multer for file handling, bcrypt for password hashing

## Future Enhancements
1. Implement video encoding for different resolutions using FFmpeg.
2. Add analytics to track video views and user engagement.
3. Integrate search functionality to find videos by name, upload date, etc.
4. Deploy video content using a Content Delivery Network (CDN) for better performance.

## How to Run Locally
1. Clone the repository:  git clone https://github.com/NakeshTewari/VideoSharing_Platform.git
2. Install dependencies:  npm install
3. Create a .env file and configure the environment variables (e.g., database URI, JWT secret).

## API Endpoints
POST /upload: Upload a video.
DELETE /delete/:id: Delete a video by ID.
GET /metadata/:id: Fetch video metadata.
POST /auth/login: Authenticate users.
