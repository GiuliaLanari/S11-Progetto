import { selezionaCanzone } from "../redux/actions";
import { useDispatch } from "react-redux";
const CardAlbum = function (props) {
  const dispatch = useDispatch();

  return (
    <div
      className="col col-3 text-center cursor text-white"
      id={props.info.id}
      onClick={() => {
        dispatch(selezionaCanzone());
      }}
    >
      <img className="img-fluid" src={props.info.album.cover_medium} alt="album foto" />
      <p>Track: {props.info.title}</p>
      <br />
      Artist: {props.info.artist.name}
    </div>
  );
};

export default CardAlbum;
