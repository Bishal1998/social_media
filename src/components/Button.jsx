import "./Button.css";
import { MdEditNote, MdDeleteOutline } from "react-icons/md";
import { deleteDoc, doc } from "firebase/firestore";
import { db, storage } from "../firebase-config";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import Update from "./Update";


const Button = ({ id, img, cap }) => {

    const [edit, setEdit] = useState(false);

    const postDelete = async () => {
        if (window.confirm("Are you sure you want to delete this article")) {
            try {
                await deleteDoc(doc(db, "data", id));
                const storageRef = ref(storage, img);
                await deleteObject(storageRef);
                alert("Post deleted successfully");
            } catch (error) {
                alert("Error in deletion");
                console.log(error);
            }
        }
    };

    return (
        <>
            <div className="display__media-button">
                <div className="display__media-button-edit">
                    <button onClick={() => setEdit(!edit)} >
                        <MdEditNote /> Edit
                    </button>
                </div>
                <div className="display__media-button-delete">
                    <button onClick={postDelete}>
                        <MdDeleteOutline /> Delete
                    </button>
                </div>
            </div>
            {edit === true && <Update id={id} img={img} cap={cap} />}
        </>
    );
};

export default Button;