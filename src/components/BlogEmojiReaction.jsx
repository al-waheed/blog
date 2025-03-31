import { useState } from "react";
import EmojiPicker from "emoji-picker-react";

const BlogEmojiReactions = () => {
  const [selectedEmoji, setSelectedEmoji] = useState("");

  return (
    <div>
      <h3>React to this post</h3>
      <EmojiPicker onEmojiClick={(emoji) => setSelectedEmoji(emoji.emoji)} />
      <p>Selected: {selectedEmoji}</p>
    </div>
  );
};

export default BlogEmojiReactions;
