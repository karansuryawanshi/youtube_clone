import { Link } from "react-router-dom";

const VideoCard = ({ video }) => (
  <div className="w-72 p-2">
    <img
      src={video.thumbnailUrl}
      alt={video.title}
      className="w-full rounded"
    />
    <h3 className="font-semibold">{video.title}</h3>
    <p className="text-sm text-gray-500">{video.channelName}</p>
    <p className="text-sm text-gray-400">{video.views} views</p>
    <Link to={`/videos/${video._id}`}>
      <img src={video.thumbnailUrl} alt={video.title} />
    </Link>
  </div>
);
export default VideoCard;
