/**
 * Created by marcoazer on 15-09-10.
 */

/**
    Class Struct:
    {
        _id        : ID                 (INT Generated by MongoDB)
        name       : Class Name         (String)
        stdtNum    : Number of Students (INT)
        srvntNum   : Number of Servants (INT)
        grade      : Class Grade        (Char(2))
    }
 */

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;

var url = 'mongodb://localhost:27017/SundaySchool';

var insertStudent = function(db, std, callback){
    db.collection('student').insertOne(std, function(err, data){
        assert.equal(null, err);
        console.log('Data inserted properly');
        callback(data);
    });
};

MongoClient.connect(url, function(err, db){
    var std = {
        "fname" : "Marco",
        "lname" : "Azer",
        "age"   : 21
    };
    assert.equal(null, err);
    console.log("Connected to Database");
    insertStudent(db, std, function(){
        db.close();
    });
});