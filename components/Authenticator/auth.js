import { useContext } from "react";
import { AuthContext } from "../../pages/_app";

export default function Authenticator({ children }) {
  const context = useContext(AuthContext);

  return (
    <>
      {context.auther ? (
        children
      ) : (
        <div>
          <h1>You are not allowed to view this page</h1>
        </div>
      )}
    </>
  );
}
