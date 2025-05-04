import { Sidebar } from "@/components/Sidebar"
import ClientAuthWrapper from "@/components/ClientAuthWrapper"

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClientAuthWrapper>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </ClientAuthWrapper>
  )
}
