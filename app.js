import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import http from "http";

import { Server } from "socket.io";
import userRoutes from "./routes/userRoutes.js";
import videoRoutes from "./routes/video.Routes.js";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import commentRoutes from "./routes/comment.Routes.js";

import { log, timeStamp } from "console";

import { CommentModel } from "./models/comment.model.js";

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
app.use("/comment/api", commentRoutes);

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
    console.log(`${userId} joined ${videoId} room `);
  });


  socket.on("send-comment", async ({videoId, userId, content, fullName})=>{
    const newComment= {videoId,userId, content,fullName, timeStamp:new Date()};
   
    io.to(videoId).emit("receive-comment", newComment);

    console.log( JSON.stringify(newComment));


    const comment= await CommentModel.create({
      videoId:videoId,
      userId:userId,
      text:content
    });

    console.log(comment);

    
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
