import { HStack, VStack } from "@chakra-ui/react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navigation() {
  return (
    <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm flex">
      <HStack spacing={2} justify='space-between'>
        <a
          className="fixed left-0 top-0 flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto lg:rounded-xl lg:border lg:p-4"
          href="https://dexscreener.com/polygon/0x929dc263103f4469c8ec02c2117be24b5fc3e0a7"
          rel="noopener noreferrer"
          target="_blank"
        > $SILLY</a>
        <a
          className="fixed left-0 top-0 flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto lg:rounded-xl lg:border lg:p-4"
          href="/"
          rel="noopener noreferrer"
        > home</a>
        <a
          className="fixed left-0 top-0 flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto lg:rounded-xl lg:border lg:p-4"
          href="/poke"
          rel="noopener noreferrer"
        > poke</a>
        <a
          className="fixed left-0 top-0 flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto lg:rounded-xl lg:border lg:p-4"
          href="/leaderboard"
          rel="noopener noreferrer"
        > leaderboard</a>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          by bobs and jac
        </div>
        <ConnectButton />
      </HStack>
    </div>)
}