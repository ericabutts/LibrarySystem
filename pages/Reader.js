import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { Document } from '../components/Document';
import axios from 'axios';

export function Reader() {
    const readerId = localStorage.getItem("readerId");
    const [currentDocuments, setCurrentDocuments] = useState([]);
    const [historyDocuments, setHistoryDocuments] = useState([]);
    const [searchDocuments, setSearchDocuments] = useState([]);
    const [searchParam, setSearchParam] = useState('');

    const getReaderData = async ()=>{
        
        try {
            axios.post('http://localhost:8001/readerCheckoutCurrentDocuments', {
                readerId: readerId
            }).then((response) => {
                if (response.data.message==='No results.') {
                    setCurrentDocuments([]);
                } else {
                    
                    setCurrentDocuments(response.data.message);
                }

            })
        } catch (error) {
            console.log(error);
        }
        try {
            axios.post('http://localhost:8001/readerCheckoutHistoryDocuments', {
                readerId: readerId
            }).then((response) => {
                if (response.data.message==='No results.') {
                    setHistoryDocuments([]);
                } else {
                    setHistoryDocuments(response.data.message);
                }

            })
        } catch (error) {
            console.log(error);
        }
      }


      useEffect(()=>{
        getReaderData();
    
      },[]);


    const readerSearchFunctionByTitle = () => {

        try {
            axios.post('http://localhost:8001/readerSearchDocument', {
                searchParam: searchParam
            }).then((response) => {
                console.log(response);
                console.log(response.data);
                console.log(response.data.message);
                if (response.data.message === "No results.") {
                    alert("No documents with that title available for checkout.")
                    setSearchDocuments([]);
                } else {
                    setSearchDocuments(response.data.message);
                }
            })
        } catch (error) {
            console.log(error);
        }
        
    }

    const readerSearchFunctionById = () => {

        try {
            axios.post('http://localhost:8001/readerSearchDocumentById', {
                searchParam: searchParam
            }).then((response) => {
                console.log(response);
                console.log(response.data);
                console.log(response.data.message);
                setSearchDocuments([]);
                // if (response.data.message === "No results.") {
                //     alert("No documents found.")
                //     setSearchDocuments([]);
                // } else {
                //     setSearchDocuments(response.data.message);
                // }
                
            })
        } catch (error) {
            console.log(error);
        }
        
    }

    const returnDocument = (documentId) => {
        var docId = documentId;
        
        try {
            axios.post('http://localhost:8001/returndocument', {
                documentId: docId,
                readerId: readerId
            }).then((response) => {
                console.log(response.data.message);
            })
        } catch (error) {
            console.log(error);
        }

        alert("You have returned the document");
        window.location.href = "http://localhost:3000/reader";
    }

    const checkoutDocument = (documentId) => {
        console.log("The document id is "+documentId);
        try {
            axios.post('http://localhost:8001/checkoutdocument', {
                documentId: documentId,
                readerId: readerId
            }).then((response) => {
                if (response.data.message==="Success.") {
                    alert("You have checked out the document ");
                } 
                if (response.data.message==="Failed.") {
                    alert("It failed.");
                }
            })
        } catch (error) {
            console.log(error);
        }
        window.location.href = "http://localhost:3000/reader";
    }

    return(
        <div>
            <Button href="/">Home</Button>    

            <Card>
                <Card.Body>
                    <Card.Title>Welcome to the Reader Menu.</Card.Title>
                    <Card.Text>
                        <input id="searchBox" onChange={(e) => {setSearchParam(e.target.value)}}></input> <Button onClick={readerSearchFunctionByTitle}>Search By Title/Publisher</Button> 
                        <Button onClick={readerSearchFunctionById}>Search By ID</Button> 
                        <br/>       

                    </Card.Text>
                </Card.Body>
            </Card>
            <CardGroup>
                Search results:
                {searchDocuments.map((document) => (
            <div>
                <Card>
                    <Card.Title>{document.DOCUMENTTITLE}</Card.Title>
                    {document.CHECKOUTDATE}
                </Card>
                <Button onClick={() => {checkoutDocument(document.DOCUMENTID)}}>Checkout Document</Button>
                </div>
        ))}

            </CardGroup>
            <br/>
            <br/>
            <br/>

            <CardGroup>
                Your currently checked out documents:
        {

        currentDocuments.map((document) => (
            <div>
                <Card>
                    <Card.Title>{document.DOCUMENTTITLE}</Card.Title>
                    <Card.Text>Checkout Date: {document.CHECKOUTDATE}</Card.Text>
                    <Card.Text>Synopsis: {document.SYNOPSIS}</Card.Text>
                    <Card.Text>Genre: {document.GENRE}</Card.Text>
                    
                    
                </Card>
                <Button onClick={() => returnDocument(document.DOCUMENTID)}>Return Document</Button>
                <br>
                </br>
                <br></br>
                </div>
        ))
        
        }
            </CardGroup>
            <CardGroup>
            <br></br>
            <br></br>
            <br></br>
                Your checkout history:
                <br></br>
        {

        historyDocuments.map((document) => (
            <div>
                <Card>
                    <Card.Title>{document.DOCUMENTTITLE}</Card.Title>
                    <Card.Text>Checkout Date: {document.CHECKOUTDATE}</Card.Text>
                    <Card.Text>Return Date: {document.RETURNDATE}</Card.Text>
                    <Card.Text>Synopsis: {document.SYNOPSIS}</Card.Text>
                    <Card.Text>Genre: {document.GENRE}</Card.Text>
                     
                </Card>

                </div>
        ))
        
        }
            </CardGroup>
            
        </div>
        
    )
}