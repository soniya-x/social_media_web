import { redirect } from "next/navigation";

export default function Home() {
  redirect("/home");
}

export default function ProfilePage(){
  redirect("/profile");
}