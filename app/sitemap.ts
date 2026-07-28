import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";


const BASE_URL = "https://www.meggatronai.com";



function getRoutes(folder: string) {

  const directory = path.join(
    process.cwd(),
    "app",
    folder
  );


  if (!fs.existsSync(directory)) {
    return [];
  }


  return fs
    .readdirSync(directory, {
      withFileTypes: true,
    })
    .filter((item) => item.isDirectory())
    .map((item) => {

      return `${BASE_URL}/${folder}/${item.name}`;

    });

}




export default function sitemap(): MetadataRoute.Sitemap {


  const staticPages = [

    "",

    "about",

    "blog",

    "contact",

    "faq",

    "privacy-policy",

    "support",

    "terms-of-service",

  ];




  const staticRoutes = staticPages.map((page) => ({

    url:
      page === ""
        ? BASE_URL
        : `${BASE_URL}/${page}`,

    lastModified:
      new Date(),

    changeFrequency:
      "monthly" as const,

    priority:
      page === ""
        ? 1
        : 0.7,

  }));





  const toolRoutes = getRoutes("tools").map((route) => ({

    url:
      route,

    lastModified:
      new Date(),

    changeFrequency:
      "weekly" as const,

    priority:
      0.9,

  }));






  const blogRoutes = getRoutes("blog").map((route) => ({

    url:
      route,

    lastModified:
      new Date(),

    changeFrequency:
      "monthly" as const,

    priority:
      0.8,

  }));







  return [

    ...staticRoutes,

    ...toolRoutes,

    ...blogRoutes,

  ];

}