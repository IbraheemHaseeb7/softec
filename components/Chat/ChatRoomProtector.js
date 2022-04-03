import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../../library/firebase";
import { useRouter } from "next/router";

export default function ChatRoomProtector({ children, room }) {
  const router = useRouter();

  // setting up state management for verification purposes
  const [verify, setVerify] = useState(false);

  useEffect(() => {
    for (let counter = 0; counter < room.uid.length; counter++) {
      if (room.uid[counter] === auth.currentUser?.uid) {
        setVerify(true);
      }
    }
  }, [router.query?.rooms]);

  return (
    <>
      {verify ? (
        children
      ) : (
        <div>
          <h1>Ooopsieee....You can't see this chat brothaaa</h1>
          <Link href="/feed">
            <button className="btn">Go Home</button>
          </Link>
        </div>
      )}
    </>
  );
}
