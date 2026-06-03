
type Props = {
  icon: string;
  label: string;
  onClick?: () => void;
};

export default function SidebarItem({ icon, label, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 p-2 rounded-lg cursor-pointer hover:bg-[#0f172a] transition"
    >
      <span>{icon}</span>
      <span className="text-sm">{label}</span>
    </div>
  );
}