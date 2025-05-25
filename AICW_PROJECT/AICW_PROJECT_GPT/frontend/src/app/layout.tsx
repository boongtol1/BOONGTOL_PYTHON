export const metadata = {
  title: "Multi‑AI Chat",
  description: "ChatGPT‑like UI with AI switching",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-100 min-h-screen flex flex-col">
        <main className="flex-1 container mx-auto p-4">{children}</main>
      </body>
    </html>
  );
}
