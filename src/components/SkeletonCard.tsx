const SkeletonCard = () => {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="aspect-[16/9] skeleton" />
      <div className="p-5 sm:p-6 space-y-3">
        <div className="h-4 w-3/4 skeleton rounded" />
        <div className="h-3 w-full skeleton rounded" />
        <div className="h-3 w-2/3 skeleton rounded" />
        <div className="h-11 w-full skeleton rounded-xl mt-4" />
      </div>
    </div>
  );
};

export default SkeletonCard;