import React from "react";
import { useQuery } from "@tanstack/react-query";

const useGetRandomFacts = (app) => {
  return useQuery({
    queryKey: ["random-facts"],
    queryFn: async () => {
      const resp = await app.data.invoke("getRandomFacts");
      return resp?.response;
    },
  });
};

export const GlobalTab = ({ app }) => {
  const { data, isLoading, isError, refetch } = useGetRandomFacts(app);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError.message}</div>;

  return (
    <div className="flex flex-col items-center justify-center h-full p-8">
      <div className="max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-purple-600 mb-6">
          🎯 Random Fun Fact
        </h1>
        
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8 shadow-lg border border-purple-200">
          <p className="text-lg text-gray-800 leading-relaxed mb-4">
            {data.text}
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-6">
            <span>Source:</span>
            <span className="font-medium">{data.source || "Fun Facts API"}</span>
          </div>
          
          <button
            onClick={() => refetch()}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-full transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            Get Another Fact! 🎲
          </button>
        </div>
        
        <p className="text-sm text-gray-400 mt-4">
          Click the button to discover more amazing facts!
        </p>
      </div>
    </div>
  );
};
