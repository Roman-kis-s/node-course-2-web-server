const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();


app.set('view engine', hbs);

hbs.registerPartials(__dirname + '/views/partials');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
       if (err){
           console.log('Unable to append to server.log.');
       }
    });
   next();
});

// app.use((req, res, next) => {
//    res.render('maintenance.hbs');
//
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('capitalizeText', (text) => text.toUpperCase());

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Welcome home',
        pageText : 'You need to login'
    });
});
app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About'
    });
});
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});