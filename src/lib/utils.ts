import { Post } from "../types";

export const validTitle = (title: string) => {
  title = title.trim();
  return title.length > 0;
}

export const validContent = (content: string) => {
  content = content.trim();
  return content.length > 0 && content.length < 300;
}

export const postChanged = (post: Post | null, title: string, content: string) => {
  if (post == null) {
    return true;
  }
  title = title.trim();
  content = content.trim();
  return post.title !== title || post.content !== content;
}

export const validUpdate = (title: string, content: string, post?: Post | null) => {
  if (post && !postChanged(post, title, content)) {
    return false;
  }

  return validTitle(title) && validContent(content);
}
