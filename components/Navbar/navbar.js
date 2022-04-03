import { signOut } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { auth } from "../../library/firebase";
import { AuthContext } from "../../pages/_app";
import styles from "./navbar.module.css";

export default function Navbar() {
  // setting up router
  const router = useRouter();

  // getting the auth checker
  const { auther } = useContext(AuthContext);

  return (
    <nav className={styles.navbar_container}>
      <Link href="/feed">
        <h1>{auth.currentUser?.email}</h1>
      </Link>
      <div className={styles.navigations}>
        <Link href="/">
          <span className={styles.navbar_spans}>Home</span>
        </Link>
        <Link href="/signup">
          <span className={styles.navbar_spans}>Sign Up</span>
        </Link>
        {auther && (
          <>
            <Link href="/postnew">
              <span className={styles.navbar_spans}>Post New</span>
            </Link>
            <div
              onClick={async () => {
                await signOut(auth);

                router.push("/signup");
              }}
            >
              <span className={styles.navbar_spans}>Sign Out</span>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
