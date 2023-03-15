import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';

export function AddNewDocument() {

    const [documentTitle, setDocumentTitle] = useState('');
    const [publishDate, setPublishDate] = useState('');
    const [publisherName, setPublisherName] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [synopsis, setSynopsis] = useState('');


    const handleNewDocumentSubmit = (e) => {
        e.preventDefault();
        console.log(documentTitle);
        console.log(publishDate);
        console.log(publisherName);
        console.log(author);
        console.log(genre);
        console.log(synopsis);
        try {
            axios.post('http://localhost:8001/addnewdocument', {
                documentTitle: documentTitle,
                publishDate: publishDate,
                publisherName: publisherName,
                author: author,
                genre: genre,
                synopsis: synopsis
            }).then((response)=> {
                console.log(response.data.message);
                console.log(response);
                if (response.data.message === "Failed.") {
                    alert('The document was not added.');
                } 
                else {
                    console.log("Didnt work");
                    alert("The document was added. The DocumentID is " +response.data.message.DOCUMENTID)
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
                <Card.Title>Add New Document</Card.Title>
                <form onSubmit={handleNewDocumentSubmit}>
                    <label>Document Title: </label> <input onChange={(e) => {setDocumentTitle(e.target.value)}} required></input>
                    <br/>
                    <br/>
                    <label>Publisher Name: </label> <input onChange={(e) => {setPublisherName(e.target.value)}} required></input>
                    <br/>
                    <br/>
                    <label>Publish Date: </label> <input onChange={(e) => {setPublishDate(e.target.value)}} required></input>
                    <br/>
                    <br/>
                    <label>Author: </label> <input onChange={(e) => {setAuthor(e.target.value)}} required></input>
                    <br/>
                    <br/>
                    <label>Genre: </label> <input onChange={(e) => {setGenre(e.target.value)}} required></input>
                    <br/>
                    <br/>
                    <label>Synopsis: </label> <input onChange={(e) => {setSynopsis(e.target.value)}} required></input>


                    <button type="submit">Add New Document</button>
                </form>

            </Card>

        </div>
    )
}