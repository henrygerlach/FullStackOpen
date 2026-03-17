import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import blogService from "../services/blogs";
import CreateBlog from "./CreateBlog";

const blog = {
  author: "Harry Hirsch",
  id: "69b8308b14730a22a632acb3",
  likes: 67,
  title: "Some Blog",
  url: "nett-hier.com",
  user: {
    id: "69b7db104340b04cd2db1a80",
    name: "Harry",
    username: "Harry Elch",
  },
};

vi.mock("../services/blogs", () => ({
  default: {
    create: vi.fn().mockResolvedValue({}),
  },
}));

describe("<CreateBlog />", () => {
  beforeEach(() => {
    render(
      <CreateBlog
        updateNotification={vi.fn()}
        toggleCreateBlogRef={{ current: { toggleVisibility: vi.fn() } }}
      />,
    );
  });

  test("creates a blog correctly", async () => {
    const titleInput = screen.getByLabelText("title:");
    const urlInput = screen.getByLabelText("url:");
    const authorInput = screen.getByLabelText("author:");

    const user = userEvent.setup();
    await user.type(titleInput, "Some Blog");
    await user.type(urlInput, "nett-hier.com");
    await user.type(authorInput, "Harry Hirsch");

    const createButton = screen.getByText("create");
    await user.click(createButton);

    expect(blogService.create).toHaveBeenCalledWith({
      title: "Some Blog",
      url: "nett-hier.com",
      author: "Harry Hirsch",
    });
  });
});
