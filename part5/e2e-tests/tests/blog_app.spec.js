const { test, expect, describe, beforeEach } = require("@playwright/test");
const { loginWith, createBlog } = require("./helper");
const { create } = require("node:domain");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");
    await request.post("/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });
    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    const usernameTextbox = await page.getByRole("textbox", {
      name: "username",
    });
    const passwordTextbox = await page.getByRole("textbox", {
      name: "password",
    });
    await expect(usernameTextbox).toBeVisible();
    await expect(passwordTextbox).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await loginWith(page, "mluukkai", "salainen");
      await expect(page.getByText("Matti Luukkainen logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await loginWith(page, "mluukkai", "salaineN");
      await expect(
        page.getByText("Matti Luukkainen logged in"),
      ).not.toBeVisible();
      await expect(page.getByText("wrong username or password")).toBeVisible();
    });
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "mluukkai", "salainen");
    });

    test("a new blog can be created", async ({ page }) => {
      await createBlog(page);

      await expect(
        page.getByText("a new blog Some Blog by Some"),
      ).toBeVisible();
    });

    describe("and a blog exists", async () => {
      beforeEach(async ({ page }) => {
        await createBlog(page);
      });

      test("a new blog can be liked", async ({ page }) => {
        await expect(page.getByText("Some Blog Some Author")).toBeVisible();
        await page.getByRole("button", { name: "view" }).first().click();
        await page.getByRole("button", { name: "like" }).click();
        await expect(page.getByText("likes: 1")).toBeVisible();
      });

      test("the blog can be deleted", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).first().click();
        await page.getByRole("button", { name: "delete" }).click();
        page.on("dialog", (dialog) => dialog.accept());

        await expect(
          page.getByText("Some Blog Some Authorview"),
        ).not.toBeVisible();
      });

      test("the delete button is only visible for the creator", async ({
        page,
        request,
      }) => {
        await request.post("/api/users", {
          data: {
            name: "Harry Hirsch",
            username: "harryhirsch",
            password: "hirsch123",
          },
        });

        await page.getByRole("button", { name: "logout" }).click();
        await loginWith(page, "harryhirsch", "hirsch123");

        await page.getByRole("button", { name: "view" }).first().click();
        await expect(
          page.getByRole("button", { name: "delete" }),
        ).not.toBeVisible();
      });
    });

    describe("and multiple blogs exist", async () => {
      beforeEach(async ({ page }) => {
        await createBlog(page);
        await createBlog(page);
        await createBlog(page);
      });

      test("the blogs are sorted by number of likes", async ({ page }) => {
        await page.getByRole("button", { name: "view" }).nth(0).click();
        await page.getByRole("button", { name: "view" }).nth(0).click();
        await page.getByRole("button", { name: "view" }).nth(0).click();

        await page.getByRole("button", { name: "like" }).nth(2).click();
        await expect(page.getByText(/likes: 1/i).nth(0)).toBeVisible();
        await page.getByRole("button", { name: "like" }).nth(2).click();
        await expect(page.getByText(/likes: 2/i).nth(0)).toBeVisible();
        await page.getByRole("button", { name: "like" }).nth(1).click();
        await expect(page.getByText(/likes: 1/i).nth(0)).toBeVisible();

        await page.goto("/");

        await page.getByRole("button", { name: "view" }).nth(0).click();
        await page.getByRole("button", { name: "view" }).nth(0).click();
        await page.getByRole("button", { name: "view" }).nth(0).click();

        const getLikes = async (nth) => {
          const text = await page
            .getByText(/likes:/i)
            .nth(nth)
            .innerText();
          return parseInt(text.match(/\d+/)[0]);
        };

        const likes0 = await getLikes(0);
        const likes1 = await getLikes(1);
        const likes2 = await getLikes(2);
        expect(likes0 >= likes1 >= likes2);
      });
    });
  });
});
