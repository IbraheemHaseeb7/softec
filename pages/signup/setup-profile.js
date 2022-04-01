import Authenticator from "../../components/Authenticator/auth";
import NewUser from "../../components/newuser/newuser";

export default function ProfileSetup() {
  return (
    <Authenticator>
      <NewUser />
    </Authenticator>
  );
}
