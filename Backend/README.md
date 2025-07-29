📁 ZigTask API (Backend - NestJS)

📌 Project Overview

ZigTask API là hệ thống quản lý công việc với xác thực người dùng dựa trên JWT. API hỗ trợ các chức năng CRUD cho task, có xác thực, phân quyền, validation bằng class-validator và tài liệu API bằng Swagger.

🚀 Setup & Run Instructions

1. Clone repo

git clone https://github.com/hangduchuy/zigvy-interview-homework.git
cd zigvy-interview-homework
cd Backend

2. Cài đặt dependencies

npm install

3. Cấu hình .env

MONGODB_URI=mongodb+srv://admin:admin@cluster0.mrxtjwf.mongodb.net/zigtask?retryWrites=true&w=majority
JWT_SECRET=hangduchuy
JWT_ACCESS_TOKEN_EXPIRED=1d
PORT=3000
FRONTEND_URL=http://localhost:5173

4. Khởi chạy dev

npm run start:dev

⚖️ Decisions & Trade-offs

Dùng MongoDB + Mongoose cho tính linh hoạt schema và tốc độ phát triển nhanh.

Dùng class-validator để đảm bảo dữ liệu đầu vào đúng chuẩn.

Dùng JWT để hỗ trợ xác thực đơn giản, dễ mở rộng.

📘 Swagger / API Docs

Truy cập: http://localhost:3000/docs

📸 Screenshots

![alt text](Swagger.png)
