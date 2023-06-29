import React, { useEffect } from 'react';
import classes from './Posts.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getTimelineposts } from '../../actions/postAction';
import { useParams } from 'react-router-dom';
import Post from '../Post/Post';

const Posts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  const params = useParams();

  useEffect(() => {
    dispatch(getTimelineposts(user._id));
  }, []);

  if (!posts) return "No posts";

  if (params.id) {
    posts = posts.filter((post) => post.userId === params.id);
  }

  return (
    <div className={classes.Posts}>
      {loading ? "Fetching..." : posts.map((post) => (
        <Post key={post._id} data={post} />
      ))}
    </div>
  );
};

export default Posts;
