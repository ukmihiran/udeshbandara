import { Container, Divider } from "@chakra-ui/react";
import useSWR from "swr";
import ProfileSection from "../components/sections/ProfileSection";
import TechStackSection from "../components/sections/TechStack";
import styles from "../../styles/Home.module.css";
import Meta from "../components/Meta";

export default function Page() {
  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data } = useSWR("/api/spotify", fetcher);

  return (
    <Container maxW="container.lg" mt={["5", "10"]} mb={["5", "10"]}>
      <ProfileSection song={data} />
      <Divider my={10} />
      <TechStackSection />
      <Divider my={10} />
      {/* <SideProjectSection /> */}
    </Container>
  );
}