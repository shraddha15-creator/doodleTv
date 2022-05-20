import { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const VideosContext = createContext();

export const VideosProvider = ({ children }) => {
	const [categories, setCategories] = useState();
	const [videos, setVideos] = useState([]);
	const [isActive, setIsActive] = useState(false);

	// Fetch categories function
	const getCategories = () => {
		axios
			.get("./api/categories")
			.then((res) => setCategories(res.data.categories));
	};

	// Fetch videos function
	const getVideos = async () => {
		try {
			const response = await axios.get("/api/videos");
			setVideos(response.data.videos);
		} catch (error) {
			console.error("ERROR: while fetching videos", error);
		}
	};

	// Category filter
	const activeCategoryHandler = (category, videos) => {
		// setIsActive(true);
		const filteredCategory = [...videos].filter((vdo) => {
			return category.categoryName === vdo.category;
		});
		setVideos(filteredCategory);

		setIsActive(() =>
			categories.filter((chip) => {
				return chip.categoryName === category.categoryName
					? chip.categoryName
					: category.categoryName;
			})
		);
		setIsActive(!isActive === true);
	};

	useEffect(() => {
		getCategories();
	}, []);

	useEffect(() => {
		getVideos();
	}, []);

	return (
		<VideosContext.Provider
			value={{
				categories,
				videos,
				activeCategoryHandler,
				isActive,
				setIsActive,
			}}
		>
			{children}
		</VideosContext.Provider>
	);
};

export const useVideos = () => useContext(VideosContext);
