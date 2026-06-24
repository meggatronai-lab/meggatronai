type ToolCardProps = {
  title: string;
  description: string;
};

export default function ToolCard({
  title,
  description,
}: ToolCardProps) {
  return (
    <div className="cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-teal-500 hover:shadow-xl">
      <h3 className="text-2xl font-semibold">
        {title}
      </h3>

      <p className="mt-3 text-zinc-400">
        {description}
      </p>
    </div>
  );
}