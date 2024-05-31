// src/components/SpeechBubble.jsx
const SpeechBubble = ({ children }) => {
  return (
    <div className="relative bg-white p-6 rounded-3xl max-w-lg shadow-2xl shadow-slate-50 text-gray-800 text-xl font-semibold tracking-wider">
      {children}
      <div className="absolute -left-2 top-1/2 w-0 h-0 border-y-8 border-y-transparent border-r-8 border-r-white transform -translate-y-1/2"></div>
    </div>
  );
};

export default SpeechBubble;
