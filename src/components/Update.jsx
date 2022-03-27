import "./AddPost.css";
import { MdOutlineUploadFile } from "react-icons/md";
import { useState } from "react";
import { storage, db } from "../firebase-config";
import { doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Update = ({ id, img, cap }) => {


    const postCollectionRef = doc(db, "data", id);
    const [title, setTitle] = useState(cap);
    const [updateFile, setUpdateFile] = useState(img);
    console.log(title)
    console.log(updateFile)

    const imageUpload = (e) => {
        setUpdateFile(e.target.files[0]);
    };

    const handleUpdate = () => {
        if (!title || !updateFile) {
            alert("Please fill all the fields");
            return;
        }

        const storageRef = ref(storage, `/images/${updateFile.name}`);

        const uploadImage = uploadBytesResumable(storageRef, updateFile);

        uploadImage.on(
            "state_changed",
            () => { },
            (err) => {
                console.log(err);
            },
            () => {
                setTitle("");
                setUpdateFile();
                getDownloadURL(uploadImage.snapshot.ref).then((url) => {
                    updateDoc(postCollectionRef, {
                        caption: title,
                        img: url,
                    })
                        .then(() => {
                            alert("Post Updated successfully");
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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    />
                </div>
                <div className="add__post-social__media-add__post">
                    <button onClick={handleUpdate}>
                        <MdOutlineUploadFile /> Update Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Update;