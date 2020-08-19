import React, { Component } from 'react'
import { Carousel, Container, Card, CardDeck, Image, Button } from "react-bootstrap";
import "./Home.css"
import Brand from '../../smallComponents/Brand';

export default class Home extends Component {
    render() {
        return (
            <div className="home-body">
                <Carousel className="home-carousel">
                    <Carousel.Item>
                        <img
                            className="d-block w-100 carousel-img"
                            src={require("../../images/speed.jpg")}
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h3 className="text-shadow">High Performance</h3>
                            <p className="text-shadow"><Brand /> implements state of the art performance optimizations and bleeding edge technologies to bring you functionality you didn't even think possible</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 carousel-img"
                            src={require("../../images/circlething.jpg")}
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3 className="text-shadow">Fast Turnaround Times</h3>
                            <p className="text-shadow">Get prototypes for your project in as little as 1 week, with frequent updates on features</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100 carousel-img"
                            src={require("../../images/businessman.jpg")}
                            alt="Third slide"
                        />

                        <Carousel.Caption>
                            <h3 className="text-shadow">Flexible Solutions</h3>
                            <p className="text-shadow">Whether you just want a small piece of software to fit into your larger business operations, or you want a front to back solution from server setup to database design. <Brand /> has a solution for you</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <Container>
                    <h3 className="display-3">About <Brand /></h3>
                    <p><Brand /> provides solutions for everything programming. From automation, to web design, to mobile and desktop applications.</p>
                    <p>We employ only the absolute best of the best, blazing fast developers to get projects done extremely quickly, without sacrificing quality.</p>
                    <hr></hr>
                    <CardDeck>
                        <Card>
                            <div className="equal-aspect-container">
                                <Image variant="top" src={require("../../images/automation.png")} roundedCircle />
                            </div>

                            <Card.Body>
                                <Card.Title>Automation</Card.Title>
                                <Card.Text>
                                    Massively increase productivity by modifying workflows to include automation. From document scanning, to identifying patterns and tagging data.
                                </Card.Text>
                            </Card.Body>
                            <Button href="/automation">
                                Learn More
                            </Button>
                        </Card>
                        <Card>
                            <div className="equal-aspect-container">
                                <Image variant="top" src={require("../../images/website.png")} roundedCircle />
                            </div>

                            <Card.Body>
                                <Card.Title>Websites</Card.Title>
                                <Card.Text>
                                    Whether you want to boost your presence online with a beautiful website, or you want to increase productivity and collaboration with a company intranet.
                                </Card.Text>
                            </Card.Body>
                            <Button href="/websites">
                                Learn More
                            </Button>
                        </Card>
                        <Card>
                            <div className="equal-aspect-container">
                                <Image variant="top" src={require("../../images/desktopmobile.png")} roundedCircle />
                            </div>

                            <Card.Body>
                                <Card.Title>Desktop and Mobile Applications</Card.Title>
                                <Card.Text>
                                    From game development, to data analysis, <Brand /> can deliver you native applications for iOS, Android, Windows, MacOS, and Linux.
                                </Card.Text>
                            </Card.Body>
                            <Button href="/apps">
                                Learn More
                            </Button>
                        </Card>
                    </CardDeck>
                    <hr></hr>
                    <Button block size="lg" href="/quote">
                        Request a Quote
                    </Button>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                </Container>
            </div>
        )
    }
}
