import Navbar from "../(components)/navbar";
import { ModelProvider } from "../_providers/useModel";

export default function ModelsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ModelProvider>
      <div className="flex flex-col box-border h-screen">
        <Navbar />
        {children}
      </div>
    </ModelProvider>
  );
}
