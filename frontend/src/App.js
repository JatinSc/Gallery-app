import React, { useEffect, useState } from 'react'
import './App.css';
import Button from 'react-bootstrap/Button'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';


const App = () => {
    const [hover, setHover] = useState(-1)
    const [data, setData] = useState({ labels: "", url: "" })
    const [showModal, setShowModal] = useState(false);
    const [pics, setPics] = useState([])
    const [search, setSearch] = useState("")


    const getPics = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/pics`, {
                method: "GET"
            })
            const result = await res.json();
            if (!result.error) {
                setPics(result.data)
                console.log(result)
            }

        } catch (error) {

        }
    }

    useEffect(() => {
        getPics()
    }, [])

    const handelAdd = async (event) => {
        //local server   http://127.0.0.1:8000
        event.preventDefault();
        try {
            const res = fetch(`https://gallery-app-backend-csdh.onrender.com/newPost`, {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const result = await (await res).json
            if (!result.error) {
                setData({ labels: "", url: "" })
                setShowModal(false)
                getPics()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handelDelete = async (id) => {
        try {
            const res = await fetch(`https://gallery-app-backend-csdh.onrender.com/delete${id}`, {
                method: "DELETE"
            })
            const result = await res.json();
            if (!result.error) {
                setPics(result.myPics)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className='main'>
                <div className='header'>
                    <div className='header1'>
                        <div className='logo'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-fill" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.004-.001.274-.11a.75.75 0 0 1 .558 0l.274.11.004.001 6.971 2.789Zm-1.374.527L8 5.962 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339Z" />
                            </svg>
                            <div>
                                <h4>My Gallery</h4>
                                <small>by jatin</small>
                            </div>

                        </div>
                        <div style={{ width: "350px", padding: "10px" }}>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Search by name"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="search by name" onChange={(e) => setSearch(e.target.value)} />
                            </FloatingLabel>
                        </div>
                    </div>
                    <div className='header2'>
                        <Button variant="success" onClick={(e) => setShowModal(true)}>add a photo</Button>
                    </div>
                </div>
                {showModal ? (<>
                    <Modal show={showModal}>
                        <Modal.Header >
                            <Modal.Title>Add a new photo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Label</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="add label here"
                                        autoFocus
                                        onChange={(e) => setData({ ...data, labels: e.target.value })}
                                        value={data.labels}
                                    />
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlInput1"
                                >
                                    <Form.Label>Photo URL</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="https://sallysbakingaddiction.com/wp-content/uploads/2013/05/classic-chocolate-chip-cookies.jpg"
                                        autoFocus
                                        onChange={(e) => setData({ ...data, url: e.target.value })}
                                        value={data.url}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={(e) => { setShowModal(false) }}>
                                Cancel
                            </Button>
                            <Button variant="success"
                                onClick={handelAdd}
                            >
                                Submit
                            </Button>
                        </Modal.Footer>
                    </Modal></>) : null}

                <div className='container'>
                    {/* onMouseEnter={(e)=> setHover(index)} onMouseLeave={(e)=> setHover(-1)} */}
                    {
                        pics.filter((data) => data.labels.toLowerCase().includes(search.toLowerCase())).map((pic, index) =>
                            <div className='pics' key={pic._id} >
                                <img src={pic.url} alt="food" className="card-1"></img>
                                <div className='card-body'>
                                <Button className='delete' variant="outline-danger" onClick={(e) => handelDelete(pic._id)}>
                                        delete
                                    </Button>
                                    <strong><p>{pic.labels}</p></strong>
                                    {/* {hover === index ? <Button className='delete' variant="outline-danger" onClick={(e) => handelDelete(pic._id)}>
                                        delete
                                    </Button> : null}
                                    {hover === index ? <strong><p>{pic.labels}</p></strong> : null} */}
                                </div>

                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default App
