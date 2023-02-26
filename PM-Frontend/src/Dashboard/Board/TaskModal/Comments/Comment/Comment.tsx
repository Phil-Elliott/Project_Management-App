import moment from "moment";
import styles from "./Comment.module.scss";
import { Avatar, Members } from "~/shared/components";
import axios from "axios";
import { useEffect, useState } from "react";

type CommentDataProps = {
  comment: any;
  deleteComment: (commentId: string) => void;
  updateComment: (commentId: string, content: string) => void;
  userId: string;
};

const CommentData = ({
  comment,
  deleteComment,
  updateComment,
  userId,
}: CommentDataProps) => {
  const [user, setUser] = useState<any>({});
  const [commentUserId, setCommentUserId] = useState<string>("");

  const fetchComment = async () => {
    try {
      const res = await axios.get(
        `http://localhost:1337/api/comments/${comment.id}?populate=*`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      setUser(res.data.data.attributes.users_permissions_user.data.attributes);
      setCommentUserId(res.data.data.attributes.users_permissions_user.data.id);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchComment();
  }, [comment]);

  let image = user.avatar;
  if (image === null) {
    image = user.username[0].toUpperCase();
  }

  // convert the date to a mm/dd/yyyy format and show the time it was done from this 2023-02-16T04:19:40.734Z
  // const date = moment(comment.attributes.publishedAt).format("MMM Do YYYY");
  let date = moment(comment.attributes.createdAt).fromNow();

  // checks if the createdAt date is older than the publishedAt date
  let wasEdited =
    moment(comment.attributes.publishedAt) >
    moment(comment.attributes.createdAt);

  if (wasEdited) {
    date = `${date} (edited)`;
  }

  return (
    <div className={styles.main}>
      <div className={styles.user}>{image && <Avatar avatar={image} />}</div>
      <div className={styles["comment-container"]}>
        <div className={styles["comment-header"]}>
          <p className={styles.name}>{user.username}</p>
          <p className={styles.date}>{date} </p>
        </div>
        <p className={styles.comment}>{comment.attributes.content}</p>
        {userId === commentUserId ? (
          <div className={styles["bottom-bttns"]}>
            {/* <p>Edit</p> */}
            <p onClick={() => deleteComment(comment.id)}>Delete</p>
          </div>
        ) : (
          <div className={styles["bottom-bttns"]}>{/* <p>Reply</p> */}</div>
        )}
      </div>
    </div>
  );
};

export default CommentData;

// const getDays = () => {
//   const current = moment();
//   const diff = current.diff(comment.date, "days");
//   console.log(diff);
//   if (diff === 0) {
//     return "Today";
//   } else if (diff === 1) {
//     return "Yesterday";
//   } else {
//     return `${diff} days ago`;
//   }
// };

// const date = getDays();
