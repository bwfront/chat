import { getXataClient } from "@/src/xata";
import { currentUser } from "@clerk/nextjs";
import UserClick from "./UserClick";


export default async function Users() {
  const xataClient = getXataClient();
  const user = await currentUser();

  if (!user) return <div></div>;

  const newUser = await xataClient.db.users
    .filter({
      uid: user!.id,
    })
    .getMany();

  if (newUser.length === 0) {
    const cre = await xataClient.db.users.create({
      uid: user!.id,
      username: user!.username,
      imageUrl: user!.imageUrl,
    });
  }

  if (newUser[0].uid == user!.id) {
    const up = await xataClient.db.users.update({
      id: newUser[0].id,
      username: user!.username,
      imageUrl: user!.imageUrl,
    });
  }
  
  const users = await xataClient.db.users.getMany();

  type User = {
    username: string | 'username';
    imageUrl: string;
    id: string;
  };

  const backUpImageUrl = 'https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yWnl1ZlNFRThRUU1McldyZlQ5bmYyb0paeEIiLCJyaWQiOiJ1c2VyXzJaekZRb0NkVGJzV2pQWHBGOWJhdE1UeldmciJ9'

  if (users.length > 0) {
    const props: User[] = []
    users.forEach(element => {
        props.push({
            username: element.username || 'username',
            imageUrl: element.imageUrl || backUpImageUrl,
            id: element.id,
        });
    });

    return <UserClick users={props} />;
  }
}
