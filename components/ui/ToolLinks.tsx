import Link from "next/link";

type Tool = {
  name: string;
  href: string;
};

type ToolLinksProps = {
  tools: Tool[];
};

export default function ToolLinks({ tools }: ToolLinksProps) {
  return (
    <section className="mt-16">
      <h2 className="mb-8 text-3xl font-bold text-white">
        Related Tools
      </h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="rounded-2xl border border-white/10 bg-[#111827] p-6"
          >
            {tool.name}
          </Link>
        ))}
      </div>
    </section>
  );
}