import CreateRoomForm from "@/src/components/CreateRoomButoon";


export default function DashboardPage() {
  return (
    <div className="p-4 flex items-center bg-linear-to-br from-gray-800 to-gray-800 justify-center">
      <h1 className="text-xl font-bold mb-4"></h1>
      <CreateRoomForm />
    </div>
  );
}
