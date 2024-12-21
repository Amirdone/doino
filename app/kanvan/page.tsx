import dynamic from 'next/dynamic';
import KanbanBoard from '@/components/KanbanBoard';
//const KanbanBoard = dynamic(() => import('../components/KanbanBoard'), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <KanbanBoard />
    </div>
  );
}
