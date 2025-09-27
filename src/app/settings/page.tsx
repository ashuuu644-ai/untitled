"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  const [gym, setGym] = useState({ name: "Orchid Fitness", address: "123 Market St", timezone: "UTC", checkinEnabled: true });
  const [plans, setPlans] = useState([
    { id: "basic", name: "Basic", price: 19 },
    { id: "standard", name: "Standard", price: 29 },
    { id: "premium", name: "Premium", price: 49 },
  ]);
  const [staff, setStaff] = useState([
    { id: 1, name: "Admin", email: "admin@gym.io", role: "owner", active: true },
    { id: 2, name: "Lara", email: "lara@gym.io", role: "trainer", active: true },
    { id: 3, name: "Samir", email: "samir@gym.io", role: "trainer", active: false },
  ]);

  return (
    <div className="min-h-screen px-6 py-8 md:px-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">Configure your gym, membership plans, and users.</p>
        </div>
      </div>

      <Tabs defaultValue="general" className="mt-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="plans">Membership Plans</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Gym Information</CardTitle>
              <CardDescription>Basic details shown across the app</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="gym-name">Gym name</Label>
                <Input id="gym-name" value={gym.name} onChange={(e) => setGym((s) => ({ ...s, name: e.target.value }))} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" value={gym.address} onChange={(e) => setGym((s) => ({ ...s, address: e.target.value }))} />
              </div>
              <div className="grid gap-2">
                <Label>Timezone</Label>
                <Select value={gym.timezone} onValueChange={(v) => setGym((s) => ({ ...s, timezone: v }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="America-New_York">America/New_York</SelectItem>
                    <SelectItem value="Europe-London">Europe/London</SelectItem>
                    <SelectItem value="Asia-Dubai">Asia/Dubai</SelectItem>
                    <SelectItem value="Asia-Singapore">Asia/Singapore</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Separator/>
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Attendance check-in</div>
                  <div className="text-sm text-muted-foreground">Enable/disable front desk check-in</div>
                </div>
                <Switch checked={gym.checkinEnabled} onCheckedChange={(v) => setGym((s) => ({ ...s, checkinEnabled: v }))} />
              </div>
              <div className="pt-2">
                <Button>Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Branding</CardTitle>
              <CardDescription>Logo, colors, and theme</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label>Primary color</Label>
                <Input type="color" defaultValue="#111111" />
              </div>
              <div className="grid gap-2">
                <Label>Accent color</Label>
                <Input type="color" defaultValue="#6EE7B7" />
              </div>
              <Button variant="outline">Upload Logo</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="plans" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Membership Plans</CardTitle>
              <CardDescription>Adjust pricing and availability</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {plans.map((p) => (
                <div key={p.id} className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center border rounded-md p-3">
                  <div className="font-medium">{p.name}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <Input
                      type="number"
                      value={p.price}
                      onChange={(e) => setPlans((prev) => prev.map((pl) => pl.id === p.id ? { ...pl, price: Number(e.target.value) } : pl))}
                      className="max-w-[120px]"
                    />
                    <span className="text-sm text-muted-foreground">/mo</span>
                  </div>
                  <div className="justify-self-end">
                    <Button variant="outline">Manage</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>Manage staff and admins</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {staff.map((u) => (
                <div key={u.id} className="grid grid-cols-1 sm:grid-cols-4 items-center gap-3 border rounded-md p-3">
                  <div className="space-y-1">
                    <div className="font-medium">{u.name}</div>
                    <div className="text-sm text-muted-foreground">{u.email}</div>
                  </div>
                  <div className="sm:justify-self-center">
                    <Label className="text-sm">Role</Label>
                    <Select value={u.role} onValueChange={(v) => setStaff((prev) => prev.map((s) => s.id === u.id ? { ...s, role: v } : s))}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner">Owner</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="trainer">Trainer</SelectItem>
                        <SelectItem value="staff">Staff</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-2">
                    <Label className="text-sm">Active</Label>
                    <Switch checked={u.active} onCheckedChange={(v) => setStaff((prev) => prev.map((s) => s.id === u.id ? { ...s, active: v } : s))} />
                  </div>
                  <div className="sm:justify-self-end">
                    <Button variant="outline">Reset Password</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}