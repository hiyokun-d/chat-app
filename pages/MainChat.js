/**
 * @jest-environment node
 */

import BottomBar from "./BottomBar";
import { ChakraProvider, Box, Text, Flex, Avatar } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

function MainChat() {
	const [user] = useAuthState(auth);
	const [messages, setMessages] = useState([]);
	const bottomOfChat = useRef();

	useEffect(() => {
		db.collection("messages")
			.orderBy("createdAt", "asc")
			.limit(20)
			.onSnapshot((snapshot) => {
				setMessages(
					snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
				);
			});
	}, []);

	const chat = () =>
		messages.map((message) => {
			// if there is a message without uid then it is a system message
			let userName = auth.currentUser.displayName;
			let boxColor = "green.500";
			let position = "flex-start";
			let showAvatar = false;

			if (message.user === user.uid) {
				userName = "you";
				position = "flex-end";
				showAvatar = false;
			} else {
				userName = message.displayName;
				boxColor = "gray.600";
				position = "flex-start";
				showAvatar = true;

				if (!message.user) {
					userName = "system";
					boxColor = "blue.500";
				}
			}

			return (
				<Flex key={Math.random()} align="flex-start" justifyContent={position} pt={"10px"}>
					<Box
						bgColor={boxColor}
						mb={2}
						w={"fit-content"}
						minW={"100px"}
						borderRadius={"5px"}
						boxShadow={"md"}
						color={"white"}
					>
						<Flex>
							{showAvatar ? <Avatar src={message.photoURL} mr={2} /> : null}
							<Text>{userName}</Text>
						</Flex>
						<Text>{message.text}</Text>
						<div ref={bottomOfChat}></div>
					</Box>
				</Flex>
			);
		});

	useEffect(() => {
		setTimeout(() => {
			if (bottomOfChat.current) {
				bottomOfChat.current.scrollIntoView({ behavior: "smooth" });
			}
		}, 100);
	}, [messages]);

	return (
		<div
			style={{
				backgroundColor: "RGBA(61, 61, 61)",
				width: "100%",
				height: "100%",
			}}
		>
			<ChakraProvider>
				<div style={{marginBottom: "50px"}}>
				{chat()}
				</div>
				<BottomBar />
			</ChakraProvider>
		</div>
	);
}

export default MainChat;
