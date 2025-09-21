const TypingIndicator = () => {
  return (
    <div className="p-1.5 bg-gray-200 flex gap-1 rounded-full self-start ">
      <span className="h-2 w-2 rounded-full  bg-gray-500 animate-pulse delay-0"></span>
      <span className="h-2 w-2 rounded-full  bg-gray-500 animate-pulse delay-500 "></span>
      <span className="h-2 w-2 rounded-full  bg-gray-500 animate-pulse delay-1000"></span>
    </div>
  );
};

export default TypingIndicator;
