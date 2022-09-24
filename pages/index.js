import { Center, ChakraProvider, Spinner } from "@chakra-ui/react";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import Login from "./Login";
import MainChat from "./MainChat";

export default function Home() {
	const [user, loading, error] = useAuthState(auth);

	if (error) {
		return <Login />;
	}

	if (loading) {
		return (
			<>
				<Head>
					<title>LOADING . . . . . .</title>
				</Head>

				<Center h="100vh">
					<Spinner size="xl" />
				</Center>
			</>
		);
	}

	if (!user) {
		return <Login />;
	} else {
		return <MainChat />;
	}
}
