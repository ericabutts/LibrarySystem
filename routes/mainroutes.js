const router = require('express').Router();
const path = require('path');
const port = 8002;
const mysql = require('mysql');
const axios = require('axios');
const e = require('express');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'overalls',
    database: 'LIBRARY631'
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("Database connected!");
});


router.post('/document', (req, res) => {
    //  SEARCH FOR SPECIFIC DOCUMENTS
    var searchParam = req.body.searchParam;
    var searchResults = [];


    connection.query(`SELECT DOCUMENTTITLE, D.DOCUMENTID FROM BORROWS B, DOCUMENTS D WHERE D.DOCUMENTID=B.DOCUMENTID AND RETURNDATE IS NOT NULL AND DOCUMENTTITLE="${searchParam}"`, (error, results, fields) => {
        if(error){
            throw error;
        }
        if(results.length>0){
            results.forEach((result) => {
                searchResults.push(result);
            })
        }
        res.status(200).json({message:searchResults})
        
    })

});

router.get('/documents', (req, res) => {
    // GET ALL AVAILABLE UNRESERVED DOCUMENTS
    var documents = [];
    connection.query(`SELECT * FROM BORROWS B, DOCUMENTS D WHERE D.DOCUMENTID=B.DOCUMENTID AND RETURNDATE IS NOT NULL;`, (error, results, fields) => {
        if(error){
            throw error;
        }
        if(results.length>0){
            results.forEach((result) => {
                documents.push(result);
            })
            res.status(200).json({message: `Here are the details for document: ${documents}`})

        } else{
            res.status(200).json({message: `There's no info on that document.`})

        }
    })
});

router.post('/document', (req, res) => {
    //  CREATE A NEW DOCUMENT
    connection.query(`INSERT INTO DOCUMENTS (DOCUMENTTITLE) VALUES ("${req.body.documentName}");`, (error, results, fields) => {
        if(error){
            throw error;
        }
        res.status(200).json({message: `You created a new document called: ${req.body.documentName}`})

    })

});

router.post('/checkoutdocument', (req, res) => {
    // CHECKOUT A DOCUMENT
    var documentId = req.body.documentId;
    var readerId = req.body.readerId;
    var today = new Date();
    today = today.toISOString().split('T')[0];

    connection.query(`INSERT INTO BORROWS (READERID, DOCUMENTID, CHECKOUTDATE) VALUES (${readerId}, ${documentId}, "${today}");`, (error, results, fields) => {
        if(error){
            throw error;
        }
        if (results.length>0) {
            console.log(results[0]);
        }
        res.status(200).json({message: "You checked out the document."})
    });

});

router.post('/returndocument', (req, res) => {
    // RETURN A DOCUMENT
    var readerId = req.body.readerId;
    var documentId = req.body.documentId;
    var today = new Date();
    today = today.toISOString().split('T')[0];

    connection.query(`SELECT B.BORROWID, B.CHECKOUTDATE, D.DOCUMENTID FROM DOCUMENTS D, BORROWS B WHERE D.DOCUMENTID=B.DOCUMENTID AND D.DOCUMENTID=${documentId} AND B.READERID=${readerId} AND RETURNDATE IS NULL;`, (error, results, fields) => {
        if(error){
            throw error;
        }
        if (results.length>0) {
            console.log(results[0].BORROWID);
            var checkoutDate = new Date(results[0].CHECKOUTDATE);
            checkoutDate = checkoutDate.toISOString().split('T')[0];
            console.log(checkoutDate);

            connection.query(`UPDATE BORROWS SET RETURNDATE="${today}", CHECKOUTDAYS="5" WHERE BORROWID=${results[0].BORROWID};`, (error, results, fields) => {
                if(error){
                    throw error;
                }
                if (results.length>0) {
                    console.log(results);
                }

                res.status(200).json({message:"The document was returned."});     
            })
            
        } else {
            res.status(200).json({message:"The reader didn't borrow that."});
        }
    })

});

router.delete('/document/:id', (req, res) => {
    var id = req.params.id;
    res.status(200).json({message: `You deleted document: ${id}`})

});

router.post('/readerexists', (req, res) => {
    var readerId = req.body.readerId;
    connection.query(`SELECT * FROM READERS WHERE READERID=${readerId};`, (error, results, fields) => {
        if(error){
            throw error;
        }
        if(results.length>0){

            res.status(200).json({message: results[0]})

        } else{
            res.status(200).json({message: `This reader does not exist.`})

        }
    })
})

router.post('/reader', (req, res) => {
    //  GET ALL DOCUMENTS BORROWED BY READER
    var readerId = req.body.readerId;
    var documents = [];

    connection.query(`SELECT D.DOCUMENTID, D.DOCUMENTTITLE, B.CHECKOUTDATE, B.RETURNDATE FROM BORROWS B, DOCUMENTS D WHERE READERID=${readerId} AND B.DOCUMENTID=D.DOCUMENTID AND RETURNDATE IS NULL;`, (error, results, fields) => {
        if(error){
            throw error;
        }
        if(results.length>0){
            results.forEach((result) => {
                documents.push(result);
            })
            res.status(200).json({message: documents})

        } else{
            res.status(200).json({message: `The reader has never checked out anything.`})
        }
    });

});


router.post('/reader', (req, res) => {
    //CREATE A NEW READER
    res.status(200).json({message: "You created a new reader."})

});

router.put('/reader/:id', (req, res) => {
    var id = req.params.id;
    res.status(200).json({message: `You updated the reader: ${id}`})

});

router.delete('/reader/:id', (req, res) => {
    var id = req.params.id;
    res.status(200).json({message: `You deleted reader: ${id}`})

});


router.post('/administrator', (req, res) => {
    var adminUsername = req.body.adminUsername;
    var adminPassword = req.body.adminPassword;
    
    connection.query(`SELECT * FROM ADMINISTRATORS WHERE ADMINID=${adminUsername} AND PASSWORD=${adminPassword}`, (error, results, fields) => {
        if(error){
            throw error;
        }
        if (results.length>0) {
            res.status(200).json({message:results[0]})
        } else {
            res.status(200).json({message:"Login failed."})
        }
    })

});


router.put('/administrator/:id', (req, res) => {
    var id = req.params.id;
    res.status(200).json({message: `You updated the administrator: ${id}`})

});

router.delete('/administrator/:id', (req, res) => {
    var id = req.params.id;
    res.status(200).json({message: `You deleted administrator: ${id}`})

});



module.exports=router;