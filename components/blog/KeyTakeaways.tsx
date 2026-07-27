import React from "react";

interface KeyTakeawaysProps {
  points: string[];
}

export default function KeyTakeaways({
  points,
}: KeyTakeawaysProps) {
  return (
    <section
      className="
        my-10
        rounded-2xl
        border
        border-cyan-400/20
        bg-cyan-400/5
        p-6
      "
    >

      <h2
        className="
          mb-5
          flex
          items-center
          gap-2
          text-xl
          font-semibold
          text-white
        "
      >
        <span
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            bg-cyan-400/20
            text-cyan-300
          "
        >
          ✓
        </span>

        Key Takeaways
      </h2>


      <ul
        className="
          space-y-3
        "
      >

        {points.map((point, index) => (
          <li
            key={index}
            className="
              flex
              items-start
              gap-3
              text-zinc-300
            "
          >

            <span
              className="
                mt-2
                h-1.5
                w-1.5
                shrink-0
                rounded-full
                bg-cyan-400
              "
            />

            <span>
              {point}
            </span>

          </li>
        ))}

      </ul>

    </section>
  );
}