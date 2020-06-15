import React,{useEffect, useState} from 'react';
import Layout from "./Layout";
import { Card, Row, Form, Input, Label, CardTitle, Button, Col } from "reactstrap";
import Jimp from "jimp";

export default function Home() {

    //state for memes data
    const [data,setData] = useState([]);

    //form data
    const [captionField, setcaptionField] = useState([]);

    //inputlist 
    const [inputList,setinputList] = useState([
        <Form key="1">
            <Label for="captionText1">Caption Text</Label>
            <Input type="text" id="captionText1" onChange = {e => handleChangeCaption(e,1,"captionField")}/> 
            <Row>
                <Col xs="6"><Label for="x">X-coordinate:</Label><Input type="text" id="x"/></Col>
                <Col xs="6"><Label for="y">Y-coordinate:</Label><Input type="text" id="y"/></Col>
            </Row>
        </Form>,
    ]);

    //const formNumber to keep track of caption numbers
    const [capNumber,setcapNumber] = useState(2);

    //making the fetch call
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json()
        .then((result) => {
            setData(result.data.memes);
            console.log(result);
        })
        )
        .catch(error => console.log("Error fetching"))
    },[])

    const handleChangeCaption = (event,capNumber) => {
        let curr_data = [...captionField];
        curr_data[capNumber-1] = event.target.value;
        setcaptionField(
            curr_data
            );
    }

    const handleClick = () => {
        setcapNumber(capNumber+1);
            setinputList(
                [...inputList,
                <Form key={capNumber}>
                    <Label for={"captionText" + capNumber}>Caption Text</Label>
                    <Input type="text" id={"captionText" + capNumber} onChange={e => handleChangeCaption(e,capNumber)}/> 
                    <Row>
                        <Col xs="6"><Label for="x">X-coordinate:</Label><Input type="text" id="x"/></Col>
                        <Col xs="6"><Label for="y">Y-coordinate:</Label><Input type="text" id="y"/></Col>
                    </Row>
                 </Form>,]
            )
    }

    async function handleSubmit(url) {
        const font = await Jimp.loadFont(Jimp.FONT_SANS_64_BLACK);
        const image = await Jimp.read(url);
        image.print(font,10,10,"Hello");
        await image.writeAsync("test.jpg");
    }

    //map function for every data element
    const memesList = data.map((meme, i) => 
        <div key={i}>
            <Row className="justify-content-around">
            <img src={meme.url} alt="meme"  height="400px" width="400px"></img>
            <Col className="sm-3">
            <Card>
                <CardTitle>{meme.name}</CardTitle>
                {inputList}
                <Button color="success" onClick ={() => handleSubmit(meme.url)}>Submit</Button>
            </Card>
            </Col>
            </Row>
            <br/>
        </div>
        );

    return (
        <div>
        <Layout pageName="Home" link="Hello">
        </Layout>
        <Button className="m-5" color="info" onClick = {() => handleClick({capNumber})}>I would Like Another Caption</Button>
        {data === []? "Loading": memesList}
        </div>
    )
}
