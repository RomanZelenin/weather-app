import { HStack, Stack, Text } from "@chakra-ui/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { Time } from "./Time";

export const Header = () => {
  return (
    <Stack direction={{ base: "column", md: "row" }} justify={"center"} align={'center'}>
      <Text fontSize={"28px"}>Погода на неделю</Text>
      <HStack position={{ base: "inherit", md: "absolute" }} right={"16px"}>
        <Time />
        <ThemeSwitcher />
      </HStack>
    </Stack>
  );
};
