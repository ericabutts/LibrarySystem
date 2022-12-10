import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { Document } from '../components/Document';
import axios from 'axios';

export function Reader() {
    const readerId = localStorage.getItem("readerId");
    const [documents, setDocuments] = useState([]);
    const [searchDocuments, setSearchDocuments] = useState([]);
    const [searchParam, setSearchParam] = useState('');

    const getReaderData = async ()=>{
        console.log('Getting reader data.......... for Reader '+readerId);
        try {
            axios.post('http://localhost:8001/reader', {
                readerId: readerId
            }).then((response) => {
                if (response.data.message==='The reader has never checked out anything.') {
                    setDocuments([]);
                } else {
                    console.log(response.data.message)
                    setDocuments(response.data.message);
                }

            })
        } catch (error) {
            console.log(error);
        }
      }


      useEffect(()=>{
        getReaderData();
    
      },[]);


    const searchFunction = () => {
        console.log("Here is your search value.");
        console.log(searchParam);
        console.log('Getting search data.......... '+searchParam);
        try {
            axios.post('http://localhost:8001/document', {
                searchParam: searchParam
            }).then((response) => {
                console.log(typeof response.data.message);
                if (Object.keys(response.data.message).length === 0) {
                    alert("No documents found.")
                }
                setSearchDocuments(response.data.message);
            })
        } catch (error) {
            console.log(error);
        }
        
    }

    const returnDocument = (documentId) => {
        var docId = documentId;
        console.log("The document id is "+documentId);
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
                console.log(response.data.message);
            })
        } catch (error) {
            console.log(error);
        }

        alert("You have checked out the document ");
        window.location.href = "http://localhost:3000/reader";
    }

    return(
        <div>
            <Button href="/">Home</Button>    <Button href="/administrator">Administrator Menu</Button>

            <Card>
                <Card.Body>
                    <Card.Title>Welcome to the Reader Menu.</Card.Title>
                    <Card.Text>
                        <input id="searchBox" onChange={(e) => {setSearchParam(e.target.value)}}></input> <Button onClick={searchFunction}>Search By Title</Button>
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
                Your checked out documents:
        {

        documents.map((document) => (
            <div>
                <Card>
                    <Card.Title>{document.DOCUMENTTITLE}</Card.Title>
                    Checkout Date: {document.CHECKOUTDATE}
                </Card>
                <Button onClick={() => returnDocument(document.DOCUMENTID)}>Return Document</Button>
                </div>
        ))
        
        }
            </CardGroup>
        </div>
    )
}