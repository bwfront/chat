
import { auth } from "@clerk/nextjs";


export default function Home() {
  const { userId } = auth();

  return <div>not loged in</div>;
}
