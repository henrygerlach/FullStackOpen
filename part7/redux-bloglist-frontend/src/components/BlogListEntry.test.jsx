import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

vi.mock("../services/blogs", () => ({
  default: {
    update: vi.fn().mockResolvedValue({}),
  },
}));

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

describe("<Blog />", () => {
  beforeEach(() => {
    render(<Blog blog={blog} />);
  });

  test("renders title and author, but not likes and url", async () => {
    screen.getByText(blog.title, { exact: false });
    screen.getByText(blog.author, { exact: false });

    const likes = screen.queryByText(`likes: ${blog.likes}`);
    const url = screen.queryByText(blog.url);
    expect(likes).toBeNull();
    expect(url).toBeNull();
  });

  test("renders complete blog, when view button is clicked", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("view");
    await user.click(button);

    screen.getByText(blog.title, { exact: false });
    screen.getByText(blog.author, { exact: false });
    screen.getByText(`likes: ${blog.likes}`, { exact: false });
    screen.getByText(blog.url, { exact: false });
  });

  test("calls handleLike twice, when like button is clicked twice", async () => {
    const user = userEvent.setup();

    // show entire blog
    const viewButton = screen.getByText("view");
    await user.click(viewButton);

    // click like button twice
    const likeButton = screen.getByText("like");
    await user.click(likeButton);
    await user.click(likeButton);

    screen.getByText(`likes: ${blog.likes + 2}`, { exact: false });
  });
});
