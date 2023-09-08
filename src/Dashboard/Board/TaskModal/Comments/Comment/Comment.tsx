import moment from "moment";
import styles from "./Comment.module.scss";
import { Avatar, Button, Members } from "~/shared/components";
import { useRef, useState } from "react";

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
  const [commentUserId, setCommentUserId] = useState<string>(
    comment.users_permissions_user
  );
  const [edit, setEdit] = useState<boolean>(false);
  const [commentContent, setCommentContent] = useState<string>(comment.content);

  const inputRef = useRef<HTMLInputElement>(null);

  let image = comment.users_permissions_user.avatar;
  if (image === null) {
    image = comment.users_permissions_user.name[0].toUpperCase();
  }

  // convert the date to a mm/dd/yyyy format and show the time it was done from this 2023-02-16T04:19:40.734Z
  let date = moment(comment.createdAt).fromNow();

  // checks if the createdAt date is older than the publishedAt date
  let wasEdited = moment(comment.publishedAt) > moment(comment.createdAt);

  if (wasEdited) {
    date = `${date} (edited)`;
  }

  function handleEdit() {
    setEdit(true);
    setTimeout(() => {
      if (inputRef.current !== null) {
        console.log("yo");
        inputRef.current.focus();
      }
    }, 200);
  }

  const handleSave = () => {
    if (commentContent !== "") {
      setEdit(false);
      if (commentContent !== comment.content) {
        updateComment(comment.id, commentContent);
      }
    }
  };

  const handleCancel = () => {
    setEdit(false);
    setCommentContent(comment.content);
  };

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && edit === true && comment !== "") {
      handleSave();
    }
    if (e.key === "Escape" && edit === true) {
      handleCancel();
    }
  }

  return (
    <div className={styles.main} onKeyDown={(e) => handleKeyDown(e)}>
      <div className={styles.user}>{image && <Avatar avatar={image} />}</div>
      <div className={styles["comment-container"]}>
        <div className={styles["comment-header"]}>
          <p className={styles.name}>{comment.users_permissions_user.name}</p>
          <p className={styles.date}>{date} </p>
        </div>
        {!edit ? (
          <p className={styles.comment}>{commentContent}</p>
        ) : (
          <input
            className={styles.comment}
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            ref={inputRef}
          />
        )}
        {userId === commentUserId ? (
          <div
            className={styles["bottom-bttns"]}
            style={!edit ? { display: "" } : { display: "none" }}
          >
            <p
              onClick={() => {
                handleEdit();
              }}
            >
              Edit
            </p>
            <p onClick={() => deleteComment(comment.id)}>Delete</p>
          </div>
        ) : (
          <div className={styles["bottom-bttns"]}>{/* <p>Reply</p> */}</div>
        )}
        {edit ? (
          <div className={styles.buttons}>
            <Button
              variant={"primary"}
              handleClick={() => handleSave()}
              space={true}
            >
              Save
            </Button>
            <Button variant={"secondary"} handleClick={() => handleCancel()}>
              Cancel
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CommentData;

/*

  1) On click edit
        Text should turn into an input field
            - Make an input field that is the same size as the comment
            - onlcik should switch to an input field
        Also need the buttons below it
        On click save, it should update the comment
        On click cancel, it should revert back to the original comment



console.log(comment);

  // const fetchComment = async () => {
  //   try {
  //     const res = await axios.get(
  //       `https://strapi-production-7520.up.railway.app/api/comments/${comment.id}?populate=*`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
  //         },
  //       }
  //     );
  //     setUser(res.data.data.attributes.users_permissions_user.data.attributes);
  //     setCommentUserId(res.data.data.attributes.users_permissions_user.data.id);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // useEffect(() => {
  //   fetchComment();
  // }, [comment]);





*/
