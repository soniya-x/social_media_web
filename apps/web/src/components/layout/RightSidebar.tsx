import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/shared/UserAvatar";

const suggestions = [
  { name: "Rahul Sharma", username: "@rahul_dev" },
  { name: "Priya Verma", username: "@priya_01" },
  { name: "Aman Patel", username: "@aman_design" },
];

export default function RightSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-[300px] shrink-0 py-10 xl:block">
      <div className="mb-8">
        <h3 className="mb-4 text-sm font-semibold">
          Suggested for you
        </h3>

        <div className="space-y-5">
          {suggestions.map((user) => (
            <div
              key={user.username}
              className="flex items-center gap-3"
            >
              <UserAvatar name={user.name} className="h-10 w-10" />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  {user.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user.username}
                </p>
              </div>

              <Button variant="link" size="sm" className="px-0">
                Follow
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-5 text-xs leading-6 text-muted-foreground">
        About · Privacy · Terms · Help

        <p className="mt-3">
          © 2026 Socially
        </p>
      </div>
    </aside>
  );
}