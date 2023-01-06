import React, { useEffect, useState } from "react";
import tweet from "../sanity/schemas/tweet";
import { Comment, Tweet } from "../typings";
import TimeAgo from "react-timeago";
import { ArrowsRightLeftIcon, ArrowUpTrayIcon, ChatBubbleLeftRightIcon, HeartIcon } from "@heroicons/react/24/outline";
import { fetchComments } from "../utils/fetchComments";
import comment from "../sanity/schemas/comment";
import { useSession } from "next-auth/react";

interface Props {
  tweet: Tweet;
}

//scrollbar-hide
function Tweet({ tweet }: Props) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");
  const { data: session } = useSession();

  const refreshComments = async () => {
    const comments: Comment[] = await fetchComments(tweet._id);
    setComments(comments);
  };

  useEffect(() => {
    refreshComments();
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {};

  return (
    <div className="flex flex-col space-x-3 border-y p-5 border-gray-100 p-5">
      <div className="flex space-x-3">
        <img className="h-10 w-10 rounded-full object-cover" src={tweet.profileImg} alt="" />
        <div>
          <div className="flex items-center space-x-1">
            <p className="mr-1 font-bold">{tweet.username}</p>
            <p className="hidden text-sm text-gray-500 sm:inline">
              @{tweet.username.replace(/\s+/g, "").toLowerCase()}
            </p>

            <TimeAgo className="text-sm text-gray-500" date={tweet._createdAt} />
          </div>

          <p className="pt-1">{tweet.text}</p>

          {tweet.image && <img src={tweet.image} alt="" className="m-5 ml-0 mb-1 max-h-60 rounded-lg shadow-sm" />}
        </div>
      </div>
      <div className="mt-5 flex justify-between">
        <div
          onClick={() => session && setCommentBoxVisible(!commentBoxVisible)}
          className="flex cursor-pointer items-center space-x-3 text-gray-400"
        >
          <ChatBubbleLeftRightIcon onClick={() => setCommentBoxVisible(!commentBoxVisible)} className="h-5 w-5" />
          <p>{comments.length}</p>
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ArrowsRightLeftIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <HeartIcon className="h-5 w-5" />
        </div>
        <div className="flex cursor-pointer items-center space-x-3 text-gray-400">
          <ArrowUpTrayIcon className="h-5 w-5" />
        </div>
      </div>

      {commentBoxVisible && (
        <form className="mt-3 flex space-x-3" onClick={handleSubmit}>
          <input
            value={input}
            className="rounded-lg flex-1 bg-gray-100 p-2 outline-none"
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Write a comment ..."
          />
          <button disabled={!input} type="submit" className="text-twitter disabled:text-gray-200">
            Post
          </button>
        </form>
      )}

      {comments?.length > 0 && (
        <div className="my-x mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-100 p-5 scrollbar-hide">
          {comments.map((comment) => (
            <div key={comment._id} className="relative flex space-x-2">
              <hr className="absolute left-5 top-10 h-8 border-x border-twitter/30" />
              <img src={comment.profileImg} alt="" className="mt-2 h-7 w-7 rounded-full object-cover" />
              <div>
                <div className="flex items-center space-x-1">
                  <p className="mr-1 font-bold">{comment.username}</p>
                  <p className="hidden text-sm text-gray-500 lg:inline">
                    @{comment.username.replace(/\s+/g, "").toLowerCase()}
                  </p>
                  <TimeAgo className="text-sm text-gray-500" date={comment._createdAt} />
                </div>
                <p>{comment.comment}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tweet;
