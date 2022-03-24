import './AddPost.css';
import { MdOutlinePermMedia, MdOutlineUploadFile } from 'react-icons/md';
import Display from './Display';
import { useState, useRef, useEffect } from 'react';
import { db } from '../firebase-config';
import { addDoc, collection, getDocs} from 'firebase/firestore';

const AddPost = () => {

    const [post, setPost ] = useState([]); 
    const postCollectionRef = collection(db, 'data');
    const imgRef = useRef();
    const [cap, setCap] = useState('');

    const getPost = async () => {
        const data = await getDocs(postCollectionRef);
        setPost(data.docs.map((doc) => ({ ...doc.data(), id : doc.id })));
        console.log(data)
    }

    const createPost = async () => {
        await addDoc(postCollectionRef, {caption : cap, img :  imgRef});
    }

  useEffect(() => {
    
    getPost();

  },[])


    const handleUpload = (e) => {
        const [file] = e.target.files;
        console.log(file)
    }

  return (
    <div className="add__post-social__media">
        <div className="add__post-social__media-input">
            <input type="text"
            placeholder= "What's in your mind ?"
            autoFocus
            value={cap}
            onChange = {(e) => setCap(e.target.value)}
            />
        </div>
        <div className="add__post-social__media-add">
            <div className="add__post-social__media-add__media">
                <input
                    ref={imgRef}
                    onChange={handleUpload}
                    multiple={false}
                    type="file"
                    hidden
                />
                <button onClick={() => imgRef.current.click()}><MdOutlinePermMedia /> Add Photo</button>
            </div>
            <div className="add__post-social__media-add__post">
                <button onClick={createPost}><MdOutlineUploadFile /> Upload Post</button>
            </div>
        </div>
        <Display post = {post}/>
    </div>
  )
}

export default AddPost;