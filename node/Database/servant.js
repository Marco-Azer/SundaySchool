/**
 * Created by marcoazer on 15-09-10.
 */

/**
    Servant Struct:
    {
        _id        : ID             (INT Generated by MongoDB)
        fname      : First Name     (String)*
        lname      : Last Name      (String)*
        mname      : Middle Name    (String)
        gender     : Gender    		(Char(1))*
        age        : Age            (INT)
        dob        : {              Date Of Birth  (Date)*
            "y" : year
            "m" : month
            "d" :day
        }
        phone      : Phone Number   (String)
        class      : {
            "name"
            "church"
            "grade"
        }
        atndc      : [{
            "y" : year
            "m" : month
            "d" : day
        }]
    }
*/

var collec = 'servant';
var assert = require('assert');
var ObjectID = require('mongodb').ObjectID;

module.exports = {

    /*****************Inserts**************/
    InsertServant : function(db, srvnt, callback){
    	db.collection(collec).insertOne(srvnt, function(err, data){
    		assert.equal(null, err);
    		console.log("Servant was inserted properly");
            //callback(data);
    	});
    },

    InsertServants : function(db, srvnts, callback){
    	db.collection(collec).insert(srvnts, function(err, data){
    		assert.equal(null, err);
    		console.log("Servants were inserted properly");
    		//callback(data);
    	});
    },

    InsertAttendance : function(db, srvnt, callback){
        db.collection(collec).updateOne(
            {
                "_id":ObjectID(srvnt._id)
            },
            {
                $push: {
                    "attendance": {
                        "day": srvnt.day,
                        "month": srvnt.month,
                        "year": srvnt.year
                    }
                }
            },
            function(err, data){
                assert.equal(null, err);
                console.log("Attendance date was inserted properly");
                //callback(data);
            }
        );
    },
    /*****************End Inserts**************/

    /*****************Setters**************/
    SetFname : function(db, srvnt, callback){
        db.collection(collec).updateOne(
            {
                "_id":ObjectID(srvnt._id)
            },
            {$set: {"fname": srvnt.fname}},
            function(err, data){
                assert.equal(null, err);
                console.log("First Name was set properly");
                //callback(data);
            });
    },

    SetLname : function(db, srvnt, callback){
        db.collection(collec).updateOne(
            {
                "_id":ObjectID(srvnt._id)
            },
            {$set: {"lname": srvnt.lname}},
            function(err, data){
                assert.equal(null, err);
                console.log("Last Name was set properly");
                //callback(data);
            });
    },

    SetMname : function(db, srvnt, callback){
        db.collection(collec).updateOne(
            {
                "_id":ObjectID(srvnt._id)
            },
            {$set: {"mname": srvnt.mname}},
            function(err, data){
                assert.equal(null, err);
                console.log("Middle Name was inserted properly");
                //callback(data);
            });
    },

    SetGender : function(db, srvnt, callback){
        db.collection(collec).updateOne(
            {
                "_id":ObjectID(srvnt._id)
            },
            {$set: {"gender": srvnt.gender}},
            function(err, data){
                assert.equal(null, err);
                console.log("Gender was set properly");
                //callback(data);
            });
    },

    SetAge : function(db, srvnt, callback){
        db.collection(collec).updateOne(
            {
                "_id":ObjectID(srvnt._id)
            },
            {$set: {"age": srvnt.age}},
            function(err, data){
                assert.equal(null, err);
                console.log("Age was set properly");
                //callback(data);
            });
    },

    SetDob : function(db, srvnt, callback){
        db.collection(collec).updateOne(
            {
                "_id":ObjectID(srvnt._id)
            },
            {
                $set: {
                    "dob.day": srvnt.day,
                    "dob.month": srvnt.month,
                    "dob.year": srvnt.year
                }
            },
            function(err, data){
                assert.equal(null, err);
                console.log("Day of birth was set properly");
                //callback(data);
            });
    },

    SetPhone : function(db, srvnt, callback){
        db.collection(collec).updateOne(
            {
                "_id":ObjectID(srvnt._id)
            },
            {$set: {"phone": srvnt.phone}},
            function(err, data){
                assert.equal(null, err);
                console.log("Phone was inserted properly");
                //callback(data);
            });
    },

    SetClass : function(db, srvnt, callback){
        db.collection(collec).updateOne(
            {
                "_id":ObjectID(srvnt._id)
            },
            {$set: {"curClassId": srvnt.curClassId}},
            function(err, data){
                assert.equal(null, err);
                console.log("Class was set properly");
                //callback(data);
            });
    },

    SetGrade : function(db, srvnt, callback){
        db.collection(collec).updateOne(
            {
                "_id":ObjectID(srvnt._id)
            },
            {$set: {"grade": srvnt.grade}},
            function(err, data){
                assert.equal(null, err);
                console.log("Grade was set properly");
                //callback(data);
            });
    },
    /*****************End Setters**************/

    /*****************Getters**************/

    // /srvnt?fname=value1&lname=value2&dob=value3
    GetServant : function(db, req){
        var cursor = db.collection(collec).find(req.query);

        return cursor;
    },

    // /srvntgndr?gender=value1
    GetServantByGender : function(db, req){
        var gender = req.param('gender');

        var cursor = db.collection(collec).find({
            "gender": gender
        }).sort({"fname": 1, "lname": 1});

        return cursor;
    },

    // /srvntbyclass
    GetServantByClass : function(db, req){
        var cid = req.param('cid');

        var cursor = db.collection(collec).find({
            "curClassId": cid
        }).sort({"fname": 1, "lname": 1});

        return cursor;
    },

    GetServantByGrade : function(db, req){
        var grade = req.param('grade');

        var cursor = db.collection(collec).find({
            "grade": grade
        }).sort({"fname": 1, "lname": 1});

        return cursor;
    },

    GetServantByAge : function(db, req){
        var age = req.param('age');

        var cursor = db.collection(collec).find({
            "age": age
        }).sort({"fname": 1, "lname": 1});

        return cursor;
    },

    GetServantByAttendance : function(db, req){
        var year = req.param('year');
        var month = req.param('month');
        var day = req.param('day');

        var cursor;

        if(day === undefined){
            cursor = db.collection(collec).find({
                "attendance.year": year,
                "attendance.month": month,
                "attendance.day": day
            });
        }
        else if(month === undefined){
            cursor = db.collection(collec).find({
                "attendance.year": year,
                "attendance.month": month
            });
        }
        else{
            cursor = db.collection(collec).find({
                "attendance.year": year
            });
        }

        cursor.sort({"fname": 1, "lname": 1});

        return cursor;
    },
    /*****************End Getters**************/

    /*****************Start Removes**************/
    RemoveServant : function(db, srvnt, callback){
        db.collection(collec).deleteOne({
            "_id": ObjectID(srvnt._id)
            },
            function(err, data){
                assert.equal(null, err);
                console.log("Servant was removed properly");
                //callback(data);
            }
        );
    }
    /*****************End Removes**************/
}