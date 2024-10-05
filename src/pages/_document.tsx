import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="en" className="dark">
			<Head>
				<link
					href="https://rsms.me/inter/inter.css"
					rel="stylesheet"
				/>
			</Head>
			<body className="antialiased">
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
