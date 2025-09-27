"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle2, LogOut, Users } from "lucide-react";

interface MemberStatus {
  id: number;
  name: string;
  status: "in" | "out";
}

interface HistoryItem {
  id: number;
  member: string;
  action: "check-in" | "check-out";
  time: string;
}

const initialStatuses: MemberStatus[] = [
  { id: 1, name: "Alex Morgan", status: "out" },
  { id: 2, name: "Priya Shah", status: "out" },
  { id: 3, name: "Jordan Phelps", status: "in" },
];

export default function AttendancePage() {
  const [statuses, setStatuses] = useState<MemberStatus[]>(initialStatuses);
  const [selectedId, setSelectedId] = useState<string>("1");
  const [history, setHistory] = useState<HistoryItem[]>([
    { id: 1, member: "Jordan Phelps", action: "check-in", time: "Today 08:41" },
    { id: 2, member: "Alex Morgan", action: "check-out", time: "Yesterday 19:12" },
  ]);
  const [query, setQuery] = useState("");

  const presentCount = statuses.filter((s) => s.status === "in").length;

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return statuses;
    return statuses.filter((m) => m.name.toLowerCase().includes(q));
  }, [statuses, query]);

  const checkIn = () => {
    const id = Number(selectedId);
    const member = statuses.find((m) => m.id === id);
    if (!member) return;
    if (member.status === "in") return;
    setStatuses((prev) => prev.map((m) => (m.id === id ? { ...m, status: "in" } : m)));
    setHistory((h) => [{ id: Date.now(), member: member.name, action: "check-in", time: new Date().toLocaleString() }, ...h]);
  };
  const checkOut = () => {
    const id = Number(selectedId);
    const member = statuses.find((m) => m.id === id);
    if (!member) return;
    if (member.status === "out") return;
    setStatuses((prev) => prev.map((m) => (m.id === id ? { ...m, status: "out" } : m)));
    setHistory((h) => [{ id: Date.now(), member: member.name, action: "check-out", time: new Date().toLocaleString() }, ...h]);
  };

  return (
    <div className="min-h-screen px-6 py-8 md:px-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Attendance</h1>
          <p className="text-muted-foreground mt-1">Check members in and out, and review history.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <div>
              <CardTitle>Check-in / Check-out</CardTitle>
              <CardDescription>Select a member and update status</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1"><Users className="h-4 w-4"/> Present: {presentCount}</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2 md:col-span-2">
                <Label>Member</Label>
                <Select value={selectedId} onValueChange={setSelectedId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select member" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((m) => (
                      <SelectItem key={m.id} value={String(m.id)}>{m.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-2 self-end">
                <Button onClick={checkIn} className="gap-2"><CheckCircle2 className="h-4 w-4"/> Check In</Button>
                <Button onClick={checkOut} variant="outline" className="gap-2"><LogOut className="h-4 w-4"/> Check Out</Button>
              </div>
            </div>

            <div>
              <Label>Search</Label>
              <Input placeholder="Search member list..." value={query} onChange={(e) => setQuery(e.target.value)} className="mt-1 max-w-sm" />
            </div>

            <Table>
              <TableCaption>Current status</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((m) => (
                  <TableRow key={m.id}>
                    <TableCell className="font-medium">{m.name}</TableCell>
                    <TableCell>
                      <Badge variant={m.status === "in" ? "default" : "secondary"}>{m.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>History</CardTitle>
            <CardDescription>Most recent events</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {history.map((h) => (
                <li key={h.id} className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant={h.action === "check-in" ? "default" : "secondary"} className="capitalize">{h.action}</Badge>
                    <span>{h.member}</span>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{h.time}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}