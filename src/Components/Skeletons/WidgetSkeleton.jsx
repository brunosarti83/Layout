import ThreeDotsMenu from "../ThreeDotsMenu/ThreeDotsMenu";

function WidgetSkeleton() {
  return (
    <div className="w-full h-full bg-gradient-to-br from-gray-500/50 to-transparent to-30% rounded-[20px] flex flex-col flex-shrink-0 animate-pulse px-4">
      <div className="w-full flex justify-start px-4 py-2 opacity-50">
        <ThreeDotsMenu />
      </div>
      <div className="h-10 w-full rounded-lg bg-gradient-to-br from-gray-500/50 to-transparent to-30%"></div>
    </div>
  );
}

export default WidgetSkeleton;
