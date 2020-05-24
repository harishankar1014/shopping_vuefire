var nodemailer = require('nodemailer');
// import firebase from 'firebase'

exports.test = (req, res) => {
    res.status(200).send("testing comment");
    console.log('its in');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'parameshwari.it16@bitsathy.ac.in',
          pass: 'paramu*15'
        }
      });
      var mailOptions = {
        from: 'parameshwari.it16@bitsathy.ac.in',
        to: req.body.email,
        subject: 'item required',
        text: req.body.item,
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  };


exports.email = (req, res) =>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'parameshwari.it16@bitsathy.ac.in',
          pass: 'paramu*15'
        }
      });
    var mailOptions = {
        from: 'parameshwari.it16@bitsathy.ac.in',
        to: 'harishankar1014@gmail.com',
        subject: 'Change Password',
        text: 'this is a test',
      };
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.status(200).send("testing comment");
}