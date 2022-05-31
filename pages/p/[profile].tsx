import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { IFilmData, ProfileContext } from "../../lib/profileContext";
import dynamic from "next/dynamic";
import { LoadingScreen } from "../../components/core";

const LoggedIn = dynamic(
	async () => {
		const [ProfileHeader] = await Promise.all([
			import("../../components/layout/LoggedIn"),
			new Promise(resolve => setTimeout(resolve, 3000)),
		]);
		return ProfileHeader;
	},
	{
		ssr: false,
		loading: () => <LoadingScreen />,
	}
);

export default function IndexPage() {
	const [list, updateList] = useState<IFilmData[]>([]);
	const [planningList, updatePlanningList] = useState<string[]>([]);
	const router = useRouter();
	let { profile } = router.query;

	useEffect(() => {
		if (false) {
			router.push("/me");
		}
	});

	let namex = profile?.toString() || "lol";
	return (
		<ProfileContext.Provider
			value={{
				name: namex,
				image: `https://avatars.dicebear.com/api/avataaars/${namex}.svg`,
				watchedList: list,
				updateWatchList: updateList,
				planningList: planningList,
				updatePlanningList: updatePlanningList,
			}}>
			<LoggedIn />
		</ProfileContext.Provider>
	);
}
