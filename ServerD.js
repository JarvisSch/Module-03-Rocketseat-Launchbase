const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const courses = require("./datad")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express:server
})

server.get("/", function(req, res ) {
    return res.render("aboutd")
})

server.get("/courses", function(req, res ) {
    return res.render("courses" , {items: courses})
})

server.get("/about", function(req, res ) {
    return res.render("rocketseat")
})

server.get("/courses", function(req, res ) {
    return res.render("courses")
})

server.get("/courses/:id" , function(req , res){
    const id = req.params.id;
   
    const course = courses.find(function(course){
        return course.id == id
    })

    if(!course) {
        return res.send("Course not found!")
    }
     return res.render("courses", {item: course})
})

server.use(function(req, res) {
    res.status(404).render("not-found")
})

server.listen(5000, function() {
    console.log("Server is running")
})