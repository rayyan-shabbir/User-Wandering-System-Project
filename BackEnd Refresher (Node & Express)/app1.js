// *** NODE ***

// => FS Module
// const fs = require('fs')

// const userName = "Rayan";

// console.log(userName);

// fs.writeFile('user-data.txt', 'Name: ' + userName, (error) => {
//     if(error) {
//         console.log(error);
//         return;
//     }

//     console.log("WROTE FILE");
// })



// *********************************



// => HTTP Module (Creating Web Server)
const http = require('http');

const server = http.createServer((req, res)=> {
    console.log("INCOMING REQUEST");
    console.log(req.method, req.url); 

    if(req.method === 'POST') {
        let body = '';

        req.on('end', ()=> {
            const userName = body.split("=")[1];
            res.end('<h1>' + userName + '</h1>');
        });

        req.on('data', (chunk)=> {
            body += chunk;
        });

    } else {
        // res.end("<h1> Success! </h1>");

        res.setHeader("Content-Type", "text/html");

        res.end('<form method="POST"> <input type="text" name="username"> <button type="submit"> Create User </button> </form>')
    }

})

server.listen(5000);



// ********************************



// *** USING EXPRESS ***

const express = require('express')

const app = express()

app.use((req, res, next)=> {
    console.log("MIDLEWARE");
    let body = '';

    req.on('end', () => {
        const userName = body.split("=")[1];

        if(userName) {
            req.body = { name: userName };
        }

        next();
    })

    req.on('data', (chunk)=> {
        body += chunk;
    });
})

app.use((req, res, next)=> {
    if(req.body) {
        return res.send("<h1>User: " + req.body.name + "</h1>");
    }

    res.send('<form method="POST"> <input type="text" name="username"> <button type="submit"> Create User </button> </form>')
})

app.listen(5000);

