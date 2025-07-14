import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const premiumFeatures = [
  "Unlimited AI Assistant Usage",
  "Advanced Progress Reporting",
  "Priority Support",
  "Exclusive Access to New Features",
]

export default function UpgradePage() {
  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Go Premium</CardTitle>
          <CardDescription>
            Unlock the full potential of TeachTools and supercharge your
            teaching.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <span className="text-4xl font-bold">$10</span>
            <span className="text-muted-foreground">/month</span>
          </div>
          <ul className="space-y-3">
            {premiumFeatures.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="p-1 bg-accent rounded-full">
                  <Check className="h-4 w-4 text-accent-foreground" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full" size="lg">
            Upgrade Now & Get Paid
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
