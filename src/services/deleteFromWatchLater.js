import axios from "axios";
import { token } from "./token";

const encodedToken = token();

export const deleteFromWatchLater = async (videoId, watchLaterDispatch) => {
	console.log(videoId, "delet watch later");
	try {
		const response = await axios.delete(`/api/user/watchlater/${videoId}`, {
			headers: { authorization: encodedToken },
		});
		console.log(response);
		watchLaterDispatch({
			type: "DELETE_FROM_WATCH_LATER",
			payload: response.data.watchlater,
		});
	} catch (error) {
		console.error("ERROR WHILE DELETING FROM WATCH LATER", error);
	}
};
