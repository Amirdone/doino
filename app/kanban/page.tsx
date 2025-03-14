import KanbanBoard from "./components/kanban-board";
import Header from "@/components/header"
export default function Home() {
  return (
    <main className="container mx-auto py-24 px-4\\\">
      <h1 className="text-3xl font-bold mb-8">نام پروژه</h1>
      <div className="">
      <Header />
        </div>
      <KanbanBoard />
    </main>
  )
}

