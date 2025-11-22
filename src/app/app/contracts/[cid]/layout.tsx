export default async function CreateCidLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ cid: string }>;
}) {

  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
