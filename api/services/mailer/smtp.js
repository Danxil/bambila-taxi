var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport( {
    transport: "SMTP",
    host: "smtp.gmail.com",
    secureConnection: false,
    port: 587,
    requiresAuth: true,
    domains: ["gmail.com", "googlemail.com"],
    auth: {
        user: 'bambilla.club@gmail.com',
        pass: 'vtMBiibF8N67zFgG86fqGQYqrJZFQFrt'
    }
});

module.exports = {
    sendVerificatinCode: sendVerificatinCode
};

function sendVerificatinCode ( email, verificatinCode, callback ){
    var link = "http://bambilla.club/api/signup/verify/?code=" + verificatinCode;
    //var link = "http://localhost:1337/api/signup/verify/?code=" + verificatinCode;
    var html = '<b>Hello,<br> Please Click on the link to verify your email. <br>' +
        '<a href=' + link + '> Click here to verify </a></b>';
    var mailOptions = {
        from: '00000000000eger reg', // sender address
        to: email,         // list of receivers
        subject: ' bambilla.club',   // Subject line
        text: '2222222222222222',    // plaintext body
        html: html // html body
    };

    transporter.sendMail( mailOptions, function( err, info ){
        callback( err, info )
    });
}




