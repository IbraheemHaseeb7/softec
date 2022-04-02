import styles from "./doctor.module.css";

const dummy_review = [
  {
    name: "Laiba",
    img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    content: "This was a great doctor",
    stars: 4,
  },
  {
    name: "Laiba",
    img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    content:
      "That was an excellent service. I really enjoyed it. I highly recommend this doctor",
    stars: 5,
  },
  {
    name: "Laiba",
    img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    content: "This was a great doctor",
    stars: 4,
  },
  {
    name: "Laiba",
    img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    content:
      "That was an excellent service. I really enjoyed it. I highly recommend this doctor",
    stars: 5,
  },
  {
    name: "Laiba",
    img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    content: "This was a great doctor",
    stars: 4,
  },
  {
    name: "Laiba",
    img: "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
    content:
      "That was an excellent service. I really enjoyed it. I highly recommend this doctor",
    stars: 5,
  },
];

export default function Reviews({ available }) {
  return (
    <div className={styles.reviews_container}>
      <h1>Reviews</h1>
      {available ? <Review reviews={dummy_review} /> : <h2>Not Rated Yet</h2>}
    </div>
  );
}

function Review({ reviews }) {
  return (
    <div className={styles.review}>
      {reviews.map(({ name, img, content, stars }) => {
        return (
          <div>
            <img src={img} alt={name} />
            <h3>{name}</h3>
            <h3>⭐⭐⭐⭐</h3>
            <p>{content}</p>
          </div>
        );
      })}
    </div>
  );
}
