import { useState, useRef } from "react";
import { PiBookOpenTextDuotone, PiMagnifyingGlassDuotone, PiPencilSimpleLineDuotone, PiRobotDuotone} from "react-icons/pi";
import { FiArrowUp, FiImage } from "react-icons/fi";

const ChatWindow = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [chatHistory, setChatHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const fileInputRef = useRef(null);

  const suggestions = [
    {
      title: "Create",
      titleIcon: <PiPencilSimpleLineDuotone className="text-blue-500" />,
      option1: "Mini volcano project",
      option2: "Make Scented candles",
      option3: "Home Workout Routine",
    },
    {
      title: "Learn",
      titleIcon: <PiBookOpenTextDuotone className="text-rose-500" />,
      option1: "Style Saare design making",
      option2: "Public Speaking",
      option3: "Artificial intelligence",
    },
    {
      title: "Discover",
      titleIcon: <PiMagnifyingGlassDuotone className="text-lime-500" />,
      option1: "Cultural Festival",
      option2: "Famous Street Food",
      option3: "Historical Places",
    },
    {
      title: "Generate",
      titleIcon: <PiRobotDuotone className="text-yellow-400" />,
      option1: "Generate Programming Code",
      option2: "Generate Diffrent AI Images",
      option3: "Generate AI Avtar Voices",
    },
  ];

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const predefinedReply = (input) => {
    if (input.type === "image") {
      return "Thank you for sharing this image! how can i assit you with it ?";
    }
    return "Hii👋 How can I assist you today ?";
  };

  const handleSend = () => {
    if (showIntro) setShowIntro(false);
    if (!userInput.trim()) return;

    const newMessage = { type: "text", content: userInput, sender: "user" };
    setChatHistory((prev) => [...prev, newMessage]);

    const reply = {
      type: "text",
      content: predefinedReply(newMessage),
      sender: "bot",
    };

    setTimeout(() => setChatHistory((prev) => [...prev, reply]), 500);
    setUserInput("");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    const newImageMessage = {
      type: "image",
      content: imageUrl,
      sender: "user",
    };
    setChatHistory((prev) => [...prev, newImageMessage]);

    const reply = {
      type: "text",
      content: predefinedReply({ type: "image" }),
      sender: "bot",
    };

    setTimeout(() => setChatHistory((prev) => [...prev, reply]), 500);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div
      style={{ backgroundImage: "url('/assets/background.svg')" }}
      className="bg-[#F1F1F1] border-2 border-gray-200 bg-cover bg-center rounded-tl-2xl flex flex-col justify-between w-full h-full min-h-[calc(100vh-50px)] px-4 sm:px-6 md:px-8 py-5 overflow-y-auto"
    >
      <div className="text-xl font-semibold">Hero GPT 2.0</div>

      {showIntro ? (
        <div className="w-full h-full text-center pt-8 text-3xl font-medium flex flex-col items-center gap-6 transition-all duration-700 ease-in-out">
          <div>
            <div className="text-xl lg:text-3xl">
              Welcome to GPT{" "}
              <span className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
                2.0
              </span>
            </div>
            <div className="text-4xl lg:text-5xl">
              {getTimeGreeting()}, Dear!
            </div>
            <div className="text-4xl lg:text-5xl">
              How can{" "}
              <span className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent font-semibold">
                i assist you
              </span>{" "}
              today?
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-8">
            {suggestions.map((suggest, i) => (
              <div
                key={i}
                className="bg-white hidden p-4 rounded-xl md:flex flex-col gap-3 text-start shadow-md"
              >
                <h2 className="text-md flex gap-2 items-center">
                  {suggest.titleIcon}
                  {suggest.title}
                </h2>
                <p className="text-sm bg-gray-100 p-2 rounded-md">
                  {suggest.option1}
                </p>
                <p className="text-sm bg-gray-100 p-2 rounded-md">
                  {suggest.option2}
                </p>
                <p className="text-sm bg-gray-100 p-2 rounded-md">
                  {suggest.option3}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-5 bg-white rounded-2xl p-4 shadow h-[50vh] sm:h-[60vh] lg:h-[70vh] overflow-y-auto flex flex-col gap-4 pr-2">
          {chatHistory.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[70%] p-3 rounded-xl text-sm ${
                msg.sender === "user"
                  ? "bg-blue-100 self-end text-right"
                  : "bg-gray-100 self-start text-left"
              }`}
            >
              {msg.type === "text" ? (
                msg.content
              ) : (
                <img
                  src={msg.content}
                  alt="Uploaded"
                  className="w-40 h-auto rounded-md"
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* Input area */}
      <div className="mt-4 relative w-full sm:w-11/12 lg:w-10/12 mx-auto">
        <div className="relative flex items-center">
          <button
            onClick={() => fileInputRef.current.click()}
            className="absolute left-3 text-gray-500"
          >
            <FiImage size={20} />
          </button>

          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a prompt..."
            className="w-full pl-10 pr-10 h-11 rounded-full bg-white border border-gray-300 shadow-sm text-sm outline-none"
          />

          <button
            onClick={handleSend}
            className="absolute right-1.5 bg-black p-2 rounded-full text-white"
          >
            <FiArrowUp size={18} />
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
