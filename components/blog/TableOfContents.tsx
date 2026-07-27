import React from "react";


interface TableOfContentsItem {
  id: string;
  title: string;
}


interface TableOfContentsProps {
  items: TableOfContentsItem[];
}


export default function TableOfContents({
  items,
}: TableOfContentsProps) {

  return (
    <aside
      className="
        mb-12
        rounded-3xl
        border
        border-white/10
        bg-white/5
        p-6
      "
    >

      <h2
        className="
          mb-5
          text-xl
          font-bold
          text-white
        "
      >
        Table of Contents
      </h2>


      <nav>

        <ul
          className="
            space-y-3
          "
        >

          {items.map((item) => (
            <li
              key={item.id}
            >

              <a
                href={`#${item.id}`}
                className="
                  text-zinc-300
                  transition
                  hover:text-cyan-400
                "
              >
                {item.title}
              </a>

            </li>
          ))}

        </ul>

      </nav>

    </aside>
  );
}