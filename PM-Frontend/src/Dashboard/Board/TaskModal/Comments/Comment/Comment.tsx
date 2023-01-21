import moment from "moment";
import styles from "./Comment.module.scss";
import { Members } from "~/shared/components";

type CommentDataProps = {
  comment: any;
};

const CommentData = ({ comment }: CommentDataProps) => {
  const getDays = () => {
    const current = moment();
    const diff = current.diff(comment.date, "days");
    console.log(diff);
    if (diff === 0) {
      return "Today";
    } else if (diff === 1) {
      return "Yesterday";
    } else {
      return `${diff} days ago`;
    }
  };

  const date = getDays();

  return (
    <div className={styles.main}>
      <div className={styles.user}>
        <Members members={[comment.member]} />
      </div>
      <div className={styles["comment-container"]}>
        <div className={styles["comment-header"]}>
          <p className={styles.name}>{comment.member}</p>
          <p className={styles.date}>{date} </p>
        </div>
        <p className={styles.comment}>{comment.comment}</p>
      </div>
    </div>
  );
};

export default CommentData;
