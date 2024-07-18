import { cn } from "@/lib/utils";

type H1Props = {
  children: React.ReactNode;
  className?: string;
};

//accepts children and class names
export default function H1({ children, className }: H1Props) {
  return (
    //using cn utility function 
    <h1 className={cn("font-medium text-2xl leading-6", className)}>
      {children}
    </h1>
  );
}