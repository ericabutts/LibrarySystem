import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

export function Document(props) {
    const checkoutDocument = () => {
        console.log("You checked out the document called"+props.documentTitle)
    }
    return(
        <div>
            <Card>
                <Card.Body>
                    <Card.Title>{props.documentTitle}</Card.Title>
                    <Card.Text>
                        
                        <Button href="/reader" onClick={checkoutDocument}>Return Document</Button>
                        <Button href="/reader" onClick={checkoutDocument}>Reserve Document</Button>



                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}