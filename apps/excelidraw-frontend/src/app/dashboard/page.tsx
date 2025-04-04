import { CreateRoomForm } from "@/src/components/CreateRoomButoon";

export default function DashboardPage() {
  return (
    <div className="p-4 flex items-center">
      <h1 className="text-xl font-bold mb-4">Welcome to Sketchify</h1>
      <CreateRoomForm />
    </div>
  );
}
