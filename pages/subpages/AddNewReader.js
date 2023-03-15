import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';

export function AddNewReader() {

    const [readerFirstName, setReaderFirstName] = useState('');
    const [readerLastName, setReaderLastName] = useState('');
    const [readerEmail, setReaderEmail] = useState('');
    const [readerPhone, setReaderPhone] = useState('');
    const [readerStreetAddress, setReaderStreetAddress] = useState('');
    const [readerCity, setReaderCity] = useState('');
    const [readerState, setReaderState] = useState('');
    const [readerZip, setReaderZip] = useState('');


    const handleNewReaderSubmit = async (e) => {
        e.preventDefault();
        console.log();

        try {
            axios.post('http://localhost:8001/addnewreader', {
                readerFirstName: readerFirstName,
                readerLastName: readerLastName,
                readerEmail: readerEmail,
                readerPhone: readerPhone,
                readerStreetAddress: readerStreetAddress,
                readerCity: readerCity,
                readerState: readerState,
                readerZip: readerZip
            }).then((response)=> {
                console.log(response.data.message);
                if (response.data.message === "Failed.") {
                    alert("There was an error. The reader was not added. Check your field types.");
                    
                } else {
                    console.log(response);
                    alert('The reader was added. Their ReaderID is '+response.data.message.READERID);

                }
            })

        } catch (error) {
            console.log(error);
            alert("There was an error. The reader was not added. Check your field types.")
        }

    }

    return(
        <div>
            <Button href="/">Home</Button> 
            <Card>
                <Card.Title>Add New Reader</Card.Title>
                
                <form onSubmit={handleNewReaderSubmit}>
                    <label>Reader First Name: </label> <input onChange={(e) => {setReaderFirstName(e.target.value)}} required></input>
                    <br/>
                    <br/>
                    <label>Reader Last Name: </label> <input onChange={(e) => {setReaderLastName(e.target.value)}} required></input>
                    <br/>
                    <br/>
                    <label>Reader Email: </label> <input onChange={(e) => {setReaderEmail(e.target.value)}} required></input>
                    <br/>
                    <br/>
                    <label>Reader Phone: </label> <input onChange={(e) => {setReaderPhone(e.target.value)}} required></input>
                    <br/>
                    <br/>
                    <label>Reader Street Address: </label> <input onChange={(e) => {setReaderStreetAddress(e.target.value)}} required></input>
                    <br/>
                    <br/>
                    <label>Reader City: </label> <input onChange={(e) => {setReaderCity(e.target.value)}}></input>
                    <br/>
                    <br/>
                    <label>Reader State: </label> <input onChange={(e) => {setReaderState(e.target.value)}}></input>
                    <br/>
                    <br/>
                    <label>Reader ZIP: </label> <input onChange={(e) => {setReaderZip(e.target.value)}}></input>


                    <button type="submit">Add New Reader</button>
                </form>

            </Card>

        </div>
    )
}