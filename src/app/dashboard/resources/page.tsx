import { Folder, File, MoreVertical, PlusCircle } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { resources } from "@/lib/data"
import { Badge } from "@/components/ui/badge"

const getIcon = (type: string) => {
    switch(type) {
        case 'folder': return <Folder className="h-10 w-10 text-primary" />;
        case 'pdf': return <File className="h-10 w-10 text-red-500" />;
        case 'video': return <File className="h-10 w-10 text-blue-500" />;
        case 'doc': return <File className="h-10 w-10 text-indigo-500" />;
        default: return <File className="h-10 w-10 text-muted-foreground" />;
    }
}

export default function ResourcesPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Resource Library</CardTitle>
            <CardDescription>
            Upload and manage your learning content.
            </CardDescription>
        </div>
        <Button size="sm" className="gap-1">
            <PlusCircle className="h-4 w-4" />
            Upload
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {resources.map((resource) => (
            <Card key={resource.id} className="flex flex-col justify-between hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="p-4 flex-grow">
                    <div className="flex justify-center mb-4">
                        {getIcon(resource.type)}
                    </div>
                    <CardTitle className="text-base text-center break-all">{resource.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 text-center">
                     <p className="text-xs text-muted-foreground">{resource.size}</p>
                     <p className="text-xs text-muted-foreground">Modified: {resource.lastModified}</p>
                </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
            <Badge variant="secondary">Tags: Math</Badge>
            <Badge variant="secondary" className="ml-2">Chemistry</Badge>
            <Badge variant="secondary" className="ml-2">English</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
