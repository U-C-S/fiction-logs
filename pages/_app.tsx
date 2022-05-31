import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { MantineProvider, Tuple } from "@mantine/core";
import Head from "next/head";

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Fiction-Logs</title>
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
				<meta name="description" content="Generated by create next app" />
			</Head>
			<MantineProvider
				withNormalizeCSS
				theme={{
					headings: {
						fontFamily: "Nunito, sans-serif",
					},
					fontFamily: "Nunito, sans-serif",
					primaryColor: "red",
					primaryShade: 6,
					colorScheme: "dark",
				}}>
				<Component {...pageProps} />
			</MantineProvider>
		</>
	);
}
