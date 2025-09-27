"use client";

import { useMemo, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import { Separator } from "@/components/ui/separator";
import { Plus, DollarSign, UserPlus } from "lucide-react";

interface Member {
  id: number;
  name: string;
  email: string;
  plan: string;
  status: "active" | "paused" | "overdue";
  joinDate: string;
  due: number; // dollars
}

const initialMembers: Member[] = [
  { id: 1, name: "Alex Morgan", email: "alex@example.com", plan: "Premium", status: "active", joinDate: "2024-11-12", due: 0 },
  { id: 2, name: "Priya Shah", email: "priya@example.com", plan: "Standard", status: "overdue", joinDate: "2025-01-03", due: 29 },
  { id: 3, name: "Jordan Phelps", email: "jordan@example.com", plan: "Basic", status: "paused", joinDate: "2024-08-21", due: 0 },
];

const plans = [
  { id: "basic", name: "Basic", price: 19, features: ["Gym floor access", "Weekdays only"] },
  { id: "standard", name: "Standard", price: 29, features: ["Gym + Classes", "7 days"] },
  { id: "premium", name: "Premium", price: 49, features: ["All Access", "PT discounts", "Sauna"] },
];

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [newMember, setNewMember] = useState({ name: "", email: "", plan: "standard" });

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return members;
    return members.filter((m) =>
      [m.name, m.email, m.plan, m.status].some((v) => String(v).toLowerCase().includes(q))
    );
  }, [members, query]);

  const addMember = () => {
    if (!newMember.name || !newMember.email) return;
    const planName = plans.find((p) => p.id === newMember.plan)?.name ?? "Standard";
    const member: Member = {
      id: Date.now(),
      name: newMember.name,
      email: newMember.email,
      plan: planName,
      status: "active",
      joinDate: new Date().toISOString().slice(0, 10),
      due: 0,
    };
    setMembers((prev) => [member, ...prev]);
    setNewMember({ name: "", email: "", plan: "standard" });
    setOpen(false);
  };

  return (
    <div className="min-h-screen px-6 py-8 md:px-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Members</h1>
          <p className="text-muted-foreground mt-1">Manage member profiles, plans, and payments.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><UserPlus className="h-4 w-4"/> Add Member</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a new member</DialogTitle>
              <DialogDescription>Collect essentials to create a member profile.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" value={newMember.name} onChange={(e) => setNewMember((s) => ({ ...s, name: e.target.value }))} placeholder="Jamie Doe" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={newMember.email} onChange={(e) => setNewMember((s) => ({ ...s, email: e.target.value }))} placeholder="jamie@example.com" />
              </div>
              <div className="grid gap-2">
                <Label>Plan</Label>
                <Select value={newMember.plan} onValueChange={(v) => setNewMember((s) => ({ ...s, plan: v }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={addMember} className="gap-2"><Plus className="h-4 w-4"/> Save Member</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="members" className="mt-6">
        <TabsList>
          <TabsTrigger value="members">Members</TabsTrigger>
          <TabsTrigger value="plans">Plans</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="mt-4 space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <div>
                <CardTitle>All Members</CardTitle>
                <CardDescription>Search and manage your members</CardDescription>
              </div>
              <Input
                className="max-w-xs"
                placeholder="Search by name, email, plan..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </CardHeader>
            <CardContent>
              <Table>
                <TableCaption>{filtered.length} records</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden sm:table-cell">Email</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell className="font-medium">{m.name}</TableCell>
                      <TableCell className="hidden sm:table-cell">{m.email}</TableCell>
                      <TableCell>{m.plan}</TableCell>
                      <TableCell>
                        <Badge variant={m.status === "active" ? "default" : m.status === "paused" ? "secondary" : "destructive"}>
                          {m.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{m.joinDate}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" variant="ghost">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((p) => (
              <Card key={p.id}>
                <CardHeader>
                  <CardTitle>{p.name}</CardTitle>
                  <CardDescription>${p.price}/month</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {p.features.map((f, i) => (
                    <div key={i} className="text-sm text-muted-foreground">• {f}</div>
                  ))}
                  <Separator/>
                  <Button className="w-full" variant="outline">Edit Plan</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="payments" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Tracking</CardTitle>
              <CardDescription>Latest member payments and dues</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead className="hidden sm:table-cell">Status</TableHead>
                    <TableHead className="text-right">Due</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map((m) => (
                    <TableRow key={m.id}>
                      <TableCell className="font-medium">{m.name}</TableCell>
                      <TableCell>{m.plan}</TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <Badge variant={m.due > 0 ? "destructive" : "secondary"}>
                          {m.due > 0 ? "Overdue" : "Paid"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right flex items-center justify-end gap-1">
                        <DollarSign className="h-4 w-4 text-muted-foreground"/>
                        <span>{m.due}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}