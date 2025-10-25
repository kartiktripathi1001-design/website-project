import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import {
  Settings,
  Globe,
  CreditCard,
  Shield,
  Mail,
  Smartphone,
  AlertTriangle
} from "lucide-react";

export default function AdminSettings() {
  const [withdrawalLimits, setWithdrawalLimits] = useState({
    daily: [10000],
    monthly: [50000],
    minimum: [100]
  });

  const [platformSettings, setPlatformSettings] = useState({
    maintenanceMode: false,
    newRegistrations: true,
    emailNotifications: true,
    smsNotifications: false,
    autoKycApproval: false,
    challengeAutoStart: true
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Global Settings</h2>
        <p className="text-muted-foreground">
          Configure platform-wide rules, limits, and operational settings
        </p>
      </div>

      <Tabs defaultValue="rules" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rules">Global Rules</TabsTrigger>
          <TabsTrigger value="payments">Payment Settings</TabsTrigger>
          <TabsTrigger value="platform">Platform Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Withdrawal Limits</CardTitle>
                <CardDescription>
                  Set maximum withdrawal amounts and frequency limits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>Daily Withdrawal Limit: ${withdrawalLimits.daily[0].toLocaleString()}</Label>
                  <Slider
                    value={withdrawalLimits.daily}
                    onValueChange={(value) => setWithdrawalLimits({...withdrawalLimits, daily: value})}
                    min={1000}
                    max={50000}
                    step={1000}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Monthly Withdrawal Limit: ${withdrawalLimits.monthly[0].toLocaleString()}</Label>
                  <Slider
                    value={withdrawalLimits.monthly}
                    onValueChange={(value) => setWithdrawalLimits({...withdrawalLimits, monthly: value})}
                    min={10000}
                    max={200000}
                    step={5000}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Minimum Withdrawal: ${withdrawalLimits.minimum[0]}</Label>
                  <Slider
                    value={withdrawalLimits.minimum}
                    onValueChange={(value) => setWithdrawalLimits({...withdrawalLimits, minimum: value})}
                    min={50}
                    max={1000}
                    step={50}
                    className="mt-2"
                  />
                </div>

                <Button>Save Withdrawal Limits</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Allowed Sports & Markets</CardTitle>
                <CardDescription>
                  Configure which sports and betting markets are allowed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Enabled Sports</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {['Football', 'Basketball', 'Tennis', 'Baseball', 'Soccer', 'Hockey', 'Golf', 'MMA'].map((sport) => (
                      <div key={sport} className="flex items-center space-x-2">
                        <Switch id={sport} defaultChecked />
                        <Label htmlFor={sport} className="text-sm">{sport}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="restricted-markets">Restricted Markets</Label>
                  <Textarea 
                    id="restricted-markets"
                    placeholder="Enter restricted betting markets (one per line)"
                    className="mt-2"
                    rows={4}
                  />
                </div>

                <Button>Save Sports Settings</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Trading Rules</CardTitle>
              <CardDescription>
                Global trading rules and restrictions applied to all challenges
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="max-concurrent-picks">Max Concurrent Picks</Label>
                  <Input id="max-concurrent-picks" type="number" defaultValue="5" />
                </div>
                <div>
                  <Label htmlFor="max-stake-per-pick">Max Stake Per Pick (%)</Label>
                  <Input id="max-stake-per-pick" type="number" defaultValue="10" />
                </div>
                <div>
                  <Label htmlFor="min-odds-global">Global Min Odds</Label>
                  <Input id="min-odds-global" type="number" step="0.1" defaultValue="1.5" />
                </div>
                <div>
                  <Label htmlFor="max-odds-global">Global Max Odds</Label>
                  <Input id="max-odds-global" type="number" step="0.1" defaultValue="5.0" />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="weekend-trading" />
                <Label htmlFor="weekend-trading">Allow Weekend Trading</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="live-betting" />
                <Label htmlFor="live-betting">Allow Live/In-Play Betting</Label>
              </div>

              <Button>Save Trading Rules</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Configure available payment and withdrawal methods
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4" />
                      <span>Credit/Debit Cards</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4" />
                      <span>PayPal</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4" />
                      <span>Bank Transfer</span>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <CreditCard className="h-4 w-4" />
                      <span>Cryptocurrency</span>
                    </div>
                    <Switch />
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Label htmlFor="payment-processing-fee">Payment Processing Fee (%)</Label>
                  <Input id="payment-processing-fee" type="number" step="0.1" defaultValue="2.9" className="mt-2" />
                </div>

                <Button>Save Payment Methods</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Profit Split Configuration</CardTitle>
                <CardDescription>
                  Set profit sharing ratios for funded accounts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="default-split">Default Profit Split (Trader %)</Label>
                  <Select defaultValue="80">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="70">70% Trader / 30% Platform</SelectItem>
                      <SelectItem value="75">75% Trader / 25% Platform</SelectItem>
                      <SelectItem value="80">80% Trader / 20% Platform</SelectItem>
                      <SelectItem value="85">85% Trader / 15% Platform</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="performance-bonus">Performance Bonus Threshold</Label>
                  <Input id="performance-bonus" placeholder="e.g., 10% monthly profit for bonus split" />
                </div>

                <div>
                  <Label htmlFor="payout-frequency">Payout Frequency</Label>
                  <Select defaultValue="monthly">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button>Save Profit Settings</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="platform" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Operations</CardTitle>
              <CardDescription>
                Control platform availability and user access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Maintenance Mode</AlertTitle>
                <AlertDescription>
                  Enabling maintenance mode will prevent all users from accessing the platform.
                </AlertDescription>
              </Alert>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Maintenance Mode</Label>
                    <p className="text-sm text-muted-foreground">Temporarily disable platform access</p>
                  </div>
                  <Switch 
                    checked={platformSettings.maintenanceMode}
                    onCheckedChange={(checked) => setPlatformSettings({...platformSettings, maintenanceMode: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>New User Registrations</Label>
                    <p className="text-sm text-muted-foreground">Allow new users to register</p>
                  </div>
                  <Switch 
                    checked={platformSettings.newRegistrations}
                    onCheckedChange={(checked) => setPlatformSettings({...platformSettings, newRegistrations: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-start Challenges</Label>
                    <p className="text-sm text-muted-foreground">Automatically start challenges after payment</p>
                  </div>
                  <Switch 
                    checked={platformSettings.challengeAutoStart}
                    onCheckedChange={(checked) => setPlatformSettings({...platformSettings, challengeAutoStart: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto KYC Approval</Label>
                    <p className="text-sm text-muted-foreground">Automatically approve basic KYC documents</p>
                  </div>
                  <Switch 
                    checked={platformSettings.autoKycApproval}
                    onCheckedChange={(checked) => setPlatformSettings({...platformSettings, autoKycApproval: checked})}
                  />
                </div>
              </div>

              <Button>Save Platform Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure system notifications and alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <div>
                      <Label>Email Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send email alerts for important events</p>
                    </div>
                  </div>
                  <Switch 
                    checked={platformSettings.emailNotifications}
                    onCheckedChange={(checked) => setPlatformSettings({...platformSettings, emailNotifications: checked})}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Smartphone className="h-4 w-4" />
                    <div>
                      <Label>SMS Notifications</Label>
                      <p className="text-sm text-muted-foreground">Send SMS for critical alerts</p>
                    </div>
                  </div>
                  <Switch 
                    checked={platformSettings.smsNotifications}
                    onCheckedChange={(checked) => setPlatformSettings({...platformSettings, smsNotifications: checked})}
                  />
                </div>

                <div className="pt-4 border-t">
                  <Label htmlFor="admin-email">Admin Alert Email</Label>
                  <Input id="admin-email" type="email" defaultValue="admin@fundedstrategy.com" className="mt-2" />
                </div>

                <div>
                  <Label htmlFor="admin-phone">Admin Alert Phone</Label>
                  <Input id="admin-phone" type="tel" defaultValue="+1 (555) 123-4567" className="mt-2" />
                </div>

                <Button>Save Notification Settings</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Alert Thresholds</CardTitle>
                <CardDescription>
                  Set thresholds for automated alerts and notifications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="violation-threshold">Daily Violations Alert</Label>
                  <Input id="violation-threshold" type="number" defaultValue="10" />
                  <p className="text-xs text-muted-foreground mt-1">Alert when daily violations exceed this number</p>
                </div>

                <div>
                  <Label htmlFor="withdrawal-threshold">Large Withdrawal Alert ($)</Label>
                  <Input id="withdrawal-threshold" type="number" defaultValue="25000" />
                  <p className="text-xs text-muted-foreground mt-1">Alert for withdrawal requests above this amount</p>
                </div>

                <div>
                  <Label htmlFor="failure-rate-threshold">Challenge Failure Rate Alert (%)</Label>
                  <Input id="failure-rate-threshold" type="number" defaultValue="80" />
                  <p className="text-xs text-muted-foreground mt-1">Alert when daily failure rate exceeds this percentage</p>
                </div>

                <div>
                  <Label htmlFor="support-ticket-threshold">Support Ticket Backlog Alert</Label>
                  <Input id="support-ticket-threshold" type="number" defaultValue="20" />
                  <p className="text-xs text-muted-foreground mt-1">Alert when open tickets exceed this number</p>
                </div>

                <Button>Save Alert Thresholds</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}