import React from "react";

interface Alert {
  title: string;
  type: "danger" | "success" | "info" | "warning";
}

const Alert: React.FC<Alert> = ({ title, type }) => {
  const alertStyles: Record<string, string> = {
    success: "bg-green-50 text-green-800 dark:bg-green-800 dark:text-green-400",
    danger: "bg-red-50 text-red-800 dark:bg-red-800 dark:text-red-400",
    warning:
      "bg-yellow-50 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-400",
    info: "bg-blue-50 text-blue-800 dark:bg-blue-800 dark:text-blue-400",
  };

  return (
    <div>
      <div
        className={`p-4 mb-4 text-sm rounded-lg ${alertStyles[type]}`}
        role="alert"
      >
        <span className="font-medium">{type}!</span> {title}
      </div>
    </div>
  );
};

export default Alert;
