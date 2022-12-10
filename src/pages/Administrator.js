import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export function Administrator() {
    return(
        <div>
            <Button href="/">Home</Button>    <Button href="/reader">Reader Menu</Button>
            <Card>
                <Card.Body>
                    <Card.Title>Welcome to the Administrator Menu.</Card.Title>
                    <Card.Text>
                        Here are the details.
                    </Card.Text>
                <Button>Add a document copy.</Button>
                <Button>Search document copy and check its status.</Button>
                <Button>Add new reader.</Button>
                <Button>Print branch information (name and location).</Button>

                </Card.Body>
            </Card>
        </div>
    )
}