import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { RoomCanvas } from "@/src/components/RoomCanvas";

export default async function CanvasPage({ params }: { params: { roomId: string } }) {
  // First, we need to await the params
  const resolvedParams = await params;
  const roomId = resolvedParams.roomId;
  
  // Then handle the cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken")?.value;

  if (!token) {
    redirect("/signin");
  }

  return <RoomCanvas roomId={roomId} />;
}