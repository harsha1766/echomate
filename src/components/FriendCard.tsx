import { convertStyleToReact } from "utils/helper.function";

export default function FriendCard() {
  return (
    <div className="panel panel-white profile-widget">
      <div className="row">
        <div className="col-sm-12">
          <div
            className="image-container bg2"
            style={convertStyleToReact(
              "background:url(http://www.bootdey.com/img/Content/flores-amarillas-wallpaper.jpeg)"
            )}
          >
            <img
              src="https://bootdey.com/img/Content/avatar/avatar6.png"
              className="avatar"
              alt="avatar"
            />
          </div>
        </div>
        <div className="col-sm-12">
          <div className="details">
            <h4>
              John Smit Doe <i className="fa fa-sheild"></i>
            </h4>
            <div>Works at Bootdey.com</div>
            <div>Attended University of Bootdey</div>
            <div>Lives in Medellin, Colombia</div>
            <div className="mg-top-10">
              <a href="#" className="btn btn-default">
                About Kevin
              </a>
              <a href="#" className="btn btn-success">
                Add Kevin
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
