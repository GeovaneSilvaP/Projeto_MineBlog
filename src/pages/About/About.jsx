//CSS
import styles from "./About.module.css";

//link
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o Mine <span>Blog</span>
      </h2>
      <p>
        Este projeto consiste em um blog com React no front-end e Firebase no
        back-end.
      </p>
      <Link to="/posts/create" className="btn">
        Criar Post
      </Link>
    </div>
  );
};

export default About;
