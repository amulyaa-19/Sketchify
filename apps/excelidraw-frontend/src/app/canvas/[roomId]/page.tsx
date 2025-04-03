import { RoomCanvas } from "@/src/components/RoomCanvas";
import { cookies } from "next/headers"; 
import { redirect } from "next/navigation";

export default async function CanvasPage({ params }: { params: { roomId: string } }) {
  const cookieStore = await cookies(); 
  const token = cookieStore.get("authToken"); 

  if (!token) {
    redirect("/signin"); 
  }

  return <RoomCanvas roomId={params.roomId} />;
}
