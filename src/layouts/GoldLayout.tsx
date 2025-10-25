import { ReactNode } from "react";

interface GoldLayoutProps {
  children: ReactNode;
}

export const GoldLayout = ({ children }: GoldLayoutProps) => {
  return (
    <div className="bg-transparent text-white font-poppins relative min-h-screen overflow-x-hidden">
      {/* Global Gold-Dust Background Layer */}
      <div className="fixed inset-0 -z-10"></div>
      {children}
    </div>
  );
};
