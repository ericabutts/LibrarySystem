import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import axios from 'axios';

export function Home() {
    

    const [adminUsername, setAdminUsername] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [adminMessageLabel, setAdminMessageLabel] = useState('');

    const [readerId, setReaderId] = useState('');

    const adminHandleSubmit = async (e) => {
        e.preventDefault();

        try {
            axios.post("http://localhost:8001/administratorLogin", {
                adminUsername: adminUsername, 
                adminPassword:  adminPassword
            }).then((response)=>{
            
                if(response.data.message === "No results.") {
                    setAdminMessageLabel('Login failed.')
                    alert('User does not exist.');
                    localStorage.setItem("adminUsername", null);
                } else {
                    window.location.href = "http://localhost:3000/administrator";
                    localStorage.setItem("adminUsername", adminUsername);
                    
                }
            })

        } catch (error) {
            console.log(error);
        }
        
    }

    const readerHandleSubmit = (e) => {
        e.preventDefault();
        
        try {
            axios.post('http://localhost:8001/readerLogin', {
                readerId: readerId
            }).then((response) => {
                
                if(response.data.message === "No results.") {
                    alert('This reader does not exist.');
                    localStorage.setItem("readerId", null);
                } else {
                    
                    window.location.href = "http://localhost:3000/reader";
                    localStorage.setItem("readerId", readerId);
                }
            })
        } catch (error) {
            console.log(error);
        }

    }


    return(
        <div>
            <Card>
                <Card.Body>
                    <Card.Title>Welcome to the Library System.</Card.Title>
                    <Button href="/">Home</Button> 
                    <Card.Text>
                        <br/>
                        Administrators: Input a username and password
                        <br/>
                        <form onSubmit={adminHandleSubmit}>
                        <input id="adminUsername" value={adminUsername} onChange={(e) => {setAdminUsername(e.target.value)}}/> <input value={adminPassword} id="adminPassword" onChange={(e) => {setAdminPassword(e.target.value)}}/><button type="submit">Administrator Login</button>
                        </form>
                        <label value={adminMessageLabel} id="adminMessageLabel"></label>
                        <br/>
                        <br/>
                        <br/>
                        Readers: Input your ReaderID
                        <br/>
                        <form onSubmit={readerHandleSubmit}>
                        <input value={readerId} id="readerId" onChange={(e) => {setReaderId(e.target.value);}}/> <button type="submit">Search for Reader</button>
                        </form>

                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}