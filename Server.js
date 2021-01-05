const express = require("express")
const nunjucks = require("nunjucks")

const server = express()
const videos = require("./data")

server.use(express.static("public"))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express : server,
    autoescape : false,
    noCache: true
})

server.get("/about", function (req, res) {
    const about={
        avatar_url:'https://avatars2.githubusercontent.com/u/58054480?s=400&u=20933428bcfda4a0517fac491dfdc8e6acb05a31&v=4',
        name:'Jean Carlos',
        role:'Aluno LaunchBase',
        description:'Supervisor de Pré-Impressão na <a href="http://www.smartprintbureau.com.br" target="_blank">SmartPrint</a',
        links:[
            { name: "Github", url: 'https://www.github.com/JeanCSch/'},
            { name: "Twitter", url: 'https://twitter.com/Jean_Sch16'},
            { name: "Instagram", url: 'https://www.Instagram.com/jean.scheimann/'},
            { name: "LinkedIn", url: 'https://www.linkedin.com/in/jean-carlos-scheimann-ab56031a5/'}
        ]
    }

    return res.render("about", { about } )
})

server.get("/portfolio", function (req, res) {
    return res.render("portfolio", {items: videos})
})

server.get("/video", function (req, res) {
    const id = req.query.id

    const video = videos.find(function(video) {
        return video.id == id
    })

    if (!video) {
        return res.send('Video Not Found')
    }

    return res.render("video", { item: video })
})

server.listen(5000, function () {
    console.log('server is running')
})
