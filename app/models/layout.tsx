import { ModelProvider } from "../_providers/useModel";

export default function ModelsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ModelProvider>{children}</ModelProvider>;
}
