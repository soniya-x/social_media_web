interface EmptyStateProps {
  title: string;
  description?: string;
}

export function EmptyState({
  title,
  description,
}: EmptyStateProps) {
  return (
    <div className="col-span-3 flex flex-col items-center justify-center py-12 text-center">
      <h3 className="text-lg font-semibold text-foreground">
        {title}
      </h3>

      {description && (
        <p className="mt-2 text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}