import { ChatIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Stack } from "@chakra-ui/react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Head from "next/head";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig";

function Login() {
	const [user] = useAuthState(auth)
	
	return (
		<div
			style={{
				backgroundColor: "RGBA(61, 61, 61)",
			}}
		>
			<Head>
				<title>Login</title>
			</Head>
			
			<Center h={"100vh"}>
				<Stack
					align="center"
					p={"30"}
					rounded="lg"
					boxShadow={["-5px 10px 5px WHITE"]}
					spacing={10}
					bgColor={"gray.600"}
					transition="all 0.2s"
					_hover={{
						boxShadow: ["0 0px 10px gray"],
					}}
				>
					<Box
						bg={"blue.100"}
						w={"fit-content"}
						rounded={"3xl"}
						p={"5"}
						shadow={"lg"}
					>
						<ChatIcon boxSize={"100px"} />
					</Box>

					<Button
						boxShadow={"md"}
						onClick={() => {
							const provider = new GoogleAuthProvider();
							signInWithPopup(auth, provider);
						}}
					>
						Sign in with Google
					</Button>
				</Stack>
			</Center>
		</div>
	);
}

export default Login;
