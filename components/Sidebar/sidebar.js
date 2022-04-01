import Onebox from "./onebox";
import styles from "./sidebar.module.css";

// array for the boxes
const boxes = [
  {
    title: "Home",
    array_of_fields: [
      { router: "/feed", name: "Feed" },
      { router: "/postnew", name: "Post New" },
      { router: "/", name: "Home" },
    ],
  },
  {
    title: "Profile",
    array_of_fields: [
      { router: "/signup", name: "Sign Up" },
      { router: "/signup", name: "Sign Out" },
    ],
  },
];

export default function Sidebar() {
  return (
    <div className={styles.sidebar_container}>
      <div>
        {boxes.map(({ title, array_of_fields }) => {
          return <Onebox title={title} array_of_fields={array_of_fields} />;
        })}
      </div>
    </div>
  );
}
