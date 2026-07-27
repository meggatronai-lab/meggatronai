import React from "react";


interface BlogHeroProps {
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readingTime: string;
}


export default function BlogHero({
  title,
  description,
  category,
  publishedAt,
  readingTime,
}: BlogHeroProps) {

  return (
    <section
      className="
        relative
        overflow-hidden
        border-b
        border-white/10
        bg-[#050816]
        px-6
        py-20
      "
    >

      <div
        className="
          mx-auto
          max-w-4xl
          text-center
        "
      >

        <div
          className="
            mb-6
            inline-flex
            rounded-full
            border
            border-cyan-400/20
            bg-cyan-400/10
            px-4
            py-2
            text-sm
            text-cyan-300
          "
        >
          {category}
        </div>


        <h1
          className="
            text-4xl
            font-bold
            tracking-tight
            text-white
            md:text-6xl
          "
        >
          {title}
        </h1>


        <p
          className="
            mx-auto
            mt-6
            max-w-3xl
            text-lg
            leading-relaxed
            text-zinc-400
          "
        >
          {description}
        </p>



        <div
          className="
            mt-8
            flex
            flex-wrap
            justify-center
            gap-4
            text-sm
            text-zinc-400
          "
        >

          <span>
            {publishedAt}
          </span>


          <span>
            •
          </span>


          <span>
            {readingTime}
          </span>

        </div>


      </div>

    </section>
  );
}