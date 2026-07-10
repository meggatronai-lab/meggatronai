import type { Metadata } from "next";
import PasswordTool from "@/components/tools/PasswordTool";
import { createToolMetadata } from "@/lib/seo";


export const metadata: Metadata = createToolMetadata({
  title: "Password Generator",
  description:
    "Generate strong, secure and random passwords instantly with MeggatronAI's free online Password Generator.",
  slug: "password-generator",
});


export default function Page() {
  return <PasswordTool />;
}