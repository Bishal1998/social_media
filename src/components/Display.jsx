import './Display.css';
import { MdEditNote, MdDeleteOutline } from 'react-icons/md';
// import Data from './Data';

const Display = ({post}) => {

  return (
    <>
    <div className="display__media-title">
      <h2>Uploaded Post</h2>
    </div>

    {post.map((d) => {
      return(
        <div className="display__media" key={d.id}>
      <div className="display__media-p">
        <p>{d.caption}</p>
      </div>
      <div className="display__media-img">
        <img src={d.img} />
      </div>
      <div className="display__media-button">
        <div className="display__media-button-edit">
          <button><MdEditNote /> Edit</button>
        </div>
        <div className="display__media-button-delete">
          <button><MdDeleteOutline /> Delete</button>
        </div>
      </div>
    </div>
      )
    })}
    </>
  )
}

export default Display;