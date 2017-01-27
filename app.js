//Importing Express library
var express = require('express');

//Importing Mongoose library
var mongoose = require('mongoose');

//Importing student.js file residing in models
var Student = require('./student');
var bodyParser = require('body-parser');

//assigning to port 7000
var PORT = process.env.PORT || 7000;

var app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));


app.get('/index',function(req,res){
	res.sendFile(__dirname+"/public/"+"index.html")
})

//Enabling CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


var cert = "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tCk1JSURoVENDQW0yZ0F3SUJBZ0lFV0lkRFBqQU5CZ2txaGtpRzl3MEJBUTBGQURCRU1VSXdRQVlEVlFRREREbHoKWlhKMlpYSnNaWE56TXpJeE9FQm5iV0ZwYkM1amIyMHRaV1pqWWpka016YzFPV0V5TWpobFpqSXhPV1UzTnpZMApNRFpsTUdZMFlUY3dIaGNOTVRjd01USTBNVEl3TmpJeVdoY05NemN3TVRJME1USXdNREF3V2pCRU1VSXdRQVlEClZRUURERGx6WlhKMlpYSnNaWE56TXpJeE9FQm5iV0ZwYkM1amIyMHRaV1pqWWpka016YzFPV0V5TWpobFpqSXgKT1dVM056WTBNRFpsTUdZMFlUY3dnZ0VpTUEwR0NTcUdTSWIzRFFFQkFRVUFBNElCRHdBd2dnRUtBb0lCQVFEQwpJWTErTmNYRXp0c3J6WVBvMnUvcC9pMEpreFMwbjlETDNuNDhPdmFCNFIwV2NaYXJRVDVDSlYrWVdWMVFSMWlyCnNTbjZCMjhMY3lJR0xWaUJxMGpsU0pGRkZ1bDdVTmc0aW8wQ1dFMDdQaEl4MG90cm9ZSSt5WDBSM1JDdno4Nm8KTWlHRGhwUytnenRFdGU2Wjdkbk44bjkxMzhSR0srNlFnQXRUTVNNUVlmbWcxVlZwaHZMNkhGTFdNU3RLTnQ5UgpyNnhpWDhTOEM2RVh3UU9vdWViVHhGSU0rMFJZQWtOeHpJQlpiQ1hlbWZ3NjVDRTEySExuR0NISjhRUktJelpvCmVQL0FrMGQydU94bW9kUFN6U01EM2NwdzhDNTZZVEd3Y2NxK21PcTRvMUxUcUl3V21DUzZtWERJdTZFWGVZVSsKVW5SNEZvT2pQVTdabStQMkQxZzdBZ01CQUFHamZ6QjlNQjBHQTFVZERnUVdCQlFyaW5QSVFuekYwUmNUU2lOegpLYUxkaUxxWlVUQU9CZ05WSFE4QkFmOEVCQU1DQWdRd0hRWURWUjBsQkJZd0ZBWUlLd1lCQlFVSEF3RUdDQ3NHCkFRVUZCd01DTUF3R0ExVWRFd1FGTUFNQkFmOHdId1lEVlIwakJCZ3dGb0FVSzRwenlFSjh4ZEVYRTBvamN5bWkKM1lpNm1WRXdEUVlKS29aSWh2Y05BUUVOQlFBRGdnRUJBQ1RRckZ2cHhpV000VzQrd2ZFd2JUWGp0ZXl0a3JQeAprcnVoMmtoMHBURG1YV0E5SHByZW1rNzhtVlIyRWZFNXJBajdadC9iZDlZZGQ3elRtaEdUUFlPWFplVkJORUVLCkVTTVBudHNuRTczcTFRa21vZ2hDVHozTFJVdjdMNEt1blowaFVTUjh6bEVmdFJLT0hxZ04vR2JlSnhyQTJKS24KellnZE5HbmNoV2JBM1BpbGtrRkwyVU9BcmJQRjBOOVB2UHJhcTdUd2MzNlJRbVdmdzM1bjd6UG04UUpmdHdKdQpkYXlRWEhsc0FXK0I4QjNVMTFLbW9CRkhMWTlrRGZBMXl0czk4bGZaR0NKQTFPelB2cVFRLzZtZ0FMemJ2ZEw3Ck9IbHArQ1c1cGpnSFlFTlpvZVpHaHo5NmNOQlkvZjA0b0c3TG5CeFJ2LzN6bTNNcFdoZHUzcVE9Ci0tLS0tRU5EIENFUlRJRklDQVRFLS0tLS0K"
var ca = [new Buffer(cert, 'base64')];

var url = 'mongodb://admin:JSXOXSGFCPYGJNMR@sl-us-dal-9-portal.2.dblayer.com:18837,sl-us-dal-9-portal.0.dblayer.com:18837/admin?ssl=true';

var details ={
	mongos: {
            ssl: true,
            sslValidate: true,
           sslCA:ca,
		   poolSize: 1,
           reconnectTries: 1
}
}

//Connecting to the MongoDB database 'StudentDB' running on 27017
mongoose.connect(url,details);


//serving insert html page
app.get('/insertData',function(req,res){
  res.sendFile( __dirname + "/public/create.html" );
});

//serving delete html page
app.get('/deleteData',function(req,res){
  res.sendFile( __dirname + "/public/delete.html" );
});

//serving retrieve html page
app.get('/retrieveData',function(req,res){
  res.sendFile( __dirname + "/public/retrieve.html" );
});

//serving update html page
app.get('/updateData',function(req,res){
  res.sendFile( __dirname + "/public/update.html" );
});

//Retrieving the data from MongoDB 'StudentCollection'
app.get('/api/retrieve', function(req, res) {
    Student.getDetails(function(err, student) {
        if (student) {
           response = {
                "result": student
            }
            res.json(response);
        } else {
           error = {
                "error": "Sorry retrieve failed"
            }
            res.json(error);
        }
    });
});

//Retrieving the data based on ID from MongoDB Collection
app.get('/api/retrieveById', function(req, res) {
    var id = req.query.sEmail;
    Student.getStudentById(id, function(err, student) {
        if (student) {
         response = {
                "result": student
            }
            res.json(response);
        } else {
          error = {
                "error": "Please check entered ID"
            }
            res.json(error);
        }
    });
});

//Inserting the data into MongoDB Collection
app.post('/api/insert', function(req, res) {
console.log('jfdhj');
    var student = ({
        _id: req.body.sEmail,
        sName: req.body.sName,
        sEmail: req.body.sEmail,
        sPhoneNumber: req.body.sPhoneNumber,
        sAddress: req.body.sAddress,
        sDepartment: req.body.sDepartment
    });
    //Calls function in student.js model
    Student.addStudent(student, function(err, student) {
        if (student) {
           response = {
                "result": "Data inserted succesfully"
            }
            res.json(response);
        } else {
           error = {
                "error": "Sorry insertion failed"
            }
            res.json(error);
        }
    });
});

//Updating the data in MongoDB collection
app.post('/api/update', function(req, res) {
    var id = req.body.sEmail;
    var student = ({
        sName: req.body.sName,
        sPhoneNumber: req.body.sPhoneNumber,
        sAddress: req.body.sAddress,
        sDepartment: req.body.sDepartment
    });
    //Calls the function from student.js model
    Student.updateStudent(id, student, {}, function(err, student) {
        if (student) {
          response = {
                "result": "Student Details have been updated!"
            }
            res.json(response);
        } else {
          error = {
                "error": "Sorry update failed"
            }
            res.json(error);
        }
    });
});


//Deleting the data from MongoDB collection
app.post('/api/delete', function(req, res) {
    var id = req.body.sEmail;
    Student.removeStudent(id, function(err, student) {
        if (student.result.n != 0) {
            response = {
                "result": "Student Record has been deleted!"
            }
            res.json(response);
        } else {
            error = {
                "error": "Please check entered ID"
            }
            res.json(error);
        }
    });
});

app.listen(PORT);
console.log('Server is running on port ' + PORT);
