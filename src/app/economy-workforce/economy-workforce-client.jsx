"use client";

import { useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Bar, BarChart, CartesianGrid, XAxis, Line, LineChart, Pie, PieChart, Cell } from "recharts";
import { ChartContainer, ChartTooltip, ChartLegend, ChartTooltipContent, ChartLegendContent } from "@/components/ui/chart";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { useSearchStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { IconCrown } from "@tabler/icons-react";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn
} from "@tabler/icons-react";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 }
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  }
};

const documentData = [
  { month: "January", documents: 186 },
  { month: "February", documents: 305 },
  { month: "March", documents: 237 },
  { month: "April", documents: 73 },
  { month: "May", documents: 209 },
  { month: "June", documents: 214 }
];

const documentConfig = {
  documents: {
    label: "Documents",
    color: "hsl(var(--chart-3))",
  }
};

const teamData = [
  { team: "Engineering", members: 275, fill: "hsl(var(--chart-1))" },
  { team: "Design", members: 200, fill: "hsl(var(--chart-2))" },
  { team: "Product", members: 187, fill: "hsl(var(--chart-3))" },
  { team: "Marketing", members: 173, fill: "hsl(var(--chart-4))" },
  { team: "Other", members: 90, fill: "hsl(var(--chart-5))" }
];

const teamConfig = {
  members: {
    label: "Members",
  },
  Engineering: {
    label: "Engineering",
    color: "hsl(var(--chart-1))",
  },
  Design: {
    label: "Design",
    color: "hsl(var(--chart-2))",
  },
  Product: {
    label: "Product",
    color: "hsl(var(--chart-3))",
  },
  Marketing: {
    label: "Marketing",
    color: "hsl(var(--chart-4))",
  },
  Other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  }
};

function TeamChart({ expanded = false }) {
  const totalMembers = teamData.reduce((sum, data) => sum + data.members, 0);
  
  return (
    <div className={`flex flex-col ${expanded ? 'h-[600px]' : 'h-full'} bg-white dark:bg-gray-900 rounded-lg p-4`}>
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Team Distribution</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">January - June 2024</p>
      </div>
      <ChartContainer config={teamConfig} className="mx-auto aspect-square max-h-[300px]">
        <PieChart>
          <Pie
            data={teamData}
            dataKey="members"
            cx="50%"
            cy="50%"
            innerRadius={expanded ? 80 : 40}
            outerRadius={expanded ? 120 : 60}
            fill="#000"
          />
          <ChartLegend 
            content={<ChartLegendContent nameKey="team" />}
            className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
          />
        </PieChart>
      </ChartContainer>
    </div>
  );
}

function DocumentChart({ expanded = false }) {
  const totalDocuments = documentData.reduce((sum, data) => sum + data.documents, 0);
  
  return (
    <div className={`flex flex-col ${expanded ? 'h-[600px]' : 'h-full'} bg-white dark:bg-gray-900 rounded-lg p-4`}>
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Documents Processed</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">+{totalDocuments.toLocaleString()}</p>
            <span className="text-sm text-green-600 dark:text-green-400">+15.2% from last month</span>
          </div>
        </div>
      </div>
      <ChartContainer config={documentConfig} className="flex-1 w-full">
        <LineChart data={documentData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent config={documentConfig} />}
          />
          <Line
            dataKey="documents"
            type="natural"
            stroke={documentConfig.documents.color}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

function AnalyticsChart({ expanded = false }) {
  const totalPopulation = chartData.reduce((sum, data) => sum + data.desktop + data.mobile, 0);
  
  return (
    <div className={`flex flex-col ${expanded ? 'h-[600px]' : 'h-full'} bg-white dark:bg-gray-900 rounded-lg p-4`}>
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Subscriptions</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">+{totalPopulation.toLocaleString()}</p>
            <span className="text-sm text-green-600 dark:text-green-400">+180.1% from last month</span>
          </div>
        </div>
      </div>
      <ChartContainer config={chartConfig} className="flex-1 w-full">
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent config={chartConfig} />} />
          <ChartLegend content={<ChartLegendContent config={chartConfig} />} />
          <Bar dataKey="desktop" fill={chartConfig.desktop.color} radius={4} />
          <Bar dataKey="mobile" fill={chartConfig.mobile.color} radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

const items = [
  {
    header: (
      <div className="h-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
        <AnalyticsChart />
      </div>
    )
  },
  {
    title: "Document Management",
    header: (
      <div className="h-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
        <DocumentChart />
      </div>
    )
  },
  {
    title: "Team Collaboration",
    header: (
      <div className="h-full bg-white dark:bg-gray-900 rounded-lg overflow-hidden">
        <TeamChart />
      </div>
    )
  }
];

export default function EconomyWorkforceClient() {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const { subscriptionLevel, isAuthenticated } = useSearchStore();
  const hasAccess = isAuthenticated && subscriptionLevel === "pro";

  const sections = [
    {
      title: "Population and Demographics",
      items: [...items]
    },
    {
      title: "Education and School Data",
      items: [...items]
    },
    {
      title: "Migration and Geographic Mobility",
      items: [...items]
    }
  ];

  return (
    <main className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Economy and Workforce</h1>
        <div className="space-y-12">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{section.title}</h2>
              <BentoGrid className="mx-auto gap-4">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => sectionIndex === 0 || hasAccess ? setIsExpanded(i + sectionIndex * 3) : router.push("/pricing")}
                    className={cn(
                      "relative cursor-pointer hover:scale-[1.02] row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none dark:bg-black dark:border-white/[0.2] bg-white border border-transparent overflow-hidden"
                    )}
                  >
                    {sectionIndex > 0 && !hasAccess && (
                      <>
                        <div className="absolute top-2 right-2 flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-indigo-600 dark:text-indigo-400 border border-indigo-600/20 dark:border-indigo-400/20 rounded-lg bg-indigo-50/90 dark:bg-indigo-950/90 z-30">
                          <IconCrown size={16} />
                          <span>Pro</span>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                          <div className="flex items-center gap-2 px-4 py-2 bg-indigo-600/90 backdrop-blur-sm text-white rounded-lg shadow-lg">
                            <IconCrown size={16} />
                            <span className="text-sm font-medium whitespace-nowrap">{isAuthenticated ? 'Upgrade to Pro' : 'Sign in for Pro'}</span>
                          </div>
                        </div>
                        <div className="absolute inset-0 blur-[8px] z-10">
                          {item.header}
                        </div>
                      </>
                    )}
                    {(!sectionIndex || hasAccess) && item.header}
                  </div>
                ))}
              </BentoGrid>
            </div>
          ))}
        </div>

        <Dialog open={isExpanded !== false} onOpenChange={() => setIsExpanded(false)}>
          <DialogContent className="w-[90%] sm:max-w-[900px]">
            <DialogTitle className="sr-only">
              {isExpanded !== false ? `${sections[Math.floor(isExpanded / 3)].title} - ${
                isExpanded % 3 === 0 ? "Subscriptions Analytics" :
                isExpanded % 3 === 1 ? "Document Management Analytics" :
                "Team Distribution Analytics"
              }` : ""}
            </DialogTitle>
            {isExpanded !== false && (
              isExpanded % 3 === 0 ? <AnalyticsChart expanded /> :
              isExpanded % 3 === 1 ? <DocumentChart expanded /> :
              <TeamChart expanded />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </main>
  );
}