import PostList from "@/components/Post/PostList";

type Props = {
  posts: any;
};
const ListPostOfGroup = ({ posts }: Props) => {
  console.log(posts);
  return (
    <>
      {!posts ? (
        <p className="mt-10 text-center">Không có bài viết nào </p>
      ) : (
        <>
          <PostList posts={posts} />
        </>
      )}
    </>
  );
};

export default ListPostOfGroup;
