import Feed from "./Feed";
const navigate = () => {};

describe("Feed", () => {
  it("Calls the /posts endpoint and lists all the posts", () => {
    window.localStorage.setItem("token", "fakeToken");
    cy.mount(<Feed navigate={navigate} />);

    cy.intercept("GET", "/posts", (req) => {
      req.reply({
        statusCode: 200,
        body: {
          posts: [
            { _id: 1, message: "Hello, world", createdAt: Date.now(), author: { name: "Andy" }},
            { _id: 2, message: "Hello again, world", createdAt: Date.now(), author: { name: "Will" } },
          ],
        },
      });
    }).as("getPosts");

    cy.wait("@getPosts").then(() => {
      cy.get('[data-cy="post"]')
        .should("contain.text", "Hello, world")
        .and("contain.text", "Andy")
        .and("contain.text", "Hello again, world")
        .and("contain.text", "Will");
    });
  });
});
