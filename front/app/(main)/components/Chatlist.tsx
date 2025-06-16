interface ChatListProps {
  userId?: string;
  conversations: any[];
  loading: boolean;
  error: string | null;
}

export const ChatList: React.FC<ChatListProps> = ({
  conversations,
  loading,
  error,
}) => {
  if (loading) return <p>Loading chats...</p>;
  if (error) return <p>{error}</p>;
  if (conversations.length === 0) return <p>No chats found.</p>;

  return (
    <div className="mt-4 max-h-[80vh] overflow-y-auto pr-2 space-y-4">
      {conversations.map((conv) => (
        <div
          key={conv.roomId}
          className="cursor-pointer flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition">
          <div className="relative">
            <img
              src={conv.user.profileImage || ""}
              alt={conv.user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            {/* Add active status if you want */}
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="font-medium text-sm truncate">{conv.user.name}</h2>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {conv.lastMessage.text}
            </p>
          </div>

          {conv.unreadCount > 0 && (
            <span className="text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
              {conv.unreadCount}
            </span>
          )}
        </div>
      ))}
    </div>
  );
};
