import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Badge, Calendar } from "lucide-react";
import React from "react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 md:auto-rows-[18rem] md:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  id,
  name,
  description,
  tags,
  image_url,
  created_at,
  system_status,
  onClick,
}: {
  id: string;
  name: string;
  description: string;
  tags?: string[];
  image_url?: string;
  created_at: string;
  system_status: string;
  onClick?: () => void;
}) => {

  console.log(tags);

  const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
};
  return (
<button
      type="button"
      onClick={onClick}
      className={cn(
        "group/bento shadow-input row-span-1 flex flex-col justify-between space-y-4 rounded-xl border border-neutral-200 bg-white p-4 transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        id
      )}
    >
      {/* Image Section */}
      <div className="relative w-full h-48 overflow-hidden rounded-lg">
        <Avatar className="absolute inset-0 w-full h-full">
          <AvatarImage src={image_url} className="object-cover w-full h-full" />
          <AvatarFallback className="text-lg font-semibold bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900">
            {name}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col space-y-3">
        <div className="transition duration-200 group-hover/bento:translate-x-2">
          <div className="mt-2 mb-2 font-sans font-bold text-neutral-600 dark:text-neutral-200">
            {name}
          </div>
          <div className="font-sans text-xs font-normal text-neutral-600 dark:text-neutral-300 line-clamp-2">
            {description}
          </div>
        </div>

        {/* Tags Section */}
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tags.map((tag, index) => (
              <Badge 
                key={index}
                fontVariant="secondary"
                className="text-xs px-2 py-1 bg-neutral-100 dark:bg-neutral-800"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Footer with Date */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400">
            <Calendar className="w-3 h-3" />
            {formatDate(created_at)}
          </div>
        </div>
      </div>
    </button>
  );
};