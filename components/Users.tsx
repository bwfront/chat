import { currentUser } from "@clerk/nextjs";
import UserClick from "./UserClick";
import supabase from "@/lib/supabase";

export default async function Users() {
  const user = await currentUser();

  if (!user) return <div></div>;

  const newUser = await supabase
    .from("users")
    .select()
    .filter("uid", "eq", user!.id);

  const userdata = {
    uid: user!.id,
    username: user!.username,
    imageUrl: user!.imageUrl,
  };

  if (newUser.data?.length === 0) {
    await supabase.from("users").insert(userdata);
  } else {
    await supabase.from("users").update(userdata).eq("id", newUser.data![0].id);
  }
  console.log(user.id)
  const users = await supabase.from("users").select().neq('uid', user.id);

  type User = {
    username: string | "username";
    imageUrl: string;
    uid: string;
  };

  const backUpImageUrl =
    "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yWnl1ZlNFRThRUU1McldyZlQ5bmYyb0paeEIiLCJyaWQiOiJ1c2VyXzJaekZRb0NkVGJzV2pQWHBGOWJhdE1UeldmciJ9";

  if (users.data!.length > 0) {
    const props: User[] = [];
    users.data!.forEach((element) => {
      props.push({
        username: element.username || "username",
        imageUrl: element.imageUrl || backUpImageUrl,
        uid: element.uid,
      });
    });

    return <UserClick users={props} />;
  }
}
