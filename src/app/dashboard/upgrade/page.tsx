import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check, Mail } from "lucide-react"

const premiumFeatures = [
  "Unlimited AI Assistant Usage",
  "Advanced Progress Reporting",
  "Priority Support",
  "Exclusive Access to New Features",
]

export default function UpgradePage() {
  return (
    <div className="flex justify-center items-start pt-10 h-full">
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
          <ul className="space-y-3 mb-8">
            {premiumFeatures.map((feature, index) => (
              <li key={index} className="flex items-center gap-3">
                <div className="p-1 bg-accent rounded-full">
                  <Check className="h-4 w-4 text-accent-foreground" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
           <Card className="bg-muted/50">
             <CardContent className="p-4 text-center">
                <h4 className="font-semibold mb-2">How to Upgrade</h4>
                <p className="text-sm text-muted-foreground">
                    To get premium access, please contact us. We will arrange payment via JazzCash, EasyPaisa, or another local method. Once paid, we will activate your premium membership.
                </p>
             </CardContent>
           </Card>
        </CardContent>
        <CardFooter>
          <Button className="w-full" size="lg" asChild>
            <a href="mailto:ibrahimzdilshad@gmail.com">
                <Mail className="mr-2 h-4 w-4" />
                Contact Us to Upgrade
            </a>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
