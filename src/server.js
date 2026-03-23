const dotenv = require("dotenv");
const path = require("path");
dotenv.config({path: path.resolve(__dirname, "..", ".env")}); //ele que conecta o .env no server

const express = require("express");

const app = express();
const PORT = process.env.PORT;

const publicPath = path.join(__dirname, "..", "public");
const pagesPath = path.join(publicPath, "pages");

app.listen(PORT, function(){
    console.log("Rodando!");
})

app.get("/", function(req, res){
    const filePath = path.join(pagesPath, "index.html");
    res.sendFile(filePath);
});

app.use("/assets", express.static(path.join(publicPath, "assets")));
