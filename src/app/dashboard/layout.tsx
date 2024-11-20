// Admin Dashboard https://tailwindcomponents.com/component/dashboard-12
import { Sidebar, TopMenu } from "@/components";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <Sidebar
        name={session.user?.name ?? "No name"}
        image={session.user?.image ?? ""}
        roles={session.user?.roles ?? ["client"]}
      />
      {/* Main Layout content - Contenido principal del Layout */}
      <div className="ml-auto mb-6 lg:w-[75%] xl:w-[80%] 2xl:w-[85%] min-h-screen">
        <TopMenu />
        {/* TODO: Contenido en el Layout.tsx */}
        <div className="px-6 pt-6 bg-white p-2 m-2 pb-5 rounded">
          {children}
        </div>
      </div>
    </>
  );
}
