import { Card, CardContent, CardHeader, CardTitle } from '@pricewatch/ui';
import { Users, Search, Zap, Bell } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s what&apos;s happening with your competitors.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Competitors"
          value="12"
          description="+2 this month"
          icon={<Users className="h-4 w-4" />}
        />
        <StatCard
          title="Active Scans"
          value="48"
          description="Last 24 hours"
          icon={<Search className="h-4 w-4" />}
        />
        <StatCard
          title="Changes Detected"
          value="156"
          description="+23% from last week"
          icon={<Bell className="h-4 w-4" />}
        />
        <StatCard
          title="Counter-Attacks"
          value="8"
          description="Executed this week"
          icon={<Zap className="h-4 w-4" />}
        />
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ActivityItem
              title="Price change detected"
              description="Competitor A reduced prices by 15% on 3 products"
              time="2 hours ago"
            />
            <ActivityItem
              title="New product added"
              description="Competitor B added 5 new products to their catalog"
              time="5 hours ago"
            />
            <ActivityItem
              title="Counter-attack executed"
              description="Automatic price match applied to 2 products"
              time="1 day ago"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function ActivityItem({
  title,
  description,
  time,
}: {
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-lg border p-4">
      <div className="flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <span className="text-xs text-muted-foreground">{time}</span>
    </div>
  );
}
