import { render, screen } from "@testing-library/react-native";
import { RepositoryListContainer } from "../../src/components/RepositoryList";

const repositoryItems = {
  data: {
    repositories: {
      edges: [
        {
          node: {
            fullName: "jaredpalmer/formik",
            description: "Build forms in React, without the tears 😭 ",
            ownerAvatarUrl:
              "https://avatars.githubusercontent.com/u/4060187?v=4",
            stargazersCount: 33151,
            reviewCount: 5,
            forksCount: 2776,
            ratingAverage: 90,
            language: "TypeScript",
          },
        },
        {
          node: {
            fullName: "async-library/react-async",
            description: "🍾 Flexible promise-based React data loader",
            ownerAvatarUrl:
              "https://avatars.githubusercontent.com/u/54310907?v=4",
            stargazersCount: 2140,
            reviewCount: 3,
            forksCount: 94,
            ratingAverage: 72,
            language: "JavaScript",
          },
        },
      ],
    },
  },
};

describe("when repository list is not empty", () => {
  beforeEach(() =>
    render(<RepositoryListContainer query={{ ...repositoryItems }} />)
  );
  it("items display correct data", () => {
    repositoryItems.data.repositories.edges.forEach(({ node: item }) => {
      const container = screen.getByTestId(`repositoryItem-${item.fullName}`)
      expect(container).toHaveTextContent(item.fullName);
      expect(container).toHaveTextContent(item.description);
      expect(container).toHaveTextContent(item.language);
    })
  });
});
