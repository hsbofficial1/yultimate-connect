import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  children?: ReactNode;
  className?: string;
}

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  action,
  children,
  className,
}: EmptyStateProps) => {
  return (
    <Card className={cn('border-2 border-dashed', className)}>
      <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
        {Icon && (
          <div className="mb-4 h-16 w-16 rounded-full bg-muted flex items-center justify-center">
            <Icon className="h-8 w-8 text-muted-foreground" />
          </div>
        )}
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        {description && (
          <p className="text-muted-foreground mb-6 max-w-md">{description}</p>
        )}
        {action && (
          <Button onClick={action.onClick} size="lg">
            {action.label}
          </Button>
        )}
        {children}
      </CardContent>
    </Card>
  );
};

