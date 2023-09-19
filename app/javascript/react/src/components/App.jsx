import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card, Form } from 'react-bootstrap';

const App = () => {

    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({
        title: "",
        body: "",
    });
    const [editPost, setEditPost] = useState(null); // Track the post being edited
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = () => {
        axios
            .get("/api/posts")
            .then((response) => {
                setPosts(response.data);
            })
            .catch((error) => {
                setError("Error fetching posts. Please try again later.");
            });
    };

    // Delete Part
    const handleDelete = (id) => {
        axios
            .delete(`/api/posts/${id}`)
            .then(() => {
                setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
            })
            .catch((error) => {
                setError("Error deleting post. Please try again later.");
            });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setNewPost((prevNewPost) => ({
            ...prevNewPost,
            [name]: value,
        }));
    };

    // Update or Create Part
    const handleSubmit = (event) => {
        event.preventDefault();

        if (editPost) {
            // Update existing post
            axios
                .put(`/api/posts/${editPost.id}`, { post: newPost }) // Use PUT for updating
                .then((response) => {
                    setPosts((prevPosts) =>
                        prevPosts.map((post) =>
                            post.id === editPost.id ? response.data : post
                        )
                    );
                    setEditPost(null); // Clear edit state
                })
                .catch((error) => {
                    setError("Error updating post. Please check your input and try again.");
                });
        } else {
            // Create new post
            axios
                .post("/api/posts", { post: newPost })
                .then((response) => {
                    setPosts((prevPosts) => [...prevPosts, response.data]);
                })
                .catch((error) => {
                    setError("Error creating post. Please check your input and try again.");
                });
        }

        // Reset the form
        setNewPost({
            title: "",
            body: "",
        });
    };

    const handleEdit = (post) => {
        // Populate the form with the data of the post being edited
        setNewPost({
            title: post.title,
            body: post.body,
        });
        setEditPost(post);
    };


    return (
        <div>
            <h1 className={"text-center"}>React App</h1>
            {error && <p className="error">{error}</p>}

        {/*Form Part*/}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        placeholder="Enter title"
                        value={newPost.title}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="body">
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                        as="textarea"
                        name="body"
                        placeholder="Enter body"
                        value={newPost.body}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Button type="submit" className={"mt-2"} variant="primary">
                    {editPost ? "Update" : "Submit"}
                </Button>
            </Form>

        {/*All Posts*/}
            <div className="row py-2">
                {posts.map((post) => (
                    <div className="col-md-3" key={post.id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <Card.Text>{post.body}</Card.Text>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(post.id)}
                                >
                                    Delete
                                </Button>
                                <Button className={"mx-2"}
                                    variant="info"
                                    onClick={() => handleEdit(post)}
                                >
                                    Edit
                                </Button>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
