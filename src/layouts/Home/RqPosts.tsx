import * as React from "react"
import { usePosts, usePost } from "../../hooks/useRqPosts"
import { Heading, VStack, Flex, Box, Text } from "@chakra-ui/core"
import { Spinner } from "@chakra-ui/spinner"
import Link from "next/link"

export function RqPosts() {
  const postsInfo = usePosts()
  return (
    <>
      <Flex alignItems="center">
        <Box>
          <Heading as="h2">Posts</Heading>
        </Box>
        {!postsInfo.isLoading && postsInfo.isFetching && (
          <Box pl={4}>
            <Spinner size="sm" />
          </Box>
        )}
      </Flex>
      {postsInfo.isLoading && (
        <Box pl={4}>
          <Spinner />
        </Box>
      )}
      {postsInfo.data && (
        <VStack alignItems="start" pl={4}>
          {postsInfo.data.map((post) => (
            <Link href="/rq/post/[id]" as={`/rq/post/${post.id}`} key={post.id}>
              <a>{post.title}</a>
            </Link>
          ))}
        </VStack>
      )}
    </>
  )
}

type RqPostProps = {
  id: string
}
export function RqPost({ id }: RqPostProps) {
  const postInfo = usePost(id)
  return (
    <Box pl={4}>
      <Box>
        <Link href="/rq/posts">
          <a>back</a>
        </Link>
      </Box>
      <Box>
        <Text>count:{postInfo.count}</Text>
      </Box>
      <Box>
        {postInfo.isLoading && <Spinner />}
        {postInfo.data && (
          <>
            <Heading as="h3">{postInfo.data.title}</Heading>
            <Text mt={8} pt={4}>
              {postInfo.data.body}
            </Text>
          </>
        )}
      </Box>
      {!postInfo.isLoading && postInfo.isFetching && <Box pt={8}>Fetching...</Box>}
    </Box>
  )
}
