import {
  Sparkles,
  FileText,
  Image,
  Shield,
  QrCode,
  FileArchive,
} from "lucide-react";

export const featuredTool = {
  title: "PDF Watermark",
  description:
    "Add professional text or image watermarks to your PDF files directly in your browser. Fast, secure and completely free.",

  href: "/tools/pdf-watermark",

  icon: Sparkles,

  badge: "Featured",

  stats: [
    {
      label: "Free",
      value: "100%",
    },
    {
      label: "Browser",
      value: "Secure",
    },
  ],
};

export const tools = [
  {
    title: "PDF Merger",
    description: "Merge multiple PDF files into one document.",
    href: "/tools/pdf-merger",
    icon: FileArchive,
  },

  {
    title: "Image Compressor",
    description: "Compress images without losing quality.",
    href: "/tools/image-compressor",
    icon: Image,
  },

  {
    title: "Password Generator",
    description: "Generate strong passwords instantly.",
    href: "/tools/password-generator",
    icon: Shield,
  },

  {
    title: "QR Generator",
    description: "Create QR Codes in seconds.",
    href: "/tools/qr-generator",
    icon: QrCode,
  },

  {
    title: "PDF Watermark",
    description: "Protect PDF documents using text or image watermarks.",
    href: "/tools/pdf-watermark",
    icon: FileText,
  },
];

export const categories = [
  "All",
  "AI",
  "PDF",
  "Image",
  "SEO",
  "Developer",
  "Text",
];