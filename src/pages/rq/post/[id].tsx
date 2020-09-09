import { Flex, Box } from "@chakra-ui/core"
import { NextPageContext } from "next"
import { RqPost } from "../../../layouts/Home/RqPosts"
import Link from "next/link"

type PageProps = {
  id: string
}
function Page({ id }: PageProps) {
  return (
    <>
      <RqPost id={id} />
    </>
  )
}

Page.getInitialProps = (ctx: NextPageContext) => {
  const { id } = ctx.query
  return { id }
}

export default Page
