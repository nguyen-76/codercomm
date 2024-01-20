import { Button, IconButton, Stack, Typography } from "@mui/material";
import ThumbDownAltRoundedIcon from "@mui/icons-material/ThumbDownAltRounded";
import ThumbUpRoundedIcon from "@mui/icons-material/ThumbUpRounded";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteComment, sendCommentReaction } from "./commentSlice";
import CommentDelete from "./CommentDelete";

function CommentReaction({ comment }) {
  const dispatch = useDispatch();
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const handleDeleteConfirmOpen = () => setOpenDeleteConfirm(true);
  const handleDeleteConfirmClose = () => setOpenDeleteConfirm(false);

  const handleClick = (emoji) => {
    dispatch(sendCommentReaction({ commentId: comment._id, emoji }));
  };

  const handleDeleteComment = (id) => {
    dispatch(deleteComment(id));
    handleDeleteConfirmClose();
  };

  return (
    <Stack direction="row" alignItems="center">
      <IconButton
        onClick={() => handleClick("like")}
        sx={{ color: "primary.main" }}
      >
        <ThumbUpRoundedIcon sx={{ fontSize: 20 }} />
      </IconButton>
      <Typography variant="body2" mr={1}>
        {comment?.reactions?.like}
      </Typography>

      <IconButton
        onClick={() => handleClick("dislike")}
        sx={{ color: "error.main" }}
      >
        <ThumbDownAltRoundedIcon sx={{ fontSize: 20 }} />
      </IconButton>
      <Typography variant="body2">{comment?.reactions?.dislike}</Typography>
      <Button variant="text" color="error" onClick={handleDeleteConfirmOpen}>
        Delete
      </Button>
      <CommentDelete
        handleDeleteConfirmClose={handleDeleteConfirmClose}
        openDeleteConfirm={openDeleteConfirm}
        handleDeleteComment={handleDeleteComment}
        comment={comment}
      />
    </Stack>
  );
}

export default CommentReaction;
