import {
  Type,
  Shield,
  Image,
  FileText,
  Bot,
  Code2,
  Globe,
} from "lucide-react";

export const toolCategories = [
  {
    id: "text",
    title: "Text Tools",
    icon: Type,
    tools: [
      {
        name: "Word Counter",
        description:
          "Count words, characters, sentences and paragraphs.",
        href: "/tools/word-counter",
        live: true,
      },
      {
        name: "Text Formatter",
        description:
          "Convert case and format text instantly.",
        href: "/tools/text-formatter",
        live: true,
      },
      {
        name: "Character Counter",
        description:
          "Count characters with or without spaces.",
        href: "/tools/character-counter",
        live: false,
      },
    ],
  },

  {
    id: "security",
    title: "Security Tools",
    icon: Shield,
    tools: [
      {
        name: "Password Generator",
        description:
          "Generate secure passwords instantly.",
        href: "/tools/password-tool",
        live: true,
      },
    ],
  },

  {
    id: "image",
    title: "Image Tools",
    icon: Image,
    tools: [
      {
        name: "Image Compressor",
        description:
          "Compress images without losing quality.",
        href: "/tools/image-compressor",
        live: true,
      },

      {
        name: "QR Generator",
        description:
          "Generate QR codes instantly.",
        href: "/tools/qr-generator",
        live: true,
      },
    ],
  },

  {
    id: "pdf",
    title: "PDF Tools",
    icon: FileText,
    tools: [
      {
        name: "PDF Merger",
        description:
          "Merge PDF files online.",
        href: "/tools/pdf-merger",
        live: true,
      },

      {
        name: "PDF Splitter",
        description:
          "Split PDF pages.",
        href: "/tools/pdf-splitter",
        live: true,
      },

      {
        name: "PDF Compressor",
        description:
          "Compress PDF documents.",
        href: "/tools/pdf-compressor",
        live: true,
      },

      {
        name: "PDF to Word",
        description:
          "Convert PDF into Word.",
        href: "/tools/pdf-to-word",
        live: true,
      },

      {
        name: "Word to PDF",
        description:
          "Convert Word into PDF.",
        href: "/tools/word-to-pdf",
        live: true,
      },

      {
        name: "PDF to PNG",
        description:
          "Convert PDF pages into PNG images.",
        href: "/tools/pdf-to-png",
        live: true,
      },

      {
        name: "PDF to JPG",
        description:
          "Convert PDF pages into JPG images.",
        href: "/tools/pdf-to-jpg",
        live: true,
      },

      {
        name: "PDF Watermark",
        description:
          "Add watermark to PDF.",
        href: "/tools/pdf-watermark",
        live: true,
      },
    ],
  },

  {
    id: "ai",
    title: "AI Tools",
    icon: Bot,
    tools: [
      {
        name: "AI Writer",
        description: "Coming soon.",
        href: "#",
        live: false,
      },
    ],
  },

  {
    id: "developer",
    title: "Developer Tools",
    icon: Code2,
    tools: [
      {
        name: "JSON Formatter",
        description: "Coming soon.",
        href: "#",
        live: false,
      },
    ],
  },

  {
    id: "seo",
    title: "SEO Tools",
    icon: Globe,
    tools: [
      {
        name: "Meta Tag Generator",
        description: "Coming soon.",
        href: "#",
        live: false,
      },
    ],
  },
];