const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));



app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFileSync('server.log', log + '\n');
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenence.hbs');
// });
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamit', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        user: 'Shailesh',
        pageTitle: 'Home Page',
    });
});




app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/project', (req, res) => {
    res.render('project.hbs', {
        pageTitle: 'Project Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error Message'
    })
});
app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});