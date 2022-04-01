import { Link } from "@mui/material";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useContext } from "react";
import { auth } from "../../library/firebase";
import { AuthContext } from "../../pages/_app";
import styles from "./signup.module.css";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function SignUpForm() {
  // setting up some hooks
  const context = useContext(AuthContext);
  const router = useRouter();

  // handling submissions
  async function handleSubmit(e) {
    e.preventDefault();

    // signing in using google authentication
    await signInWithPopup(auth, new GoogleAuthProvider());

    if (!context.account) {
      router.push("/signup/setup-profile");
    } else {
      toast.success("Signed In Successfully");
      router.push("/feed");
    }
  }

  async function handleSignOut(e) {
    signOut(auth);
  }

  return (
    <div className={styles.sign_up_form_container}>
      {!context.auther ? (
        <button className="btn" onClick={handleSubmit} type="submit">
          Sign In With Google
        </button>
      ) : (
        <>
          <button className="btn" onClick={handleSignOut} type="submit">
            Sign Out from Google
          </button>
          <Link href="/">
            <button type="button" className="btn">
              Go Home
            </button>
          </Link>
          <Link href="/signup/setup-profile">
            <button type="button" className="btn">
              Set Up Profile
            </button>
          </Link>
        </>
      )}
    </div>
  );
}
