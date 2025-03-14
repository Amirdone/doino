export type Project = {
  id: number
  name: string
  description: string
  status: "in-review" | "in-progress" | "completed"
  type: string
  lastUpdate: string
}
interface BadgeProps {
  variant: 'default' | 'secondary' | 'success' | 'destructive';
  // سایر ویژگی‌ها
}
