"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Users, CalendarDays, CheckCircle2, Dumbbell, Settings } from "lucide-react";

export default function Home() {
  // Mock stats for the overview
  const stats = useMemo(
    () => [
      { label: "Active Members", value: 128, icon: Users },
      { label: "Check-ins Today", value: 42, icon: CheckCircle2 },
      { label: "Sessions Scheduled", value: 18, icon: CalendarDays },
      { label: "Trainers", value: 7, icon: Dumbbell },
    ],
    []
  );

  const recent = [
    { id: 1, type: "check-in", text: "Alex M. checked in", time: "2m ago" },
    { id: 2, type: "payment", text: "Payment received from Priya S.", time: "18m ago" },
    { id: 3, type: "booking", text: "PT Session booked with Coach Lara", time: "1h ago" },
    { id: 4, type: "member", text: "New member: Jordan P.", time: "3h ago" },
  ];

  return (
    <div className="min-h-screen px-6 py-8 md:px-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Gym Dashboard</h1>
          <p className="text-muted-foreground mt-1">Overview of your gym performance and activity.</p>
        </div>
        <Link href="/settings">
          <Button variant="secondary" className="gap-2">
            <Settings className="h-4 w-4" /> Settings
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 mt-6">
        {stats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{s.label}</CardTitle>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.value}</div>
              <p className="text-xs text-muted-foreground">Updated just now</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest events across members, payments, and sessions.</CardDescription>
            </div>
            <Link href="/attendance">
              <Button variant="outline" size="sm" className="gap-2">
                View Attendance <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {recent.map((r) => (
                <li key={r.id} className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary" className="capitalize">{r.type}</Badge>
                    <span>{r.text}</span>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{r.time}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Jump to common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/members">
              <Button className="w-full justify-between" variant="default">
                Manage Members <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/attendance">
              <Button className="w-full justify-between" variant="outline">
                Attendance Check-in <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/trainers">
              <Button className="w-full justify-between" variant="outline">
                Trainer Scheduling <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Separator />
            <Link href="/settings">
              <Button className="w-full justify-between" variant="ghost">
                Gym Settings <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>Utilization</CardTitle>
            <CardDescription>Simple glance at today's flow</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Morning Peak</p>
                <p className="text-2xl font-semibold mt-1">62%</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Afternoon</p>
                <p className="text-2xl font-semibold mt-1">38%</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Evening</p>
                <p className="text-2xl font-semibold mt-1">74%</p>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-muted-foreground">Avg. Session</p>
                <p className="text-2xl font-semibold mt-1">47m</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}