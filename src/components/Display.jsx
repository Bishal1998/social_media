import "./Display.css";
import Button from "./Button";
// import Data from './Data';

const Display = ({ post }) => {
  return (
    <>
      {post.length ? (
        <div className="display__media-title">
          <h2>Uploaded Post</h2>
        </div>
      ) : (
        <div className="display__media-title">
          <h1>No Post Available</h1>
        </div>
      )}

      {post.map((d) => {
        return (
          <div className="display__media" key={d.id}>
            <div className="display__media-p">
              <p>{d.caption}</p>
            </div>
            <div className="display__media-img">
              <img src={d.img} />
            </div>
            <Button id={d.id} img={d.img} cap={d.caption} />
          </div>
        );
      })}
    </>
  );
};

export default Display;