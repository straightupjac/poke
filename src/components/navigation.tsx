import { HStack } from "@chakra-ui/react";
import Link from "next/link";
import { SignInWithFarcaster } from "./SignInWithFarcaster";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Navigation() {

  return (
    <HStack spacing={1} justify='space-between' width='100%'>
      <Link
        className="fixed left-0 top-0 flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto lg:rounded-xl lg:border lg:p-4"
        href="/"
      > home</Link>
      <Link
        className="fixed left-0 top-0 flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto lg:rounded-xl lg:border lg:p-4"
        href="/poke"
      > poke</Link>
      <Link
        className="fixed left-0 top-0 flex w-full justify-center pb-6 pt-8 lg:static lg:w-auto lg:rounded-xl lg:border lg:p-4"
        href="/leaderboard"
        rel="noopener noreferrer"
      > leaderboard</Link>
      <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        by bobs and jac
      </div>
      {/* <SignInWithFarcaster /> */}
      <ConnectButton />
    </HStack>
  )
}