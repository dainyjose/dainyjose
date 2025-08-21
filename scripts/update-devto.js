const fs = require("fs");
const fetch = require("node-fetch");

const username = "dainy_jose";
const readmePath = "./README.md";

async function updateDevtoSection() {
  try {
    const res = await fetch(`https://dev.to/api/articles?username=${username}&per_page=5`);
    const articles = await res.json();

    let devtoSection = "## 📝 Latest Dev.to Articles\n\n";
    articles.forEach(article => {
      devtoSection += `- [${article.title}](${article.url})\n`;
    });
    devtoSection += `\n[See all articles on Dev.to →](https://dev.to/${username})\n`;

    let readme = fs.readFileSync(readmePath, "utf-8");

    const newReadme = readme.replace(
      /<!-- DEVTO-START -->[\s\S]*<!-- DEVTO-END -->/,
      `<!-- DEVTO-START -->\n${devtoSection}\n<!-- DEVTO-END -->`
    );

    fs.writeFileSync(readmePath, newReadme, "utf-8");
    console.log("README updated with latest Dev.to articles!");
  } catch (error) {
    console.error("Error updating Dev.to articles:", error);
    process.exit(1);
  }
}

updateDevtoSection();
