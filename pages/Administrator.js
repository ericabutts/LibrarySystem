import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup'
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';

export function Administrator() {
    const adminUsername = localStorage.getItem("adminUsername");

    const [searchDocuments, setSearchDocuments] = useState([]);
    const [searchParam, setSearchParam] = useState('');

    const searchFunction = () => {

        try {
            axios.post('http://localhost:8001/adminSearchDocument', {
                searchParam: searchParam
            }).then((response) => {
                console.log(response);
                console.log(response.data);
                console.log(response.data.message);
                if (response.data.message === "No results.") {
                    alert("No documents found.")
                } else {
                    setSearchDocuments(response.data.message);
                }
                
            })
        } catch (error) {
            console.log(error);
        }
        
    }


    return(
        <div>
            <Button href="/">Home</Button>  
            <Card>
                <Card.Body>
                    <Card.Title>Welcome to the Administrator Menu.</Card.Title>
                    <Card.Text>
                        Here are the details.
                    </Card.Text>
                <Button>Print branch information (name and location).</Button>
                <br/>
                <br/>
                <Button href="/addnewdocument">Add a document copy.</Button>
                <br/>
                <br/>
                <Button href="/addnewreader">Add new reader.</Button>
                <br/>
                <br/>
                <input id="searchBox" onChange={(e) => {setSearchParam(e.target.value)}}></input> <Button onClick={searchFunction}>Search By Title</Button>
                </Card.Body>
            </Card>
            <CardGroup>
                Search results:
                {searchDocuments.map((document) => (
            <div>
                <Card>
                    <Card.Title>{document.DOCUMENTTITLE}</Card.Title>
                    <Card.Text>{document.AUTHOR}</Card.Text>
                    <Card.Text>{document.GENRE}</Card.Text>
                    <Card.Text>{document.SYNOPSIS}</Card.Text>
                    <Card.Text>{document.isAvailable ? 
                        <h4> Available </h4> :  <h4> Not Available </h4> }</Card.Text>
                    
                </Card>
                </div>
        ))}

            </CardGroup>
        </div>
    )
}