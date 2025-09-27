"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDays, Clock, Plus } from "lucide-react";

interface Trainer { id: number; name: string; specialty: string; }
interface Session { id: number; trainerId: number; day: string; time: string; client: string; }

const trainers: Trainer[] = [
  { id: 1, name: "Coach Lara", specialty: "Strength" },
  { id: 2, name: "Samir Khan", specialty: "HIIT" },
  { id: 3, name: "Emily Chen", specialty: "Mobility" },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
const timeSlots = ["07:00", "08:00", "09:00", "12:00", "16:00", "18:00", "19:00"] as const;

export default function TrainersPage() {
  const [sessions, setSessions] = useState<Session[]>([
    { id: 1, trainerId: 1, day: "Mon", time: "08:00", client: "Alex M." },
    { id: 2, trainerId: 2, day: "Wed", time: "16:00", client: "Priya S." },
  ]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ trainerId: "1", day: "Mon", time: "07:00", client: "" });
  const [filter, setFilter] = useState("all");

  const filteredSessions = useMemo(() => {
    if (filter === "all") return sessions;
    return sessions.filter((s) => String(s.trainerId) === filter);
  }, [sessions, filter]);

  const addSession = () => {
    if (!form.client.trim()) return;
    setSessions((prev) => [
      { id: Date.now(), trainerId: Number(form.trainerId), day: form.day, time: form.time, client: form.client.trim() },
      ...prev,
    ]);
    setForm({ trainerId: form.trainerId, day: form.day, time: form.time, client: "" });
    setOpen(false);
  };

  return (
    <div className="min-h-screen px-6 py-8 md:px-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Trainer Scheduling</h1>
          <p className="text-muted-foreground mt-1">Manage sessions and trainer availability.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="h-4 w-4"/> New Session</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Book a session</DialogTitle>
              <DialogDescription>Create a new client session.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label>Trainer</Label>
                <Select value={form.trainerId} onValueChange={(v) => setForm((s) => ({ ...s, trainerId: v }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select trainer" />
                  </SelectTrigger>
                  <SelectContent>
                    {trainers.map((t) => (
                      <SelectItem key={t.id} value={String(t.id)}>{t.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Day</Label>
                  <Select value={form.day} onValueChange={(v) => setForm((s) => ({ ...s, day: v }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      {days.map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Time</Label>
                  <Select value={form.time} onValueChange={(v) => setForm((s) => ({ ...s, time: v }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {timeSlots.map((t) => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Client name</Label>
                <Input placeholder="e.g. Jamie Doe" value={form.client} onChange={(e) => setForm((s) => ({ ...s, client: e.target.value }))} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={addSession} className="gap-2"><Plus className="h-4 w-4"/> Add</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="calendar" className="mt-6">
        <TabsList>
          <TabsTrigger value="calendar">Calendar</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
        </TabsList>

        <TabsContent value="calendar" className="mt-4">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <div>
                <CardTitle>Week Overview</CardTitle>
                <CardDescription>Simple weekly grid</CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Label className="text-sm">Filter by trainer</Label>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All trainers" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {trainers.map((t) => (
                      <SelectItem key={t.id} value={String(t.id)}>{t.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {days.map((d) => (
                  <div key={d} className="border rounded-lg p-2">
                    <div className="flex items-center justify-between">
                      <div className="font-medium flex items-center gap-2"><CalendarDays className="h-4 w-4"/> {d}</div>
                      <Badge variant="secondary">{filteredSessions.filter((s) => s.day === d).length} booked</Badge>
                    </div>
                    <Separator className="my-2"/>
                    <div className="space-y-2">
                      {timeSlots.map((t) => {
                        const slotSessions = filteredSessions.filter((s) => s.day === d && s.time === t);
                        return (
                          <div key={`${d}-${t}`} className="rounded-md border p-2">
                            <div className="text-xs text-muted-foreground flex items-center gap-2"><Clock className="h-3 w-3"/> {t}</div>
                            <div className="mt-1 space-y-1">
                              {slotSessions.length === 0 ? (
                                <div className="text-xs text-muted-foreground">No session</div>
                              ) : (
                                slotSessions.map((s) => {
                                  const trainer = trainers.find((tr) => tr.id === s.trainerId);
                                  return (
                                    <div key={s.id} className="text-sm">
                                      <span className="font-medium">{s.client}</span> with {trainer?.name}
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>All Sessions</CardTitle>
              <CardDescription>Chronological list</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sessions.map((s) => {
                  const trainer = trainers.find((t) => t.id === s.trainerId)!;
                  return (
                    <div key={s.id} className="border rounded-md p-3 flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-medium">{s.client}</div>
                        <div className="text-sm text-muted-foreground flex gap-3">
                          <span className="flex items-center gap-1"><CalendarDays className="h-4 w-4"/> {s.day}</span>
                          <span className="flex items-center gap-1"><Clock className="h-4 w-4"/> {s.time}</span>
                          <Badge variant="secondary">{trainer.name}</Badge>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">Manage</Button>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}