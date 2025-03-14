import { UserProfile } from "@/app/account/user-profile";
import AccountContent from "./components/account-content";

export default function Home() {
  return (
    <main className="container mx-auto py-10 px-4 md:px-6">
      <UserProfile />
    </main>
  );
}
