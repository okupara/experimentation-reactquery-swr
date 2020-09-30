import type { NextPageContext } from "next"
import { RqTasks } from "../../layouts/Tasks"

type Props = {
  id: string | null
}
export default function Index(props: Props) {
  return <RqTasks {...props} />
}
// export async function getStaticProps(context: NextPageContext) {
//   console.log("getStaticProps", context.query)
//   const id = context.query?.id
//   return {
//     props: id
//       ? {
//           id,
//         }
//       : {},
//   }
// }

// export async function getServerSideProps(context: NextPageContext) {
//   console.log("getServerProps", context.query)
//   const id = context.query?.id
//   return {
//     props: id
//       ? {
//           id,
//         }
//       : {},
//   }
// }
