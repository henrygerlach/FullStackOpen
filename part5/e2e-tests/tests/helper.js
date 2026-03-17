const loginWith = async (page, username, password) => {
  await page
    .getByRole("textbox", {
      name: "username",
    })
    .fill(username);
  await page
    .getByRole("textbox", {
      name: "password",
    })
    .fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createBlog = async (page) => {
  await page.getByRole("button", { name: "create new blog" }).click();

  await page.getByRole("textbox", { name: "title:" }).fill("Some Blog");
  await page.getByRole("textbox", { name: "url:" }).fill("some-url.com");
  await page.getByRole("textbox", { name: "author:" }).fill("Some Author");

  await page.getByRole("button", { name: "create" }).click();
};

export { loginWith, createBlog };
