import CreateBlog from "./CreateBlog";
import Toggleable from "./Toggleable";

const CreateBlogToggleable = ({ toggleCreateBlogRef }) => {
  return (
    <div className="mb-2">
      <Toggleable buttonLabel="create new blog" ref={toggleCreateBlogRef}>
        <CreateBlog toggleCreateBlogRef={toggleCreateBlogRef} />
      </Toggleable>
    </div>
  );
};

export default CreateBlogToggleable;
