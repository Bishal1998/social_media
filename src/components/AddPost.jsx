import "./AddPost.css";
import { MdOutlineUploadFile } from "react-icons/md";
import Display from "./Display";
import { useState, useEffect } from "react";
import { storage, db } from "../firebase-config";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const AddPost = () => {

    const [post, setPost] = useState([]);
    const postCollectionRef = collection(db, "data");
    const [cap, setCap] = useState("");
    const [file, setFile] = useState();

    const getPost = async () => {
        const data = await getDocs(postCollectionRef);
        setPost(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    useEffect(() => {
        getPost();
    }, []);

    const imageUpload = (e) => {
        setFile(e.target.files[0]);
    };

    const handlePublish = () => {
        if (!cap || !file) {
            alert("Please fill all the fields");
            return;
        }

        const storageRef = ref(storage, `/images/${file.name}`);

        const uploadImage = uploadBytesResumable(storageRef, file);

        uploadImage.on(
            "state_changed",
            () => { },
            (err) => {
                console.log(err);
            },
            () => {
                setCap("");
                setFile("");
                getDownloadURL(uploadImage.snapshot.ref).then((url) => {
                    addDoc(postCollectionRef, {
                        caption: cap,
                        img: url,
                    })
                        .then(() => {
                            alert("Post submitted successfully");
                        })
                        .catch((err) => {
                            alert(`${err} Error`);
                        });
                });
            }
        );
    };

    return (
        <div className="add__post-social__media">
            <div className="add__post-social__media-input">
                <input
                    type="text"
                    placeholder="What's in your mind ?"
                    autoFocus
                    value={cap}
                    onChange={(e) => setCap(e.target.value)}
                    required
                />
            </div>
            <div className="add__post-social__media-add">
                <div className="add__post-social__media-add__media">
                    <input
                        onChange={imageUpload}
                        multiple={true}
                        type="file"
                        accept="image/*"
                    // hidden
                    />
                    {/* <button onClick={imageUpload}><MdOutlinePermMedia /> Add Photo</button> */}
                </div>
                <div className="add__post-social__media-add__post">
                    <button onClick={handlePublish}>
                        <MdOutlineUploadFile /> Upload Post
                    </button>
                </div>
            </div>
            <Display post={post} />
        </div>
    );
};

export default AddPost;

// const createPost = async () => {
//         await addDoc(postCollectionRef, {caption : cap, img :  file});

//         setCap('');
//         setFile('');
//     }
