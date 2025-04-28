import { UserButton, useUser } from "@clerk/clerk-react";
import { useState, useRef, useEffect } from "react";
import { FiUser } from "react-icons/fi";

interface Message {
  id: number;
  text: string;
}

const Chat: React.FC = () => {
  const { user } = useUser(); // Get user from Clerk
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  // console.log(user);

  const handleSend = (): void => {
    if (input.trim()) {
      setMessages([...messages, { text: input, id: Date.now() }]);
      setInput('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full h-fit max-w-lg mx-auto mt-10 bg-white rounded-2xl shadow-2xl p-6 border border-[#e8c9a3]">
      
      {/* User Info Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {user?.imageUrl && (
            <img
              src={user.imageUrl}
              alt="User Profile"
              className="w-10 h-10 rounded-full object-cover border border-[#e8c9a3]"
            />
          )}
          <span className="text-lg font-bold text-[#6b4e31]">
            {user?.fullName || "Guest User"}
          </span>
        </div>
      </div>

      {/* Messages Section */}
      <div className="h-[630px] overflow-y-auto mb-4 p-3 bg-[#f6eddc] border border-[#e8c9a3] rounded-lg shadow-inner">
        {messages.length === 0 ? (
          <div className="text-gray-400 text-center mt-20">
            No messages yet. Start the conversation!
          </div>
        ) : (
          messages.map((message) => (
            <div key={message.id} className="flex items-start mb-3">
              <div className="bg-[#e8c9a3] rounded-full p-2 mr-3">
                <FiUser className="text-[#6b4e31]" />
              </div>
              <div className="bg-white border border-[#e8c9a3] px-4 py-2 rounded-lg shadow text-[#4a3728] font-medium">
                {message.text}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 p-3 border border-[#e8c9a3] rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#b58863] text-[#4a3728] bg-[#f8f5f0] placeholder-gray-400"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="px-6 py-3 bg-[#6b4e31] text-white font-semibold rounded-r-lg hover:bg-[#4a3728] transition"
        >
          Send
        </button>
      </div>
      
    </div>
  );
};

export default Chat;
