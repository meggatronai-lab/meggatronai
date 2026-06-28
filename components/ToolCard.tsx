type ToolCardProps = {
  title: string;
  description: string;
};

export default function ToolCard({
  title,
  description,
}: ToolCardProps) {
  return (
    <div className="
      cursor-pointer
      rounded-2xl
      border border-zinc-800
      bg-zinc-900
      p-6

      transition-all duration-300 ease-in-out

      hover:-translate-y-2
      hover:border-cyan-400
      hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]
      hover:bg-zinc-800
    ">
      <h3 className="text-2xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 text-zinc-400 text-sm leading-6">
        {description}
      </p>
    </div>
  );
}