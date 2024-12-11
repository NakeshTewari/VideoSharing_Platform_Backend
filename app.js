import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import http from "http";

import { Server } from "socket.io";
import userRoutes from "./routes/userRoutes.js";
import videoRoutes from "./routes/video.Routes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import { log, timeStamp } from "console";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json());

app.use(express.static("public"));
app.use(cookieParser());

app.use("/userauth/api", userRoutes);
app.use("/video/api", videoRoutes);
app.use("/subscription/api", subscriptionRoutes);


const httpserver= http.createServer(app);

const io=new Server(httpserver ,{
  origin: "http://localhost:3000",
  methods:["GET","POST"],
  credentials:true,
});

io.on("connect", (socket)=>{
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("join-video", ({videoId, userId})=>{
    socket.join(videoId);
    console.log(`${userId} joined ${videoId} room`);
  });

  socket.on("send-comment", ({videoId, userId, content})=>{
    const newComment= {videoId,userId, content, timeStamp:new Date()};
   


    io.to(videoId).emit("receive-comment", newComment);

    console.log( JSON.stringify(`${newComment} under event`));
  })

  // socket.on("chat_message", (data)=>{
  //   console.log(data, socket.id);
  //   io.sockets.emit('newComment', data);
  // })  

  socket.on('disconnect', ()=>{
    console.log(socket.id + " User disconnected");
  })

})

export { httpserver};
