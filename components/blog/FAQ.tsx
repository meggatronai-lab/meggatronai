import React from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
}

export default function FAQ({
  items,
}: FAQProps) {
  return (
    <section
      className="
        my-12
      "
    >

      <h2
        className="
          mb-6
          text-2xl
          font-bold
          text-white
        "
      >
        Frequently Asked Questions
      </h2>


      <div
        className="
          space-y-4
        "
      >

        {items.map((item, index) => (
          <details
            key={index}
            className="
              group
              rounded-2xl
              border
              border-white/10
              bg-[#0B1120]
              p-5
            "
          >

            <summary
              className="
                flex
                cursor-pointer
                list-none
                items-center
                justify-between
                gap-4
                text-lg
                font-medium
                text-white
              "
            >

              <span>
                {item.question}
              </span>


              <span
                className="
                  text-cyan-400
                  transition
                  group-open:rotate-45
                "
              >
                +
              </span>

            </summary>


            <p
              className="
                mt-4
                leading-relaxed
                text-zinc-400
              "
            >
              {item.answer}
            </p>

          </details>
        ))}

      </div>

    </section>
  );
}