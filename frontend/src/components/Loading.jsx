// components/Loading.jsx
const Loading = () => {
  return (
    <div className="w-screen flex flex-col items-center justify-center min-h-screen text-black">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-black animate-spin" />
        <div className="absolute inset-0 rounded-full border-4 border-dashed border-gray-700 opacity-25" />
      </div>
      <h2 className="mt-6 text-xl font-semibold animate-pulse">
        Loading please wait...
      </h2>
    </div>
  );
};

export default Loading;
