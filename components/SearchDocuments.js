import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { Document } from '../components/Document';

export function Reader() {
    const documentsArray = [
        {documentID:"Book1", documentTitle:"Huck Finn",availability:"Yes"},
        {documentID:"Book2", documentTitle:"Dracula",availability:"No"},
        {documentID:"Book3", documentTitle:"Frankenstein",availability:"No"},
        {documentID:"Book4", documentTitle:"Pride and Prejudice",availability:"Yes"},
    ]

    const [documents, setDocuments] = useState(documentsArray);

    const getDocumentsSearch = () => {
        console.log("Here's the list of documents you searched for.");
        console.log(document.getElementById('searchBox').value);
    }

    const getMyDocuments = () => {
        console.log("Here are all the documents you have checked out.");
    }

    return(
        <div>
            <Button href="/">Home</Button>    <Button href="/administrator">Administrator Menu</Button>

            <Card>
                <Card.Body>
                    <Card.Title>Welcome to the Reader Menu.</Card.Title>
                    <Card.Text>
                        <input id="searchBox"></input> <Button onClick={getDocumentsSearch}>Search</Button>
                        <br/>       

                    </Card.Text>
                </Card.Body>
            </Card>
            <CardGroup>
                Your checked out documents:
        {documents.map((document) => (
            <div>
                <Card>
                    <Card.Title>{document.documentTitle}</Card.Title>
                </Card>
                <Button>Return Document</Button>
                </div>
        ))}
            </CardGroup>
        </div>
    )
}