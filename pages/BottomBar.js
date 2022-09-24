import { ArrowBackIcon, ChatIcon } from "@chakra-ui/icons";
import {
	Avatar,
	Box,
	Button,
	Flex,
	FormControl,
	IconButton,
	Input,
	Stack,
	Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebaseConfig";

function BottomBar() {
	const [user] = useAuthState(auth);
	const userPic = user.photoURL.toString();

	const [input, setInput] = useState("");

	const sendMessage = (e) => {
		e.preventDefault();
		db.collection("messages"
		)
			.add({
				user: user.uid,
				text: input,
				createdAt: new Date(),
				photoURL: user.photoURL,
				displayName: user.displayName,
			})
			.then(() => {
				setInput("");
			});
	};

	return (
		<div
			style={{
				backgroundColor: "RGBA(61, 61, 61)",
			}}
		>
			<Flex
				w="100%"
				position="fixed"
				bottom="0"
				align={"center"}
				overflowY={"hidden"}
			>
				<Box
					bgColor={"blue.500"}
					minWidth={"150px"}
					shadow={"lg"}
					roundedBottomEnd={"lg"}
					roundedTopEnd={"lg"}
					p={"1"}
					align="center"
					opacity={0.1}
					_hover={{
						opacity: 1,
					}}
				>
					<Stack>
						<Avatar src={userPic} mr={2} />
						<Text mr={3}>{user.displayName}</Text>
						<IconButton
							icon={<ArrowBackIcon />}
							size="sm"
							onClick={() => {
								auth.signOut();
							}}
						/>
					</Stack>
				</Box>

				<FormControl p={3} onSubmit={sendMessage} as={"form"}>
					<Input
						placeholder="Type here..."
						borderColor={"gray.500"}
						boxShadow={"md"}
						borderRadius={"lg"}
						h={"50px"}
						// go to the bottom
						position="relative"
						bottom="-35px"
						autoComplete="off"
						onChange={(e) => setInput(e.target.value)}
						value={input}
						bgColor={"gray.100"}
					/>

					<Button type={"submit"} hidden onClick={sendMessage}>
						submit
					</Button>
				</FormControl>
			</Flex>
		</div>
	);
}

export default BottomBar;
