import express from "express";
/*
Config view engine for node app
*/

let configViewEngine = (app) => {
    app.use(express.static("./src/public"));
    app.set("view egine", "ejs");
    app.set("views", "./src/views");

};

module.exports = configViewEngine;