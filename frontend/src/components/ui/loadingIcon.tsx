import React from "react";
import { LoaderCircle } from "lucide-react";

const LoadingIcon = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <LoaderCircle className="animate-spin w-12 h-12 text-blue-500" />
    </div>
  );
};

export default LoadingIcon;