import { useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, firestore } from "../../library/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function useAuth() {
  const [auther, setAuther] = useState(false);
  const [account, setAccount] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      setAuther(true);
      const accountCheck = async () => {
        await getDoc(doc(firestore, `users`, auth.currentUser?.uid)).then(
          (res) => {
            if (res.data() === undefined) {
              setAccount(false);
            } else {
              setAccount(true);
            }
          }
        );
      };
      accountCheck();
    } else {
      setAuther(false);
    }
  });

  return {
    auther,
    account,
  };
}
