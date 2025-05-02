import { UserButton, UserProfile, useUser } from "@clerk/clerk-react";

const SideBar = () => {
    const u = useUser();
  return (
    <aside className="flex flex-col justify-between h-screen w-64 bg-[#f6eddc] border-r-2 border-[#e8c9a3] shadow-lg">
      {/* Header */}
      <div className="px-6 py-8">
        <h1 className="text-3xl font-extrabold text-[#6b4e31] tracking-tight mb-2">
          ChessBoard
        </h1>
        <p className="text-[#b58863] text-sm font-medium">Play. Learn. Enjoy.</p>
      </div>

      {/* Navigation (add more links as needed) */}
      <nav className="flex-1 px-6">
        <ul className="space-y-4 mt-10">
          <li>
            <a
              href="#"
              className="block py-2 px-4 rounded-lg text-[#6b4e31] font-semibold hover:bg-[#e8c9a3] transition"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 rounded-lg text-[#6b4e31] font-semibold hover:bg-[#e8c9a3] transition"
            >
              Play Game
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block py-2 px-4 rounded-lg text-[#6b4e31] font-semibold hover:bg-[#e8c9a3] transition"
            >
              Leaderboard
            </a>
          </li>
          {/* Add more navigation items here */}
        </ul>
      </nav>

      {/* User Info at the Bottom */}
      <div className="flex  items-center justify-evenly px-6 py-6 border-t border-[#e8c9a3] bg-[#f0d9b5]">
        <UserButton
          appearance={{
            elements: {
              userButtonAvatarBox: "ring-2 ring-[#6b4e31]",
            },
          }}
          afterSignOutUrl="/"
        />
        <p className="text-sm font-medium text-[#6b4e31]">Signed in as {u.user?.firstName}</p>
      </div>
    </aside>
  );
};

export default SideBar;
