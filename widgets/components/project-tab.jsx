import React from "react";
import { useQuery } from "@tanstack/react-query";

const useGetRandomQuotes = (app) => {
  return useQuery({
    queryKey: ["random-quotes"],
    queryFn: async () => {
      const resp = await app.data.invoke("getRandomQuotes");
      return resp?.response;
    },
  });
};

const useGetCurrentProject = (app) => {
  return useQuery({
    queryKey: ["current-project"],
    queryFn: async () => {
      const resp = await app.data.get(app.data.dataIdentifiers.CURRENT_PROJECT);
      return resp?.response;
    },
  });
};

export const ProjectTab = ({ app }) => {
  const { data, isLoading, isError } = useGetRandomQuotes(app);
  const {
    data: currentProject,
    isLoading: isCurrentProjectLoading,
    isError: isCurrentProjectError,
  } = useGetCurrentProject(app);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError.message}</div>;

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-2xl font-bold text-blue-500 max-w-[600px] text-center">
        {data.quote}
      </h1>
      <p className="text-sm text-gray-500">{data.author}</p>
      <p className="text-sm text-gray-500">{currentProject?.projectName}</p>
    </div>
  );
};
