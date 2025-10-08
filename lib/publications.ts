import path from "path";
import { remark } from "remark";
import fs from "fs";
import matter from "gray-matter";
import html from "remark-html";

const postsDirectory = "./content/publications/";

type Props = {
  id: string;
  contentHtml: string;
  title: string;
  date: string;
};

export async function getAllPublications(): Promise<Props[]> {
const fileNames = fs.readdirSync(postsDirectory).filter((f) => f.endsWith(".md"));

const posts = await Promise.all(
    fileNames.map(async (fileName) => {
        const id = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);

        const processedContent = await remark().use(html).process(matterResult.content);
        const contentHtml = processedContent.toString();

        return {
            id,
            contentHtml,
            title: matterResult.data.title,
            date: matterResult.data.date,
            ...matterResult.data,
        } as Props;
    })
);

posts.sort((a, b) => {
    if (a.date && b.date) return a.date < b.date ? 1 : -1;
    return 0;
});

return posts;
}

export async function getPublicationData(id: string): Promise<Props> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const matterResult = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  console.log({
    id,
    contentHtml,
    ...matterResult.data,
  });

  return {
    id,
    contentHtml,
    title: matterResult.data.title,
    date: matterResult.data.date,
    ...matterResult.data,
  };
}
