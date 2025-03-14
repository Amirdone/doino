import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus, PlusCircle, PlusCircleIcon } from "lucide-react"

export function SearchHeader() {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">پروژه ها</h1>
          <p className="text-muted-foreground">سلام</p>
        </div>
        <Button variant={"outline"}>
          <Plus className="mr-2 h-4 w-4 stroke-green-600" />
         پروژه جدید
        </Button>
      </div>

      <div>
        <Input placeholder="Search designs..." className="max-w-sm" />
      </div>
    </>
  )
}

