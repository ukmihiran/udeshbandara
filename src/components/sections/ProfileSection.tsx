import React from "react";
import {
  SlideFade,
  Box,
  Heading,
  Avatar,
  Image,
  Link,
  Flex,
  LightMode,
  ButtonGroup,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import Paragraph from "../Paragraph";
import { resume } from "../../constant";
import SocialButton from "../SocialButtons";
import SpotifySection from "./SpotifySection";
import { BiPhoneCall } from "react-icons/bi";
import { MotionFlex } from "../../utils/motion";
import { SpotifySong } from "@/utils/types/spotify";

interface IProfileSection {
  song: SpotifySong;
}

const ProfileSection: React.FC<IProfileSection> = ({ song }) => {
  return (
    <Box>
      <MotionFlex
        alignItems="center"
        justifyContent="space-between"
        opacity="0"
        initial={{
          opacity: 0,
          translateX: 150,
        }}
        animate={{
          opacity: 1,
          translateX: 0,
          transition: {
            duration: 0.5,
          },
        }}
      >
        <Heading
          as="h1"
          fontSize={{ base: "28px", md: "40px", lg: "48px" }}
          mb={3}
        >
          Hey, I am Udesh! <span className="waving-hand">👋</span>
        </Heading>
        <MotionFlex alignItems={"flex-end"} whileHover={{ scale: 1.2 }}>
          <Avatar
            name="Udesh Bandara"
            src="/profile_picture.png"
            mb={5}
            size="lg"
          />
        </MotionFlex>
      </MotionFlex>
      <Paragraph textProps={{ fontSize: "2xl", lineHeight: 1.6 }}>
        Cybersecurity Professional from United Kingdom.
      </Paragraph>
      <Paragraph textProps={{ fontSize: "2xl", lineHeight: 1.6 }}>
        Focused on{" "} Penetration Testing,
          Vulnerability Management {" & "} RedTeaming.
        .{"\n"}Enjoying life as a Penetration Tester & Tech Writter on{" "}
        <Link
          color={useColorModeValue("blue.500", "blue.400")}
          href="https://cybernetgen.com/"
          fontWeight="500"
          isExternal
        >
          Cybernetgen
        </Link>
        . 🔥
      </Paragraph>

      <Box mt={5}>
        <ButtonGroup>
          <SocialButton social={resume} />
          <Link href={"/contact"} style={{ textDecoration: "none" }}>
            <Button
              colorScheme="blue"
              size="sm"
              margin={"5px"}
              leftIcon={<BiPhoneCall />}
            >
              Contact Me
            </Button>
          </Link>
        </ButtonGroup>
      </Box>

      {/* <SpotifySection song={song} /> */}
    </Box>
  );
};

export default ProfileSection;